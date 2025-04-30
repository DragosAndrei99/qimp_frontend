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
  const [isDoneEdgeDetection, setIsDoneEdgeDetection] = useState(false);
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
    shots: 10001
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
    setIsDoneEdgeDetection(false);
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
        shots: edgeDetectionParams.shots
      });
      const response = await fetch(`${apiEndpoint}/q-edge-detection?${params}`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      async function processStream() {
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;

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
                  setIsDoneEdgeDetection(true);
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
          }
        } catch (error) {
          setError(error.message);
          setIsUploading(false);
        }
      }

      await processStream();
    } catch (error) {
      setError(error.message);
      setIsUploading(false);
    }
  };

  const saveToDatabase = async () => {
    try {
      const formData = new FormData();
      console.log('b64FinalImage: ' + b64FinalImage);
      console.log('uploadedImage: ' + uploadedImage);
      formData.append('edge_detected_image', base64ToBlob(b64FinalImage.split(',')[1]), 'edge_detected_image.png');
      formData.append('original_image', base64ToBlob(uploadedImage.split(",")[1]), 'original_image.png');

      formData.append('time_to_complete', 0);
      formData.append('tile_size', edgeDetectionParams.rootPixelsForTile);
      formData.append('threshold', edgeDetectionParams.threshold);
      formData.append('margins_replaced', edgeDetectionParams.replaceMargins);
      formData.append('edges_highlighted', edgeDetectionParams.highlightEdges);
      formData.append('gaussian_pre_processed', edgeDetectionParams.gaussianBlur);
      formData.append('kernel_size', edgeDetectionParams.kernelSize);
      formData.append('sigma', edgeDetectionParams.sigma);
      formData.append('iterations', edgeDetectionParams.shots);

      const response = await fetch(`${apiEndpoint}/images`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to save image');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isDoneEdgeDetection) {
      saveToDatabase();
    }
  }, [isDoneEdgeDetection]);

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
      <PageHeader label="Quantum Hadamard Edge Detection Simulator" />

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
        optionsToolTipId="quantumOptions"
        optionsToolTipText="The quantum algorithm encodes the image using Quantum Probability Image Encoding and detects the edges using 2 Hadamard Gates, applying a Decrement gate after first Hadamard. "
      />
    </>
  );
}

export default QEdgeDetectionCanvas;
