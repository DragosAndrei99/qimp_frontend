import PageHeader from "../components/common/PageHeader";
import { useEffect, useState } from "react";
import ImageComponent from "../components/edge_detection/ImageComponent";

function History() {
  const [images, setImages] = useState([]);

  const handleDeleteFromHistory = (id) => {
    const updatedItems = images.filter((item) => item.id !== id);
    setImages(updatedItems);
    localStorage.removeItem(id)
  }

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("img_"));
    const savedImages = keys.map((key) => ({ id: key, src: localStorage.getItem(key) }));
    setImages(savedImages);
  }, []);
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
          imageId={image.id}
          handleDeleteFromHistory={handleDeleteFromHistory}
          />
        )}
      </div>
    </>
  )
}

export default History;