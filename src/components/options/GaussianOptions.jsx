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
      />

      <span
        className={`ml-5 ${
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
        />
      </span>
    </div>
  );
}

export default GaussianOptions;
