import { useState } from 'react';
import { base64ToBlob } from '../utils/Base64ToBlob';

function ObjectRecognition({apiEndpoint, edgeDetectedImage}) {
  const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false); 
  const [error, setError] = useState(null);
  const [confLevel, setConfLevel] = useState(0.5)

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
    console.log(edgeDetectedImage)
    const blob = typeof edgeDetectedImage === 'string' ? base64ToBlob(edgeDetectedImage) : edgeDetectedImage;
    const formData = new FormData();

    formData.append('image', blob, 'image.png');

    try {
        const response = await fetch(`${apiEndpoint}?conf_level=${confLevel}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the processed image');
        }

        const blob = await response.blob();
        if (blob) {
            setImageUrl(URL.createObjectURL(blob));
        } else {
            throw new Error('Invalid response from the server');
        }
    } catch (error) {
        console.log(error)
        setError(error.message)
    } finally {
        setIsUploading(false);
    }
};

  return (
    <div>
    <h3>Object Detection using yolov5</h3>
    <div>
      <h3>Model parameters</h3>
      <p>Confidence Level:</p>
      <input
              type="number"
              step="0.01"  // Allow decimal values
              min="0"
              max="1"
              value={confLevel}
              onChange={handleConfLevelChange}
              placeholder="0 - 1"
            />
    </div>
    <button
        onClick={handleImageUpload}
    >Detect</button>
    {isUploading && <p>Uploading image...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {imageUrl && (
        <div>
            <h3>Annotated Image:</h3>
            <img
                src={imageUrl}
                alt="Processed"
                style={{ maxWidth: '100%', marginTop: '20px' }}
            />
        </div>
    )}
</div>
  )
}

export default ObjectRecognition;