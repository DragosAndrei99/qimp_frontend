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
          toolTipText="Original image will be split into smaller square images due to hardware limitations on today's devices."
        />
      </div>

      <OptionsButtons
        title="Threshold"
        bttns={thresholdBttns}
        setBttns={setThresholdBttns}
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        bttnContainerClasses="ml-2 inline"
        toolTipText="Threshold is a normalized maximum difference between adjacent pixels in the original image. If threshold of the tile image is bigger than full image threshold then QHED will be ran for the tile."
      />

      <Checkbox
        label="Replace margins of the tiles:"
        paramKey="replaceMargins"
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        toolTipText="The quantum algorithm produces noise in the form of marking edges on the margins of each tile. This aims to remove noise."
      />

      <Checkbox
        label="Highlight edges:"
        paramKey="highlightEdges"
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        toolTipText="Sets all pixels that are different from 0 value to 255."
      />

      <GaussianOptions
        params={edgeDetectionParams}
        setParams={setEdgeDetectionParams}
        paramsErrors={edgeDetectionParamsErrors}
        setParamsErrors={setEdgeDetectionParamsErrors}
      />

      <div className="rounded-2xl w-fullshadow-lg">
      <label className="text-md font-bold mb-4">Simulator shots: <span className="ml-2 py-1 px-3 rounded-md bg-[#131333] text-white">{edgeDetectionParams.shots}</span></label>
      <input
        type="range"
        min="1"
        max="10001"
        step="100"
        value={edgeDetectionParams.shots}
        onChange={(e) => setEdgeDetectionParams({
          ...edgeDetectionParams,
          shots: Number(e.target.value)
        })}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm mt-2 ">
        <span>1</span>
        <span>10001</span>
      </div>
    </div>
    </>
  );
}

export default QuantumOptions;
