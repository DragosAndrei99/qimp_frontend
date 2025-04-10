import { useState } from "react";
import GaussianOptions from "./GaussianOptions";
import OptionsButtons from "./OptionsButtons";

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

  return (
    <>
      <div className="mb-2">
        <GaussianOptions
          params={edgeDetectionParams}
          setParams={setEdgeDetectionParams}
          paramsErrors={edgeDetectionParamsErrors}
          setParamsErrors={setEdgeDetectionParamsErrors}
        />
        <OptionsButtons
          title="Algorithm"
          bttns={algorithmBttns}
          setBttns={setAlgorithmBttns}
          params={edgeDetectionParams}
          setParams={setEdgeDetectionParams}
        />
      </div>
    </>
  );
}

export default ClassicOptions;
