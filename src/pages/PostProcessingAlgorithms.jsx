import { useState } from "react";
import InputImage from "../components/edge_detection/InputImageComponent";
import ImageComponent from "../components/edge_detection/ImageComponent";
import PostProcessingOptions from "../components/post_processing/PostProcessingOptions";
import PageHeader from "../components/common/PageHeader";

function PostProcessingAlgorithms({ apiEndpoint }) {
  const [image, setImage] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [postProcessedImage, setPostProcessedImage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <PageHeader label="Post Processing Algorithms" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputImage handleChange={handleImageChange} isDisabled={false} />
        <ImageComponent
          title={"ORIGINAL IMAGE"}
          processedImage={originalImageUrl}
        />

        {image && (
          <PostProcessingOptions
            image={image}
            setProcessedImage={setPostProcessedImage}
            apiEndpoint={`${apiEndpoint}/post-processing`}
            setSelectedImgForObjDetection={() => {}}
          />
        )}

        {postProcessedImage && (
          <ImageComponent
            title={"POST PROCESSED IMAGE"}
            processedImage={postProcessedImage}
            enableSelect={false}
            selectedImg={image}
            setSelectedImg={() => {}}
          />
        )}
      </div>
    </>
  );
}

export default PostProcessingAlgorithms;
