import { FaRegSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useRef, useEffect } from "react";

function ImageComponent({
  title,
  children,
  processedImage,
  enableSelect = false,
  selectedImg,
  setSelectedImg,
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
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [processedImage]);
  return (
    <div ref={ref} className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl">
      <div className="flex flex-row justify-between items-start">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          {title}
        </label>
        {processedImage && enableSelect && (
          <input
            type="checkbox"
            className="relative form-checkbox h-5 w-5"
            checked={selectedImg === processedImage}
            onChange={handleSelectImg}
          />
        )}
      </div>
      {children}
      {processedImage && (
        <>
          <div className="flex items-center justify-center bg-[#39385E]">
            <img
              src={processedImage}
              alt="Final Edge Detected"
              className="max-w-80"
            />
          </div>
          <div className="flex flex-rows justify-end mt-4 gap-16">
            <a
              href={processedImage}
              download="image.jpg"
              className="px-4 cursor-pointer"
            >
              <FaPlus size={35} color="#B6B5C3" />
            </a>
            <a
              href={processedImage}
              download="image.jpg"
              className="px-4 cursor-pointer"
            >
              <FaRegSave size={35} color="#B6B5C3" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageComponent;
