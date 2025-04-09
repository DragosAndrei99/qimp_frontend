import { useState } from "react";
import InputImage from "../components/edge_detection/InputImage";
import Options from "../components/edge_detection/Options";
import ObjectRecognition from "../components/ObjectRecognition";
import ImageComponent from "../components/edge_detection/ImageComponent";
import DetectButton from "../components/edge_detection/DetectEdgesButton";

function CEdgeDetection({ apiEndpoint }) {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState("");
  const [blobCFinalImage, setBlobCFinalImage] = useState("");

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
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during image upload or edge detection.");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setProcessedImage(imageUrl);
      setBlobCFinalImage(imageBlob);
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

      <Options title={"EDGE DETECTION OPTIONS"}/>

      <ImageComponent
        title={"ORIGINAL IMAGE"}
        processedImage={originalImageUrl}
      />
      <ImageComponent
        title={"PROCESSED IMAGE"}
        processedImage={processedImage}
      />

      {blobCFinalImage && (
         <>
          <Options title={"POST PROCESSING OPTIONS"}/>
          <ObjectRecognition
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={blobCFinalImage}
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
        isDisabled={!image}
        isProcessing={isUploading}
        handleClick={handleSubmit}
        error={error}
        buttonText={"Detect Edges"}
      />
    </div>
  );
}

export default CEdgeDetection;
