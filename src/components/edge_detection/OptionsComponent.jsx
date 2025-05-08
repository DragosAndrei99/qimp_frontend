import { useRef, useEffect } from "react";
import Tooltip from "../common/Tooltip";

function Options({ title, toolTipText = "", toolTipId = "", children }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div
      ref={ref}
      className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl text-[#B6B5C3]"
    >
      <div className="flex justify-between">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          {title || "OPTIONS"}
        </label>
        <span className="relative top-[-12px] left-2">
          {toolTipText && (
            <Tooltip toolTipId={toolTipId} toolTipText={toolTipText} />
          )}
        </span>
      </div>
      {children}
    </div>
  );
}

export default Options;
