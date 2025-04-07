import React, { useState, useRef, useEffect } from "react";
import { base64ToBlob } from "../utils/Base64ToBlob";

function QEdgeDetectionCanvas({ apiEndpoint, imageLoaded, setImageLoaded, b64FinalImage, setB64FinalImage }) {
  const [imageStream, setImageStream] = useState([]);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const tileWidth = 16;
  const tileHeight = 16;

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const handleImageUpload = async(event) => {
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
  }

  const handleEdgeDetection = async () => {
    setIsUploading(true);
    setImageStream([]);
    const formData = new FormData();
    formData.append("image", base64ToBlob(uploadedImage.split(',')[1]), 'image.png');

    try {
      const response = await fetch(apiEndpoint, {
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
                  setImageLoaded(true);
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
                    part.split(":")[1].toString().split(":") / tileWidth
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
        const x = col * tileWidth;
        const y = row * tileHeight;

        const img = new Image();
        img.src = `data:image/png;base64,${imageData}`;
        img.onload = () => {
          ctxRef.current.drawImage(img, x, y, tileWidth, tileHeight);
        };
      });
    }
  }, [imageStream, numberOfColumns]);

  return (
    <div>
      <h2>Quantum Edge Detection</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
      />
      <button 
        disabled={!uploadedImage}
        onClick={handleEdgeDetection}
        >{isUploading ? 'Processing...' : 'Detect Edges'}
        </button>
      {isUploading && <p>Uploading image...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {uploadedImage && (
          <>
            <h3>Uploaded Image:</h3>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            />
          </>
        )}
        {(imageStream.length > 0 || imageLoaded) && <h3>Result:</h3>}
        <canvas
          ref={canvasRef}
          width={tileWidth * numberOfColumns}
          height={
            tileHeight * Math.ceil(imageStream.length / numberOfColumns) || 0
          }
          style={{ maxWidth: "100%" }}
        ></canvas>

        <div>
          {imageLoaded && (
            <img
              src={`data:image/png;base64,${b64FinalImage}`}
              alt="Final Edge Detected"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QEdgeDetectionCanvas;
