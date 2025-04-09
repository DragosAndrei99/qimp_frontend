
function OriginalImage({ originalImageUrl }) {

  return (
    <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
    <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
      ORIGINAL IMAGE
    </label>
    <div className="flex items-center justify-center bg-[#39385E]">
      {originalImageUrl && (
        <>
          <img src={originalImageUrl} alt="Uploaded" className="max-w-80" />
        </>
      )}
    </div>
  </div>
  )
}

export default OriginalImage;