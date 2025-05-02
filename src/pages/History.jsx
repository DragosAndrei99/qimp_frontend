import PageHeader from "../components/common/PageHeader";
import { useEffect, useState } from "react";
import ImageComponent from "../components/edge_detection/ImageComponent";

function History() {
  const [images, setImages] = useState([]);


  return (
    <>
      <PageHeader label="Edge Detected Images History" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {images.map((image, idx) => 
          <ImageComponent
          key={image.id}
          title={`Image ${idx+1}`}
          processedImage={image.src}
          enableSelect={false}
          />
        )}
      </div>
    </>
  )
}

export default History;