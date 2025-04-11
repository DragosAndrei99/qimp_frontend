import { useState } from "react";
import { blobToBase64 } from "../utils/BloblToBase64";

import ClassicOptions from "../components/options/ClassicOptions";
import EdgeDetectionLayout from "../components/edge_detection/EdgeDetectionLayout";

function CEdgeDetection({ apiEndpoint }) {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState("");

  const [postProcessedImage, setPostProcessedImage] = useState("");

  const [selectedImgForObjDetection, setSelectedImgForObjDetection] =
    useState("");

  const [edgeDetectionParams, setEdgeDetectionParams] = useState({
    algorithm: "canny",
    gaussianBlur: false,
    kernelSize: 3,
    sigma: 1,
  });

  const [edgeDetectionParamsErrors, setEdgeDetectionParamsErrors] = useState({
    kernelSizeError: "",
    sigmaError: "",
  });

  const resetStates = () => {
    setProcessedImage("");
    setAnnotatedImageUrl("");
    setPostProcessedImage("");
    setSelectedImgForObjDetection("");

  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetStates();
      setImage(file);
      setProcessedImage(null);
      setError("");
      setOriginalImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }
    resetStates();
    const formData = new FormData();
    formData.append("image", image);

    setIsUploading(true);
    setError("");


    try {
      const params = new URLSearchParams({
        algorithm: edgeDetectionParams.algorithm,
        gaussian: edgeDetectionParams.gaussianBlur,
        kernel: edgeDetectionParams.kernelSize,
        sigma: edgeDetectionParams.sigma,
      });
      const response = await fetch(`${apiEndpoint}?${params}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during image upload or edge detection.");
      }

      const imageBlob = await response.blob();
      const base64String = await blobToBase64(imageBlob);
      setProcessedImage(base64String);
    } catch (err) {
      setError("Error uploading the image. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <EdgeDetectionLayout
      optionsChildren={
        <ClassicOptions
          edgeDetectionParams={edgeDetectionParams}
          setEdgeDetectionParams={setEdgeDetectionParams}
          edgeDetectionParamsErrors={edgeDetectionParamsErrors}
          setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
        />
      }
      handleImageUpload={handleImageChange}
      uploadedImage={originalImageUrl}
      isUploading={isUploading}
      processedImage={processedImage}
      selectedImgForObjDetection={selectedImgForObjDetection}
      setSelectedImgForObjDetection={setSelectedImgForObjDetection}
      edgeDetectionParamsErrors={edgeDetectionParamsErrors}
      error={error}
      handleEdgeDetection={handleSubmit}
      postProcessedImage={postProcessedImage}
      setPostProcessedImage={setPostProcessedImage}
      annotatedImageUrl={annotatedImageUrl}
      setAnnotatedImageUrl={setAnnotatedImageUrl}
    />
  );
}

export default CEdgeDetection;
