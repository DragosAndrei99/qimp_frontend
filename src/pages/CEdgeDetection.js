import { useState } from "react";
import { base64ToBlob } from "../utils/Base64ToBlob";
import { blobToBase64 } from "../utils/BloblToBase64";

import InputImage from "../components/edge_detection/InputImageComponent";
import Options from "../components/edge_detection/OptionsComponent";
import ObjectRecognition from "../components/ObjectRecognition";
import ImageComponent from "../components/edge_detection/ImageComponent";
import DetectButton from "../components/edge_detection/DetectEdgesButton";
import ClassicOptions from "../components/options/ClassicOptions";
import PostProcessingOptions from "../components/post_processing/PostProcessingOptions";

function CEdgeDetection({ apiEndpoint }) {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState("");

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

  const [postProcessingParams, setPostProcessingParams] = useState({
    method: "dilation",
    kernelSize: 3,
    threshold: 0,
  });

  const [postProcessingParamsErros, setPostProcessingParamsErrors] = useState({
    kernelSizeError: "",
    thresholdError: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InputImage handleChange={handleImageChange} isDisabled={isUploading} />

      <Options
        title={"EDGE DETECTION OPTIONS"}
        children={
          <ClassicOptions
            edgeDetectionParams={edgeDetectionParams}
            setEdgeDetectionParams={setEdgeDetectionParams}
            edgeDetectionParamsErrors={edgeDetectionParamsErrors}
            setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
          />
        }
      />

      <ImageComponent
        title={"ORIGINAL IMAGE"}
        processedImage={originalImageUrl}
      />
      <ImageComponent
        title={"PROCESSED IMAGE"}
        processedImage={processedImage}
        enableSelect={true}
        selectedImg={selectedImgForObjDetection}
        setSelectedImg={setSelectedImgForObjDetection}
      />

      {processedImage && (
        <PostProcessingOptions
          postProcessingParams={postProcessingParams}
          setPostProcessingParams={setPostProcessingParams}
          postProcessingParamsErrors={postProcessingParamsErros}
          setPostProcessingParamsErrors={setPostProcessingParamsErrors}
        />
      )}

      {selectedImgForObjDetection && (
        <>
          <ObjectRecognition
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={base64ToBlob(
              selectedImgForObjDetection.split(",")[1]
            )}
            setAnnotatedImageUrl={setAnnotatedImageUrl}
          />
        </>
      )}

      {annotatedImageUrl && (
        <ImageComponent
          title={"ANNOTATED IMAGE"}
          processedImage={annotatedImageUrl}
        />
      )}

      <DetectButton
        isDisabled={
          !image ||
          Object.values(edgeDetectionParamsErrors).some((value) =>
            Boolean(value)
          )
        }
        isProcessing={isUploading}
        handleClick={handleSubmit}
        error={error}
        buttonText={"Detect Edges"}
      />
    </div>
  );
}

export default CEdgeDetection;
