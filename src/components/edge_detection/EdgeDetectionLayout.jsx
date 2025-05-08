import InputImage from "./InputImageComponent";
import Options from "./OptionsComponent";
import ObjectRecognition from "../ObjectRecognition";
import ImageComponent from "./ImageComponent";
import Button from "../common/Button";
import PostProcessingOptions from "../post_processing/PostProcessingOptions";
import { base64ToBlob } from "../../utils/Base64ToBlob";

function EdgeDetectionLayout({
  optionsChildren,
  processedImageChildren = "",
  handleImageUpload,
  uploadedImage,
  isUploading,
  processedImage,
  selectedImgForObjDetection,
  setSelectedImgForObjDetection,
  edgeDetectionParamsErrors,
  error,
  handleEdgeDetection,
  postProcessedImage,
  setPostProcessedImage,
  annotatedImageUrl,
  setAnnotatedImageUrl,
  optionsToolTipId = "",
  optionsToolTipText = "",
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InputImage handleChange={handleImageUpload} isDisabled={isUploading} />

      <Options
        title={"EDGE DETECTION SETTINGS"}
        children={optionsChildren}
        toolTipId={optionsToolTipId}
        toolTipText={optionsToolTipText}
      />

      <ImageComponent title={"ORIGINAL IMAGE"} processedImage={uploadedImage} />

      <ImageComponent
        title={"PROCESSED IMAGE"}
        processedImage={processedImage}
        enableSelect={true}
        selectedImg={selectedImgForObjDetection}
        setSelectedImg={setSelectedImgForObjDetection}
        children={processedImageChildren}
      />

      <Button
        isDisabled={
          isUploading ||
          !uploadedImage ||
          Object.values(edgeDetectionParamsErrors).some((value) =>
            Boolean(value),
          )
        }
        handleClick={handleEdgeDetection}
        isProcessing={isUploading}
        error={error}
        buttonText={"Detect Edges"}
        containerClasses="fixed bottom-8 left-1/2 transform -translate-x-1/2 md:left-[calc(50%+125px)]"
        bttnClasses="bg-emerald-500 hover:bg-emerald-600
                text-lg text-white font-bold
                py-2 px-12
                rounded-lg 
                shadow-md hover:shadow-lg 
                transition-all duration-200 
                transform hover:scale-105 disabled:transform-none
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                active:scale-95 disabled:active:scale-100
                cursor-pointer disabled:cursor-not-allowed"
      />

      {!isUploading && processedImage && (
        <PostProcessingOptions
          image={base64ToBlob(processedImage.split(",")[1])}
          setProcessedImage={setPostProcessedImage}
          apiEndpoint="http://127.0.0.1:5000/post-processing"
          setSelectedImgForObjDetection={setSelectedImgForObjDetection}
        />
      )}

      {postProcessedImage && (
        <ImageComponent
          title={"POST PROCESSED IMAGE"}
          processedImage={postProcessedImage}
          enableSelect={true}
          selectedImg={selectedImgForObjDetection}
          setSelectedImg={setSelectedImgForObjDetection}
        />
      )}

      {!isUploading && selectedImgForObjDetection && (
        <ObjectRecognition
          apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
          edgeDetectedImage={base64ToBlob(
            selectedImgForObjDetection.split(",")[1],
          )}
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
  );
}

export default EdgeDetectionLayout;
