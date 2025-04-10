import { useState } from "react";
import OptionButton from "./OptionButton";
import GaussianOptions from "./GaussianOptions";

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

  return (
    <>
      <div className="mb-2">
        <GaussianOptions
          edgeDetectionParams={edgeDetectionParams}
          setEdgeDetectionParams={setEdgeDetectionParams}
          edgeDetectionParamsErrors={edgeDetectionParamsErrors}
          setEdgeDetectionParamsErrors={setEdgeDetectionParamsErrors}
        />
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
