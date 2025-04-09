

function ProcessedImage({ children, processedImage}) {

  return (
    <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
    <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
      PROCESSED IMAGE
    </label>
    {children}
    {processedImage && (
      <div className="flex items-center justify-center bg-[#39385E]">
        <img
          src={processedImage}
          alt="Final Edge Detected"
          className="max-w-80"
        />
      </div>
    )}
  </div>
  )
}

export default ProcessedImage;