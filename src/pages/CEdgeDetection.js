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
    // <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    //   <InputImage handleChange={handleImageChange} isDisabled={isUploading} />

    //   <Options
    //     title={"EDGE DETECTION OPTIONS"}
    //     children={
    //       <ClassicOptions
    //         edgeDetectionParams={edgeDetectionParams}
    //         setEdgeDetectionParams={setEdgeDetectionParams}
    //         edgeDetectionParamsErrors={edgeDetectionParamsErrors}
    //         setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
    //       />
    //     }
    //   />

    //   <ImageComponent
    //     title={"ORIGINAL IMAGE"}
    //     processedImage={originalImageUrl}
    //   />
    //   <ImageComponent
    //     title={"PROCESSED IMAGE"}
    //     processedImage={processedImage}
    //     enableSelect={true}
    //     selectedImg={selectedImgForObjDetection}
    //     setSelectedImg={setSelectedImgForObjDetection}
    //   />

    //   {processedImage && (
    //     <PostProcessingOptions
    //       image={base64ToBlob(processedImage.split(",")[1])}
    //       setProcessedImage={setPostProcessedImage}
    //       apiEndpoint="http://127.0.0.1:5000/post-processing"
    //     />
    //   )}

    //   {postProcessedImage && (
    //     <ImageComponent
    //       title={"POST PROCESSED IMAGE"}
    //       processedImage={postProcessedImage}
    //       enableSelect={true}
    //       selectedImg={selectedImgForObjDetection}
    //       setSelectedImg={setSelectedImgForObjDetection}
    //     />
    //   )}

    //   {selectedImgForObjDetection && (
    //       <ObjectRecognition
    //         apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
    //         edgeDetectedImage={base64ToBlob(
    //           selectedImgForObjDetection.split(",")[1]
    //         )}
    //         setAnnotatedImageUrl={setAnnotatedImageUrl}
    //       />
    //   )}

    //   {annotatedImageUrl && (
    //     <ImageComponent
    //       title={"ANNOTATED IMAGE"}
    //       processedImage={annotatedImageUrl}
    //     />
    //   )}

    //   <Button
    //     isDisabled={
    //       !image ||
    //       Object.values(edgeDetectionParamsErrors).some((value) =>
    //         Boolean(value)
    //       )
    //     }
    //     isProcessing={isUploading}
    //     handleClick={handleSubmit}
    //     error={error}
    //     buttonText={"Detect Edges"}
    //     containerClasses="fixed bottom-0 left-0 md:left-64 right-0 flex justify-center p-6 bg-[##010031]"
    //     bttnClasses="bg-emerald-500 hover:bg-emerald-600
    //               text-lg text-white font-bold
    //               py-2 px-12
    //               rounded-lg
    //               shadow-md hover:shadow-lg
    //               transition-all duration-200
    //               transform hover:scale-105 disabled:transform-none
    //               focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
    //               active:scale-95 disabled:active:scale-100
    //               cursor-pointer disabled:cursor-not-allowed"
    //   />
    // </div>

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
      processedImage={processedImage} //b64finalImage
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
