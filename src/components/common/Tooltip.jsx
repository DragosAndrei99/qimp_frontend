import { FaRegQuestionCircle } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

function Tooltip({ toolTipText, toolTipId }) {
  return (
    <span className="relative z-40">
      <button
        data-tooltip-id={toolTipId}
        data-tooltip-content={toolTipText}
        className="relative ml-2 top-1"
      >
        <FaRegQuestionCircle size={25} />
      </button>
      <ReactTooltip
        id={toolTipId}
        place="top"
        style={{
          width: "200px",
          backgroundColor: "#010031",
          color: "white",
          textAlign: "center",
        }}
      />
    </span>
  );
}

export default Tooltip;
