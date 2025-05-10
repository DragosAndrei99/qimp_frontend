import DetectionResults from "./DetectionResults";
import Tooltip from "../common/Tooltip";

function DetectionResultsContainer({ title, firstImageB64, firstImageTitle, firstImageResults, secondImageB64, secondImageTitle, secondImageResults }) {
    return (
        <div className="flex flex-col items-center gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] w-full relative">
        <div className="absolute top-2 right-2 text-white">
          <Tooltip
            toolTipId="vehicle-detection-info"
            toolTipText="Confidence level was set to 0.3 for both images"
          />
        </div>
        <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          {title}
        </label>
        <div className="flex flex-col items-center justify-center bg-[#39385E] 1380px:flex-row">
          <img
            className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
            src={`data:image/jpeg;base64,${firstImageB64}`}
            alt="Edge Detection"
          />
          <img
            className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
            src={`data:image/jpeg;base64,${secondImageB64}`}
            alt="Ground truth"
          />
        </div>
        <div className="flex flex-col gap-2 w-full justify-around 1380px:flex-row">
          <DetectionResults
            detectionResults={
              firstImageResults
            }
            title={firstImageTitle}
          />
          <DetectionResults
            detectionResults={
              secondImageResults
            }
            title={secondImageTitle}
          />
        </div>
      </div>
    )   
}

export default DetectionResultsContainer;
