import React, {useState} from 'react';
import QEdgeDetectionCanvas from './components/QEdgeDetectionCanvas';
import ObjectRecognition from './components/ObjectRecognition';

function App() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [b64FinalImage, setB64FinalImage] = useState("");

    return (
        <div>
            <h1>Quantum Edge Detection and Object Recognition</h1>
            <QEdgeDetectionCanvas
            apiEndpoint="http://127.0.0.1:5000/q-edge-detection"
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            b64FinalImage={b64FinalImage}
            setB64FinalImage={setB64FinalImage}
            />
            {imageLoaded && <ObjectRecognition 
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={b64FinalImage}/>}
        </div>
    );
}

export default App;
