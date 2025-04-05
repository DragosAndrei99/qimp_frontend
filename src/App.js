import React, { useState } from 'react';

function App() {
    const [imageStream, setImageStream] = useState([]);
    const [imageContainerWidth, setImageContainerWidth] = useState('0px');
    const [b64FinalImage, setB64FinalImage] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

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
                    if (done) ;

                    buffer += decoder.decode(value, { stream: true });

                    if(buffer.includes('final_edge_detected_image')) {
                        setImageStream([])

                        let finalImageParts = buffer.split('--frame--final_edge_detected_image--');
                        for (let i = 1; i < finalImageParts.length; i++) {
                            let part = finalImageParts[i].trim();
                            if(part) {
                                setB64FinalImage(prev => prev + part.replace('--end--', ''))
                            }
                            if (part.includes('--end--')) {
                                setImageLoaded(true);
                                setIsUploading(false);
                                return;
                            }
                        }
                        buffer = finalImageParts[finalImageParts.length - 1];
                    } else {
                        let parts = buffer.split('--frame');
    
                        for (let i = 1; i < parts.length; i++) {
                            let part = parts[i].trim();
                            if(part.includes('image_width')) {
                                setImageContainerWidth(`${part.split(":")[1].toString().split(":")}px`)
                            } else if(part) {
                                setImageStream(prevImages => [...prevImages, `data:image/png;base64,${part}`]);
                            }
                        }
                        buffer = parts[parts.length - 1];
                    }

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

    const styles = {
        display: 'inline-grid',
        width: imageContainerWidth,
        gridTemplateColumns: 'repeat(auto-fill, minmax(16px, 1fr))'
    }

    return (
        <div>
            <h1>Quantum Edge Detection</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
            />
            {isUploading && <p>Uploading image...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Received Image</h2>
                <div style={styles}>
                    {imageStream.map((image, index) => (
                        <img key={index} src={image} alt={`Streamed ${index}`} />
                    ))}
                </div>
                <div>
                {imageLoaded && <img
                    src={`data:image/png;base64,${b64FinalImage}`}
                    alt="Streamed"
                    style={{ maxWidth: '100%' }}
                    /> }
                </div>
            </div>
        </div>
    );
}

export default App;
