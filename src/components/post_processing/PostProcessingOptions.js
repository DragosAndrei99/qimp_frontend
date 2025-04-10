import Options from "../edge_detection/OptionsComponent";
import { useState } from "react";
import OptionsButtons from "../options/OptionsButtons";
import InputNumber from "../common/InputNumber";

function PostProcessingOptions({
  postProcessingParams,
  setPostProcessingParams,
  postProcessingParamsErrors,
  setPostProcessingParamsErrors,
}) {
  const [methodBttns, setMethodBttns] = useState([
    { id: 1, label: "Dilation", isActive: true, value: "dilation" },
    { id: 2, label: "Erosion", isActive: false, value: "erosion" },
    { id: 3, label: "Opening", isActive: false, value: "opening" },
    { id: 4, label: "Closing", isActive: false, value: "closing" },
    { id: 5, label: "Thinning", isActive: false, value: "thinning" },
    { id: 6, label: "Edge Linking", isActive: false, value: "linking" },
  ]);

  const isKernelDisabled = methodBttns.find(
    (bttn) =>
      bttn.isActive && (bttn.value === "thinning" || bttn.value === "linking")
  );

  return (
    <Options
      title={"POST PROCESSING OPTIONS"}
      children={
        <>
          <div className="mb-2">
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
            <OptionsButtons
              title="Method"
              bttns={methodBttns}
              setBttns={setMethodBttns}
              params={postProcessingParams}
              setParams={setPostProcessingParams}
            />
          </div>
        </>
      }
    />
  );
}

export default PostProcessingOptions;
