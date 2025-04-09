import React, {useState} from 'react';
import QEdgeDetectionCanvas from './QEdgeDetectionCanvas';
import ObjectRecognition from './ObjectRecognition';
import CEdgeDetection from './CEdgeDetection';


function ImageProcessing({ edgeDetectionType }) {
  const [qImageLoaded, setQImageLoaded] = useState(false);
  const [QB64FinalImage, setQB64FinalImage] = useState("");
  const [cImageLoaded, setCImageLoaded] = useState(false);
  const [blobCFinalImage, setBlobCFinalImage] = useState("");



  return (
      <div className='m-10 pb-28'>
        {edgeDetectionType === "Quantum" ? <QEdgeDetectionCanvas
          apiEndpoint="http://127.0.0.1:5000/q-edge-detection"
          imageLoaded={qImageLoaded}
          setImageLoaded={setQImageLoaded}
          b64FinalImage={QB64FinalImage}
          setB64FinalImage={setQB64FinalImage}
          /> : 

          <CEdgeDetection

          apiEndpoint="http://127.0.0.1:5000/c-edge-detection"
          image={cImageLoaded}
          setImage={setCImageLoaded}
          blobCFinalImage={blobCFinalImage}
          setBlobCFinalImage={setBlobCFinalImage}
          />
          }

           {qImageLoaded && <ObjectRecognition 
          apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
          edgeDetectedImage={QB64FinalImage}/>}
          

          {blobCFinalImage && <ObjectRecognition 
          apiEndpoint="http://127.0.0.1:5000/yolov5-get-annotated-img"
          edgeDetectedImage={blobCFinalImage}/>}

      </div>
  );

}

export default ImageProcessing;