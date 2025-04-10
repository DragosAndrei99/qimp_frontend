

function GaussianOptions({
  edgeDetectionParams,
  setEdgeDetectionParams,
  edgeDetectionParamsErrors,
  setEdgeDetectionParamsErrors
}) {

  const handleKernelSizeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      kernelSize: inputValue,
    });
    if (inputValue === "" || numericValue < 1 || numericValue > 21) {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        kernelSizeError:
          "Please enter an odd number for Kernel size between 0 and 21.",
      });
    } else if (numericValue % 2 !== 0) {
      setEdgeDetectionParams({
        ...edgeDetectionParams,
        kernelSize: numericValue,
      });

      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        kernelSizeError: "",
      });
    } else {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        kernelSizeError:
          "Please enter an odd number for Kernel Size between 0 and 21.",
      });
    }
  };

  const handleSigmaChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      sigma: inputValue,
    });
    if (inputValue === "" || numericValue < 1 || numericValue > 5) {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        sigmaError: "Please enter a value for Sigma between 0 and 5.",
      });
    } else {
      setEdgeDetectionParams({
        ...edgeDetectionParams,
        sigma: numericValue,
      });

      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        sigmaError: "",
      });
    }
  };

  const handleGaussianBlur = () => {
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      gaussianBlur: !edgeDetectionParams.gaussianBlur,
    });
  };

  return (
    <div className="mb-2">
    <label htmlFor="" className="text-md font-bold ">
      Run Gaussian Blur:
    </label>
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 ml-4"
      checked={edgeDetectionParams.gaussianBlur || ""}
      onChange={handleGaussianBlur}
    />

    <span
      className={`${
        !edgeDetectionParams.gaussianBlur ? "opacity-20" : "opacity-100"
      }`}
    >
      <label htmlFor="kernelSize" className="text-md font-bold ml-5">
        Kernel Size:
      </label>
      <input
        id="kernelSize"
        type="number"
        min="3"
        max="21"
        placeholder="0 - 21"
        value={edgeDetectionParams.kernelSize || ""}
        onChange={handleKernelSizeChange}
        className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
        disabled={!edgeDetectionParams.gaussianBlur}
      />
      {edgeDetectionParamsErrors.kernelSizeError && (
        <div className="text-sm text-red-600">
          {edgeDetectionParamsErrors.kernelSizeError}
        </div>
      )}

      <label htmlFor="sigma" className="text-md font-bold ml-5">
        Sigma:
      </label>
      <input
        id="sigma"
        type="number"
        min="1"
        max="5"
        placeholder="0 - 5"
        value={edgeDetectionParams.sigma}
        onChange={handleSigmaChange}
        className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
        disabled={!edgeDetectionParams.gaussianBlur}
      />
      {edgeDetectionParamsErrors.sigmaError && (
        <div className="text-sm text-red-600">
          {edgeDetectionParamsErrors.sigmaError}
        </div>
      )}
    </span>
  </div>
  )
}

export default GaussianOptions;