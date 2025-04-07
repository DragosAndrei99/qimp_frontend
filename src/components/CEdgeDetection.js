import { useState } from 'react';


function CEdgeDetection({ apiEndpoint, image, setImage, setBlobCFinalImage }){
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setProcessedImage(null);
      setError('');
      setOriginalImageUrl(URL.createObjectURL(file))
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setIsUploading(true);
    setError('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error during image upload or edge detection.');
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setProcessedImage(imageUrl);
      setBlobCFinalImage(imageBlob)
    } catch (err) {
      setError('Error uploading the image. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="App">
      <h2>Edge Detection using Canny Algorithm</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit} disabled={!originalImageUrl}>
        {isUploading ? 'Processing...' : 'Detect Edges'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {originalImageUrl && (
        <div>
          <h3>Original Image</h3>
          <img src={originalImageUrl} alt="Original" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}

      {processedImage && (
        <div>
          <h3>Processed Image (Canny Edge Detection)</h3>
          <img src={processedImage} alt="Processed" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );

}

export default CEdgeDetection;