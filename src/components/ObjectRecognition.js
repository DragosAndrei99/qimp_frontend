import {useState} from 'react';

function ObjectRecognition({apiEndpoint, edgeDetectedImage}) {
  const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false); 
  const [error, setError] = useState(null);
  
  const base64ToBlob = (base64) => {
    if (!base64 || typeof base64 !== 'string') {
        throw new Error('Invalid Base64 string');
    }
    const binary = atob(base64);
    const length = binary.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < length; i++) {
        view[i] = binary.charCodeAt(i);
    }

    return new Blob([buffer], { type: 'image/png' });
};

  const handleImageUpload = async (event) => {
    event.preventDefault();

    setIsUploading(true);
    setError(null);

    const blob = base64ToBlob(edgeDetectedImage);
    const formData = new FormData();

    formData.append('image', blob, 'image.png');

    try {
        const response = await fetch(apiEndpoint, {
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
    <h1>Image Upload and Process</h1>
    <button
        onClick={handleImageUpload}
    >Detect</button>
    {isUploading && <p>Uploading image...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {imageUrl && (
        <div>
            <h2>Processed Image:</h2>
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