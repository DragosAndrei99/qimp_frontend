import React, { useState, useRef, useEffect } from "react";
import { base64ToBlob } from "../utils/Base64ToBlob";
import { isPowerOf2 } from "../utils/IsPowerOf2";
import DetectEdgesButton from "./edge_detection/DetectEdgesButton";
import InputImage from "./edge_detection/InputImage";
import OriginalImage from "./edge_detection/OriginalImage";
import Options from "./edge_detection/Options";
import ProcessedImage from "./edge_detection/ProcessedImage";

function QEdgeDetectionCanvas({
  apiEndpoint,
  b64FinalImage,
  setB64FinalImage,
}) {
  const [imageStream, setImageStream] = useState([]);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [rootPixelsForTile, setRootPixelsForTile] = useState(16);
  const [rootPixelsForTileError, setRootPixelsForTileError] = useState("");

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) {
      setError("Please select an image.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);

    setError(null);
  };

  const handleEdgeDetection = async () => {
    setIsUploading(true);
    setImageStream([]);
    const formData = new FormData();
    formData.append(
      "image",
      base64ToBlob(uploadedImage.split(",")[1]),
      "image.png"
    );

    try {
      const response = await fetch(
        `${apiEndpoint}?tile_width=${rootPixelsForTile}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      function processStream() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) return;

            buffer += decoder.decode(value, { stream: true });

            if (buffer.includes("final_edge_detected_image")) {
              setImageStream([]);

              const finalImageParts = buffer.split(
                "--frame--final_edge_detected_image--"
              );
              for (let i = 1; i < finalImageParts.length; i++) {
                let part = finalImageParts[i].trim();
                if (part) {
                  setB64FinalImage(
                    (prev) => prev + part.replace("--end--", "")
                  );
                }
                if (part.includes("--end--")) {
                  setB64FinalImage((prev) => 'data:image/png;base64,' + prev)
                  setIsUploading(false);
                  return;
                }
              }
              buffer = finalImageParts[finalImageParts.length - 1];
            } else {
              const parts = buffer.split("--frame");

              for (let i = 1; i < parts.length; i++) {
                let part = parts[i].trim();
                if (part.includes("image_width")) {
                  setNumberOfColumns(
                    part.split(":")[1].toString().split(":") / rootPixelsForTile
                  );
                } else if (part) {
                  setImageStream((prevImages) => [...prevImages, part]);
                }
              }
              buffer = parts[parts.length - 1];
            }

            processStream();
          })
          .catch((error) => {
            setError(error.message);
            setIsUploading(false);
          });
      }

      processStream();
    } catch (error) {
      setError(error.message);
      setIsUploading(false);
    }
  };

  const handleRootPixelsForTileChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    setRootPixelsForTile(inputValue);
    if (inputValue === "") {
      setRootPixelsForTileError("");
    } else if (isPowerOf2(numericValue)) {
      setRootPixelsForTileError("");
    } else {
      setRootPixelsForTileError("Please enter a value that is a power of 2.");
    }
  };

  useEffect(() => {
    if (imageStream.length > 0 && ctxRef.current) {
      imageStream.forEach((imageData, index) => {
        const row = Math.floor(index / numberOfColumns);
        const col = index % numberOfColumns;
        const x = col * rootPixelsForTile;
        const y = row * rootPixelsForTile;

        const img = new Image();
        img.src = `data:image/png;base64,${imageData}`;
        img.onload = () => {
          ctxRef.current.drawImage(
            img,
            x,
            y,
            rootPixelsForTile,
            rootPixelsForTile
          );
        };
      });
    }
  }, [imageStream, numberOfColumns, rootPixelsForTile]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InputImage handleChange={handleImageUpload} isDisabled={isUploading} />
      <Options
        children={
          <>
            <label htmlFor="powerOf2Input" className="text-md font-bold ">
              Width/ Height for each tile:
            </label>
            <input
              id="powerOf2Input"
              type="number"
              min="2"
              max="128"
              value={rootPixelsForTile}
              onChange={handleRootPixelsForTileChange}
              placeholder="0 - 128"
              className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
            />
            {rootPixelsForTileError && (
              <div className="text-sm text-red-600">
                {rootPixelsForTileError}
              </div>
            )}
          </>
        }
      />

      <OriginalImage originalImageUrl={uploadedImage} />

      <ProcessedImage
        processedImage={b64FinalImage}
        children={
          <div className="flex items-center justify-center bg-[#39385E]">
            <canvas
              ref={canvasRef}
              width={rootPixelsForTile * numberOfColumns}
              height={
                rootPixelsForTile *
                  Math.ceil(imageStream.length / numberOfColumns) || 0
              }
              className="max-w-80"
            ></canvas>
          </div>
        }
      />
      <DetectEdgesButton
        isDisabled={!uploadedImage || rootPixelsForTileError || isUploading}
        handleClick={handleEdgeDetection}
        error={error}
      />
    </div>
  );
}

export default QEdgeDetectionCanvas;
