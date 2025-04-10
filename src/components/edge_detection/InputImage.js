import { FaFileArrowDown } from "react-icons/fa6";


function InputImage({ handleChange, isDisabled }) {
  return (
    <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
    <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
      INPUT IMAGE
    </label>
    <div className="border border-dashed border-[#6b62a8] rounded-md p-4 flex flex-col sm:flex-col items-center gap-4 bg-[#1a1540]">
      <div className="flex items-center justify-center text-sm text-gray-300">
        <div className="text-center">
          <div className="flex flex-row justify-center"><FaFileArrowDown size={32}/></div>
          Drop an image here...
        </div>
      </div>
      <div className="text-xs rounded-md font-bold text-white mb-2 p-6 tracking-widest bg-[#34335A]">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={isDisabled}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    </div>
  </div>
  )
}

export default InputImage;