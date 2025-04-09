import { useState } from "react";

function CEdgeDetection({ apiEndpoint, image, setImage, setBlobCFinalImage }) {
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setProcessedImage(null);
      setError("");
      setOriginalImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setIsUploading(true);
    setError("");

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during image upload or edge detection.");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setProcessedImage(imageUrl);
      setBlobCFinalImage(imageBlob);
    } catch (err) {
      setError("Error uploading the image. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          INPUT IMAGE
        </label>
        <div className="border border-dashed border-[#6b62a8] rounded-md p-4 flex flex-col sm:flex-col items-center gap-4 bg-[#1a1540]">
          <div className="flex items-center justify-center text-sm text-gray-300">
            <div className="text-center">
              <div className="text-pink-400 text-xl mb-1">⬇</div>
              Drop an image here...
            </div>
          </div>
          <div className="text-xs rounded-md font-bold text-white mb-2 p-6 tracking-widest bg-[#34335A]">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto text-[#B6B5C3]">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          OPTIONS
        </label>
      </div>

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

      <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-3xl mx-auto">
        <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
          PROCESSED IMAGE
        </label>

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

      <div className="fixed bottom-0 left-0 md:left-64 right-0 flex justify-center p-6 bg-[##010031]">
        <button
            disabled={isUploading}
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 
                      text-lg text-white font-bold
                      py-2 px-12
                      rounded-lg 
                      shadow-md hover:shadow-lg 
                      transition-all duration-200 
                      transform hover:scale-105 disabled:transform-none
                      focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                      active:scale-95 disabled:active:scale-100
                      cursor-pointer disabled:cursor-not-allowed"
          >
            {isUploading ? "Processing..." : "Detect Edges"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    </div>
  );
}

export default CEdgeDetection;
