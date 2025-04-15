import { FaRegSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { generateId } from "../../utils/RandomIdGenerator";
import { MdOutlineDeleteOutline } from "react-icons/md";

function ImageComponent({
  title,
  children,
  processedImage,
  enableSelect = false,
  selectedImg,
  setSelectedImg,
  imageId = undefined,
  handleDeleteFromHistory = undefined
}) {
  const ref = useRef();

  const [isAddedToLocalStorage, setIsAddedToLocalStorage] = useState(false);

  const handleSelectImg = () => {
    if (selectedImg === processedImage) {
      setSelectedImg("");
    } else {
      setSelectedImg(processedImage);
    }
  };

  const handleImageSaveToLocalStorage = async () => {
    localStorage.setItem(generateId(), processedImage);
    setIsAddedToLocalStorage(true)
  }

  useEffect(() => {
    if(title === "ANNOTATED IMAGE") {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [processedImage, title]);

  useEffect(() => {
    setIsAddedToLocalStorage(false)
  }, [processedImage])
  return (
    <div ref={ref} className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl">
      <div className="flex flex-row justify-between items-start">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          {title}
        </label>
        {processedImage && enableSelect && (
          <input
            type="checkbox"
            className="relative form-checkbox h-5 w-5 cursor-pointer"
            checked={selectedImg === processedImage}
            onChange={handleSelectImg}
          />
        )}
      </div>
      {children}
      {processedImage && (
        <>
          <div className="flex flex-row items-center justify-center bg-[#39385E]">
            <img
              src={processedImage}
              alt="Final Edge Detected"
              className="max-w-80 max-h-80"
            />
          </div>
          <div className="flex flex-rows justify-end mt-4 gap-16">
            {(title === "PROCESSED IMAGE" || title === "POST PROCESSED IMAGE") && <button
              onClick={handleImageSaveToLocalStorage}
              disabled={isAddedToLocalStorage}
              className="p-3 rounded-full bg-[#010031] hover:bg-[#34335A] active:bg-[#34335A] focus:ring-2 focus:ring-white transition duration-150 disabled:cursor-not-allowed"
              >
              <FaPlus size={35} color="white" />
            </button>}
            {title.split(' ')[0].includes('Image') &&
              <button
                onClick={() => handleDeleteFromHistory(imageId)}
                className="p-3 rounded-full bg-[#010031] hover:bg-[#34335A] active:bg-[#34335A] focus:ring-2 focus:ring-white transition duration-150"
                >
                <MdOutlineDeleteOutline size={35} color="white" />
              </button>}
            <a
              href={processedImage}
              download="image.jpg"
              className="p-3 rounded-full bg-[#010031] hover:bg-[#34335A] active:bg-[#34335A] focus:ring-2 focus:ring-white transition duration-150"
              >
              <FaRegSave size={35} color="white" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageComponent;
