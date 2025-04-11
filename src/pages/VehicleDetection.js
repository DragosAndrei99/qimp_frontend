import { useState } from "react";
import InputImage from "../components/edge_detection/InputImageComponent";
import ImageComponent from "../components/edge_detection/ImageComponent";
import ObjectRecognition from "../components/ObjectRecognition";
import PageHeader from "../components/common/PageHeader";

function VehicleDetection() {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <PageHeader label="Vehicle Detection" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputImage handleChange={handleImageChange} isDisabled={false} />
        <ImageComponent
          title={"ORIGINAL IMAGE"}
          processedImage={originalImageUrl}
        />

        {image && (
          <ObjectRecognition
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={image}
            setAnnotatedImageUrl={setAnnotatedImageUrl}
          />
        )}

        {annotatedImageUrl && (
          <ImageComponent
            title={"ANNOTATED IMAGE"}
            processedImage={annotatedImageUrl}
          />
        )}
      </div>
    </>
  );
}

export default VehicleDetection;
