import React, { useState, useRef, useEffect } from "react";
import { base64ToBlob } from "../utils/Base64ToBlob";
import QuantumOptions from "../components/options/QuantumOptions";
import EdgeDetectionLayout from "../components/edge_detection/EdgeDetectionLayout";
import PageHeader from "../components/common/PageHeader";

function QEdgeDetectionCanvas({ apiEndpoint }) {
  const [imageStream, setImageStream] = useState([]);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState("");
  const [b64FinalImage, setB64FinalImage] = useState("");
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [postProcessedImage, setPostProcessedImage] = useState("");

  const [edgeDetectionParams, setEdgeDetectionParams] = useState({
    rootPixelsForTile: 16,
    threshold: 1,
    replaceMargins: true,
    highlightEdges: false,
    gaussianBlur: false,
    kernelSize: 3,
    sigma: 1,
  });

  const [edgeDetectionParamsErrors, setEdgeDetectionParamsErrors] = useState({
    rootPixelsForTileError: "",
    kernelSizeError: "",
    sigmaError: "",
  });

  const [selectedImgForObjDetection, setSelectedImgForObjDetection] =
    useState("");

  const resetStates = () => {
    setB64FinalImage("");
    setAnnotatedImageUrl("");
    setPostProcessedImage("");
    setSelectedImgForObjDetection("");
    setImageStream([]);
  };

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
    resetStates();
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);

    setError(null);
  };

  const handleEdgeDetection = async () => {
    setIsUploading(true);
    resetStates();
    const formData = new FormData();
    formData.append(
      "image",
      base64ToBlob(uploadedImage.split(",")[1]),
      "image.png"
    );

    try {
      const params = new URLSearchParams({
        tile_width: edgeDetectionParams.rootPixelsForTile,
        threshold: edgeDetectionParams.threshold,
        replace_margins: edgeDetectionParams.replaceMargins,
        highlight_edges: edgeDetectionParams.highlightEdges,
        gaussian: edgeDetectionParams.gaussianBlur,
        kernel: edgeDetectionParams.kernelSize,
        sigma: edgeDetectionParams.sigma,
      });
      const response = await fetch(`${apiEndpoint}?${params}`, {
        method: "POST",
        body: formData,
      });

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
                  setB64FinalImage((prev) => "data:image/png;base64," + prev);
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
                    part.split(":")[1].toString().split(":") /
                      edgeDetectionParams.rootPixelsForTile
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

  useEffect(() => {
    if (imageStream.length > 0 && ctxRef.current) {
      imageStream.forEach((imageData, index) => {
        const row = Math.floor(index / numberOfColumns);
        const col = index % numberOfColumns;
        const x = col * edgeDetectionParams.rootPixelsForTile;
        const y = row * edgeDetectionParams.rootPixelsForTile;

        const img = new Image();
        img.src = `data:image/png;base64,${imageData}`;
        img.onload = () => {
          ctxRef.current.drawImage(
            img,
            x,
            y,
            edgeDetectionParams.rootPixelsForTile,
            edgeDetectionParams.rootPixelsForTile
          );
        };
      });
    }
  }, [imageStream, numberOfColumns, edgeDetectionParams]);

  return (
    <>
      <PageHeader label="Quantum Hadamard Edge Detection" />

      <EdgeDetectionLayout
        optionsChildren={
          <QuantumOptions
            edgeDetectionParams={edgeDetectionParams}
            setEdgeDetectionParams={setEdgeDetectionParams}
            edgeDetectionParamsErrors={edgeDetectionParamsErrors}
            setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
          />
        }
        processedImageChildren={
          <div className="flex items-center justify-center bg-[#39385E]">
            <canvas
              ref={canvasRef}
              width={edgeDetectionParams.rootPixelsForTile * numberOfColumns}
              height={
                edgeDetectionParams.rootPixelsForTile *
                  Math.ceil(imageStream.length / numberOfColumns) || 0
              }
              className="max-w-80"
            ></canvas>
          </div>
        }
        handleImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        isUploading={isUploading}
        processedImage={b64FinalImage}
        selectedImgForObjDetection={selectedImgForObjDetection}
        setSelectedImgForObjDetection={setSelectedImgForObjDetection}
        edgeDetectionParamsErrors={edgeDetectionParamsErrors}
        error={error}
        handleEdgeDetection={handleEdgeDetection}
        postProcessedImage={postProcessedImage}
        setPostProcessedImage={setPostProcessedImage}
        annotatedImageUrl={annotatedImageUrl}
        setAnnotatedImageUrl={setAnnotatedImageUrl}
      />
    </>
  );
}

export default QEdgeDetectionCanvas;
