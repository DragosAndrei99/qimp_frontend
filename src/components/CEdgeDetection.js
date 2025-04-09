import { useState } from "react";
import DetectEdgesButton from "./edge_detection/DetectEdgesButton";
import InputImage from "./edge_detection/InputImage";
import OriginalImage from "./edge_detection/OriginalImage";
import Options from "./edge_detection/Options";
import ProcessedImage from "./edge_detection/ProcessedImage";

function CEdgeDetection({ apiEndpoint, setBlobCFinalImage }) {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

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

      <Options />

      <OriginalImage originalImageUrl={originalImageUrl} />
      <ProcessedImage processedImage={processedImage}/>

      <DetectEdgesButton
        isDisabled={isUploading}
        handleClick={handleSubmit}
        error={error}
      />
    </div>
  );
}

export default CEdgeDetection;
