import React, {useState} from 'react';
import './App.css'
import QEdgeDetectionCanvas from './components/QEdgeDetectionCanvas';
import ObjectRecognition from './components/ObjectRecognition';
import CEdgeDetection from './components/CEdgeDetection';

function App() {
    const [qImageLoaded, setQImageLoaded] = useState(false);
    const [QB64FinalImage, setQB64FinalImage] = useState("");
    const [cImageLoaded, setCImageLoaded] = useState(false);
    const [blobCFinalImage, setBlobCFinalImage] = useState("");
    return (
        <div>
            <h1>Quantum Edge Detection and Object Recognition</h1>
            <QEdgeDetectionCanvas
            apiEndpoint="http://127.0.0.1:5000/q-edge-detection"
            imageLoaded={qImageLoaded}
            setImageLoaded={setQImageLoaded}
            b64FinalImage={QB64FinalImage}
            setB64FinalImage={setQB64FinalImage}
            />
             {qImageLoaded && <ObjectRecognition 
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={QB64FinalImage}/>}
            <CEdgeDetection
            apiEndpoint="http://127.0.0.1:5000/c-edge-detection"
            image={cImageLoaded}
            setImage={setCImageLoaded}
            blobCFinalImage={blobCFinalImage}
            setBlobCFinalImage={setBlobCFinalImage}
            />
           
            {blobCFinalImage && <ObjectRecognition 
            apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
            edgeDetectedImage={blobCFinalImage}/>}
        </div>
    );
}

export default App;
