import QEdgeDetectionCanvas from "./QEdgeDetectionCanvas";
import CEdgeDetection from "./CEdgeDetection";

function ImageProcessing({ edgeDetectionType }) {

  return (
    <div className="m-10 pb-28">
      {edgeDetectionType === "Quantum" ? (
        <QEdgeDetectionCanvas
          apiEndpoint="http://127.0.0.1:5000/q-edge-detection"
        />
      ) : (
        <CEdgeDetection
          apiEndpoint="http://127.0.0.1:5000/c-edge-detection"
        />
      )}
    </div>
  );
}

export default ImageProcessing;
