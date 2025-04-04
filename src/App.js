import React, { useState } from 'react';

function App() {
    const [imageStream, setImageStream] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) {
            setError('Please select an image.');
            return;
        }
        setIsUploading(true);
        setError(null);
        setImageStream([]);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/q-edge-detection', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            function processStream() {
                reader.read().then(({ done, value }) => {
                    if (done) return;

                    buffer += decoder.decode(value, { stream: true });

                    let parts = buffer.split('--frame');
                    for (let i = 1; i < parts.length; i++) {
                        let part = parts[i].trim();

                        if(part) {
                            setImageStream(prevImages => [...prevImages, `data:image/png;base64,${part}`]);
                        }
                    }

                    buffer = parts[parts.length - 1];
                    processStream();
                }).catch(error => {
                    setError(error.message);
                    setIsUploading(false);
                });
            }

            processStream();
        } catch (error) {
            setError(error.message);
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h1>Upload Image and Receive Image Stream</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
            />
            {isUploading && <p>Uploading image...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Received Images</h2>
                <div>
                    {imageStream.map((image, index) => (
                        <img key={index} src={image} alt={`Streamed ${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
