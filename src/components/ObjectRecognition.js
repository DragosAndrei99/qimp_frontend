import { useState } from "react";
import { base64ToBlob } from "../utils/Base64ToBlob";
import Options from "./edge_detection/OptionsComponent";

function ObjectRecognition({
  apiEndpoint,
  edgeDetectedImage,
  setAnnotatedImageUrl,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [confLevel, setConfLevel] = useState(0.5);

  const handleConfLevelChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 0 && inputValue <= 1) {
      setConfLevel(inputValue);
    }
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    setIsUploading(true);
    setError(null);
    const blob =
      typeof edgeDetectedImage === "string"
        ? base64ToBlob(edgeDetectedImage)
        : edgeDetectedImage;
    const formData = new FormData();

    formData.append("image", blob, "image.png");

    try {
      const response = await fetch(`${apiEndpoint}?conf_level=${confLevel}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the processed image");
      }

      const blob = await response.blob();
      if (blob) {
        setAnnotatedImageUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Options
      title={"OBJECT RECOGNITION OPTIONS"}
      children={
        <>
          <div>
            <label htmlFor="confLevel" className="text-md font-bold ">
              Confidence Level:
            </label>
            <input
              id="confLevel"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={confLevel}
              onChange={handleConfLevelChange}
              placeholder="0 - 1"
              className="bg-[#131333] p-1 ml-4 rounded-md font-bold text-white"
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-emerald-500 hover:bg-emerald-600 
                    text-md text-white font-bold
                    py-2 px-8
                    rounded-lg 
                    shadow-md hover:shadow-lg 
                    focus:outline-none focus:ring-2
                    cursor-pointer disabled:cursor-not-allowed"
              onClick={handleImageUpload}
            >
              {isUploading ? "Uploading image..." : "Detect Vehicles"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </>
      }
    />
  );
}

export default ObjectRecognition;
