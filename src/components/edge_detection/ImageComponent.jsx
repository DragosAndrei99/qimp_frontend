import { FaRegSave } from "react-icons/fa";
import { useRef, useEffect } from "react";
import Tooltip from "../common/Tooltip";

function ImageComponent({
  title,
  children,
  processedImage,
  enableSelect = false,
  selectedImg,
  setSelectedImg,
  downloadImage = undefined,
}) {
  const ref = useRef();

  const handleSelectImg = () => {
    if (selectedImg === processedImage) {
      setSelectedImg("");
    } else {
      setSelectedImg(processedImage);
    }
  };

  useEffect(() => {
    if (title === "ANNOTATED IMAGE") {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [processedImage, title]);

  return (
    <div
      ref={ref}
      className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl"
    >
      <div className="flex flex-row justify-between items-start">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          {title}
        </label>
        {processedImage && enableSelect && (
          <span className="flex flex-row">
            <input
              type="checkbox"
              className="relative form-checkbox h-5 w-5 cursor-pointer"
              checked={selectedImg === processedImage}
              onChange={handleSelectImg}
            />
            <span className="relative top-[-12px] left-2 text-[#B6B5C3]">
              <Tooltip
                toolTipText="Select the image to enable Vehicle detection."
                toolTipId="selectImg"
              />
            </span>
          </span>
        )}
      </div>
      {children}
      {processedImage && (
        <>
          <div className="flex flex-row items-center justify-center bg-[#39385E]">
            <img
              src={processedImage}
              alt="Final Edge Detected"
              className="max-w-60 max-h-60 sm:max-w-80 sm:max-h-80"
            />
          </div>
          <div className="flex flex-rows justify-end mt-4 gap-16">
            <a
              href={downloadImage || processedImage}
              download="image.jpg"
              className="p-3 px-5 rounded-md bg-[#010031] hover:bg-[#34335A] active:bg-[#34335A] focus:ring-2 focus:ring-white transition duration-150 flex items-center gap-2 text-white font-bold text-lg"
            >
              <FaRegSave size={30} color="white" />
              Save
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageComponent;
