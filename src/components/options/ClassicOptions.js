import { useState } from "react";
import OptionButton from "./OptionButton";

function ClassicOptions({
  edgeDetectionParams,
  setEdgeDetectionParams,
  edgeDetectionParamsErrors,
  setEdgeDetectionParamsErrors,
}) {
  const [algorithmBttns, setAlgorithmBttns] = useState([
    { id: 1, label: "Canny ", isActive: true, algorithm: "canny" },
    { id: 2, label: "Sobel Operator", isActive: false, algorithm: "sobel" },
    {
      id: 3,
      label: "Laplacian of Gaussian",
      isActive: false,
      algorithm: "log",
    },
    { id: 4, label: "Prewitt Operator", isActive: false, algorithm: "prewitt" },
    {
      id: 5,
      label: "Roberts Cross Operator",
      isActive: false,
      algorithm: "roberts",
    },
  ]);

  const handleOptionBttnsClick = (id, algorithm) => {
    const updatedButtons = algorithmBttns.map((btn) => ({
      ...btn,
      isActive: btn.id === id,
    }));
    setAlgorithmBttns(updatedButtons);
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      algorithm: algorithm,
    });
  };

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
    <>
      <div className="mb-2">
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
        <div className="mb-2">
          <label htmlFor="" className="text-md font-bold ">
            Algorithm:
          </label>
          <span className="ml-4 mt-4 flex">
            {algorithmBttns.map((btn) => (
              <OptionButton
                key={btn.id}
                id={btn.id}
                label={btn.label}
                handleClick={() =>
                  handleOptionBttnsClick(btn.id, btn.algorithm)
                }
                isActive={btn.isActive}
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default ClassicOptions;
