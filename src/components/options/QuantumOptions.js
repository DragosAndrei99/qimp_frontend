import { useState } from "react";
import { isPowerOf2 } from "../../utils/IsPowerOf2";
import OptionButton from "./OptionButton";
import GaussianOptions from "./GaussianOptions";

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

      <GaussianOptions
       edgeDetectionParams={edgeDetectionParams}
       setEdgeDetectionParams={setEdgeDetectionParams}
       edgeDetectionParamsErrors={edgeDetectionParamsErrors}
       setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
      />
    </>
  );
}

export default QuantumOptions;
