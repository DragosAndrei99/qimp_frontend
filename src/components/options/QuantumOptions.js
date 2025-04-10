import { useState } from "react";
import { isPowerOf2 } from "../../utils/IsPowerOf2";
import GaussianOptions from "./GaussianOptions";
import InputNumber from "../common/InputNumber";
import OptionsButtons from "./OptionsButtons";
import Checkbox from "../common/Checkbox";

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

  return (
    <>
      <div className="mb-2">
        <InputNumber
          label="Width/ Height for each tile:"
          paramKey="rootPixelsForTile"
          paramErrKey="rootPixelsForTileError"
          value={edgeDetectionParams.rootPixelsForTile}
          params={edgeDetectionParams}
          setParams={setEdgeDetectionParams}
          paramsErrors={edgeDetectionParamsErrors}
          setParamsErros={setEdgeDetectionParamsErrors}
          errorMessage="Please enter a value that is a power of 2."
          isDisabled={false}
          inputPlaceholder="0 - 128"
          errorCondition={(value) => value < 2 || value > 128}
          successCondition={(value) => isPowerOf2(value)}
        />
      </div>

      <OptionsButtons
        title="Threshold"
        bttns={thresholdBttns}
        setBttns={setThresholdBttns}
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        bttnContainerClasses="ml-2 inline"
      />

      <Checkbox
        label="Replace margins of the tiles:"
        paramKey="replaceMargins"
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
      />

      <Checkbox
        label="Highlight edges:"
        paramKey="highlightEdges"
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
      />

      <GaussianOptions
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        paramsErrors={edgeDetectionParamsErrors}
        setParamsErrors={setEdgeDetectionParamsErrors}
      />
    </>
  );
}

export default QuantumOptions;
