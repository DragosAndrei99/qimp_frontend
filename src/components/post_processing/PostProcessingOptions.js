import { useState } from "react";
import Options from "../edge_detection/OptionsComponent";
import OptionsButtons from "../options/OptionsButtons";
import InputNumber from "../common/InputNumber";
import Button from "../common/Button";
import { blobToBase64 } from "../../utils/BloblToBase64";

function PostProcessingOptions({ image, apiEndpoint, setProcessedImage }) {
  const [postProcessingParams, setPostProcessingParams] = useState({
    method: "dilation",
    kernelSize: 3,
    threshold: 0,
  });

  const [postProcessingParamsErrors, setPostProcessingParamsErrors] = useState({
    kernelSizeError: "",
    thresholdError: "",
  });

  const [methodBttns, setMethodBttns] = useState([
    { id: 1, label: "Dilation", isActive: true, method: "dilation" },
    { id: 2, label: "Erosion", isActive: false, method: "erosion" },
    { id: 3, label: "Opening", isActive: false, method: "opening" },
    { id: 4, label: "Closing", isActive: false, method: "closing" },
    { id: 5, label: "Thinning", isActive: false, method: "thinning" },
    { id: 6, label: "Edge Linking", isActive: false, method: "linking" },
  ]);

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState("");

  const isKernelDisabled = methodBttns.find(
    (bttn) =>
      bttn.isActive && (bttn.method === "thinning" || bttn.method === "linking")
  );

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
        method: postProcessingParams.method,
        threshold: postProcessingParams.threshold,
        kernel: postProcessingParams.kernelSize,
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
    <Options
      title={"POST PROCESSING OPTIONS"}
      children={
        <>
          <div className="my-2">
            <div className="flex flex-col gap-2 mb-2">
              <InputNumber
                label="Threshold:"
                paramKey="threshold"
                paramErrKey="thresholdError"
                value={postProcessingParams.threshold}
                params={postProcessingParams}
                setParams={setPostProcessingParams}
                paramsErrors={postProcessingParamsErrors}
                setParamsErros={setPostProcessingParamsErrors}
                errorMessage="Please enter an a number between 0 and 255."
                isDisabled={false}
                inputPlaceholder="0 - 255"
                errorCondition={(value) => value < 0 || value > 255}
                successCondition={() => true}
              />
              <span
                className={`${isKernelDisabled ? "opacity-20" : "opacity-100"}`}
              >
                <InputNumber
                  label="Kernel Size:"
                  paramKey="kernelSize"
                  paramErrKey="kernelSizeError"
                  value={postProcessingParams.kernelSize}
                  params={postProcessingParams}
                  setParams={setPostProcessingParams}
                  paramsErrors={postProcessingParamsErrors}
                  setParamsErros={setPostProcessingParamsErrors}
                  errorMessage="Please enter an odd number for Kernel Size between 0 and 21."
                  isDisabled={isKernelDisabled}
                  inputPlaceholder="0 - 21"
                  errorCondition={(value) => value < 1 || value > 21}
                  successCondition={(value) => value % 2 !== 0}
                />
              </span>
            </div>
            <OptionsButtons
              title="Method"
              bttns={methodBttns}
              setBttns={setMethodBttns}
              params={postProcessingParams}
              setParams={setPostProcessingParams}
              keyToUpdate="method"
            />
            <Button
              isDisabled={false}
              handleClick={handleSubmit}
              error={error}
              isProcessing={isUploading}
              buttonText="Process Image"
              containerClasses="left-0 md:left-64 right-0 flex justify-center p-6 bg-[##010031]"
              bttnClasses="bg-emerald-500 hover:bg-emerald-600 
                      text-md text-white font-bold
                      py-2 px-8
                      rounded-lg 
                      shadow-md hover:shadow-lg 
                      transition-all duration-200 
                      transform hover:scale-105 disabled:transform-none
                      focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                      active:scale-95 disabled:active:scale-100
                      cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </>
      }
    />
  );
}

export default PostProcessingOptions;
