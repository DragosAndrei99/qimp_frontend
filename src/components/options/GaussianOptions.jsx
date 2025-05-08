import InputNumber from "../common/InputNumber";
import Checkbox from "../common/Checkbox";

function GaussianOptions({ params, setParams, paramsErrors, setParamsErrors }) {
  return (
    <div className="mb-2">
      <Checkbox
        label="Run Gaussian Blur:"
        paramKey="gaussianBlur"
        params={params}
        setParams={setParams}
        toolTipText="Pre-processing step to soften or smooth an image (blur)."
      />

      <span
        className={`flex justify-start gap-4 ${
          !params.gaussianBlur ? "opacity-20" : "opacity-100"
        }`}
      >
        <InputNumber
          label="Kernel Size:"
          paramKey="kernelSize"
          paramErrKey="kernelSizeError"
          value={params.kernelSize}
          params={params}
          setParams={setParams}
          paramsErrors={paramsErrors}
          setParamsErros={setParamsErrors}
          errorMessage="Please enter an odd number for Kernel Size between 0 and 21."
          isDisabled={!params.gaussianBlur}
          inputPlaceholder="0 - 21"
          errorCondition={(value) => value < 1 || value > 21}
          successCondition={(value) => value % 2 !== 0}
          toolTipText={params.gaussianBlur && "Spatial area of blur."}
        />
        <InputNumber
          label="Sigma:"
          paramKey="sigma"
          paramErrKey="sigmaError"
          value={params.sigma}
          params={params}
          setParams={setParams}
          paramsErrors={paramsErrors}
          setParamsErros={setParamsErrors}
          errorMessage="Please enter a value for Sigma between 0 and 5."
          isDisabled={!params.gaussianBlur}
          inputPlaceholder="0 - 5"
          errorCondition={(value) => value < 1 || value > 5}
          successCondition={() => true}
          toolTipText={
            params.gaussianBlur && "Sharpness of the Gaussian curve."
          }
        />
      </span>
    </div>
  );
}

export default GaussianOptions;
