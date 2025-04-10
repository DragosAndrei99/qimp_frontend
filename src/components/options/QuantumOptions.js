import { useState } from "react";
import { isPowerOf2 } from "../../utils/IsPowerOf2";
import OptionButton from "./OptionButton";

function QuantumOptions({
  edgeDetectionParams,
  setEdgeDetectionParams,
  edgeDetectionParamsErrors,
  setEdgeDetectionParamsErrors,
}) {
  const [thresholdBttns, setThresholdBttns] = useState([
    { id: 1, label: "No Threshold", isActive: false, threshold: 0 },
    { id: 2, label: "0.5x Threshold", isActive: false, threshold: 0.5 },
    { id: 3, label: "Normal Threshold", isActive: true, threshold: 1 },
    { id: 4, label: "x1.5 Threshold", isActive: false, threshold: 1.5 },
  ]);

  const handleThresholdBttnsClick = (id, threshold) => {
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      threshold: threshold,
    });
    const updatedButtons = thresholdBttns.map((btn) => ({
      ...btn,
      isActive: btn.id === id,
    }));
    setThresholdBttns(updatedButtons);
  };

  const handleRootPixelsForTileChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      rootPixelsForTile: inputValue,
    });
    if (inputValue === "" || numericValue < 2 || numericValue > 128) {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        rootPixelsForTileError: "Please enter a value that is a power of 2.",
      });
    } else if (isPowerOf2(numericValue)) {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        rootPixelsForTileError: "",
      });
      setEdgeDetectionParams({
        ...edgeDetectionParams,
        rootPixelsForTile: numericValue,
      });
    } else {
      setEdgeDetectionParamsErrors({
        ...edgeDetectionParamsErrors,
        rootPixelsForTileError: "Please enter a value that is a power of 2.",
      });
    }
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
        kernelSizeError: "Please enter an odd number for Kernel size between 0 and 21.",
      });

    } else if(numericValue % 2 !== 0) {
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
        kernelSizeError: "Please enter an odd number for Kernel Size between 0 and 21.",
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

  const handleReplaceMargins = () => {
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      replaceMargins: !edgeDetectionParams.replaceMargins,
    });
  };

  const handleHighlightEdges = () => {
    setEdgeDetectionParams({
      ...edgeDetectionParams,
      highlightEdges: !edgeDetectionParams.highlightEdges,
    });
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
        <label htmlFor="powerOf2Input" className="text-md font-bold ">
          Width/ Height for each tile:
        </label>
        <input
          id="powerOf2Input"
          type="number"
          min="2"
          max="128"
          value={edgeDetectionParams.rootPixelsForTile || ""}
          onChange={handleRootPixelsForTileChange}
          placeholder="0 - 128"
          className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
        />
        {edgeDetectionParamsErrors.rootPixelsForTileError && (
          <div className="text-sm text-red-600">{edgeDetectionParamsErrors.rootPixelsForTileError}</div>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Threshold:
        </label>
        <span className="ml-4">
          {thresholdBttns.map((btn) => (
            <OptionButton
              key={btn.id}
              id={btn.id}
              label={btn.label}
              handleClick={() =>
                handleThresholdBttnsClick(btn.id, btn.threshold)
              }
              isActive={btn.isActive}
            />
          ))}
        </span>
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Replace margins of the tiles:
        </label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-4"
          checked={edgeDetectionParams.replaceMargins}
          onChange={handleReplaceMargins}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="" className="text-md font-bold ">
          Highlight edges:
        </label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-4"
          checked={edgeDetectionParams.highlightEdges}
          onChange={handleHighlightEdges}
        />
      </div>

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
            <div className="text-sm text-red-600">{edgeDetectionParamsErrors.kernelSizeError}</div>
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
            <div className="text-sm text-red-600">{edgeDetectionParamsErrors.sigmaError}</div>
          )}
        </span>
      </div>
    </>
  );
}

export default QuantumOptions;
