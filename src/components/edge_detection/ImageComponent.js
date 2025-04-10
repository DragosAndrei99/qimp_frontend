import { FaRegSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function ImageComponent({ title, children, processedImage }) {
  return (
    <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
      <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
        {title}
      </label>
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
            <a href={processedImage} download="image.jpg" className="px-4 cursor-pointer" >
              <FaPlus size={35} color="#B6B5C3" />
            </a>
            <a href={processedImage} download="image.jpg" className="px-4 cursor-pointer" >
              <FaRegSave size={35} color="#B6B5C3" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageComponent;
