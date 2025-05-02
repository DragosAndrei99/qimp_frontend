import PageHeader from "../components/common/PageHeader";
import { useEffect, useState } from "react";
import ImageComponent from "../components/edge_detection/ImageComponent";

function Insights({ apiEndpoint }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/images`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [apiEndpoint]);

  if (isLoading) {
    return (
      <>
        <PageHeader label="Quantum Edge Detection Insights" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader label="Quantum Edge Detection Insights" />
        <div className="text-red-500 text-center p-4">{error}</div>
      </>
    );
  }

  return (
    <>
      <PageHeader label="Quantum Edge Detection Insights" />
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        {images.map((image, idx) => (
          <ImageComponent
            key={image.edge_detected_image_id}
            title={`Entry ${idx + 1}`}
            processedImage={`data:image/jpeg;base64,${image.ground_truth_image_base64}`}
            enableSelect={false}
            children={
              <>
                <div className="flex flex-row gap-2 mt-4 mb-8">
                  <div className="flex flex-col gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] text-white text-md items-center font-bold">
                    <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Input Parameters:</label>
                    <p className="italic">Tile Size:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.tile_size}</p>
                    <p className="italic">Iterations:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.iterations}</p>
                    <p className="italic">Time to Complete:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.time_to_complete}</p>
                    <p className="italic">Threshold:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.threshold}</p>
                    <p className="italic">Margins Replaced:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.margins_replaced.toString()}</p>
                    <p className="italic">Edges Highlighted:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.edges_highlighted.toString()}</p>
                    <p className="italic">Gaussian Blur:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.gaussian_pre_processed.toString()}</p>
                    {image.edges_highlighted && (
                      <>
                        <p className="italic">Kernel Size:</p>
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.kernel_size}</p>
                        <p className="italic">Sigma:</p>
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.sigma}</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] w-full">
                    <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Quantum Edge Detected Result:</label>
                    <div className="flex flex-row items-center justify-center bg-[#39385E]">
                      <img
                        className="border-white border-2"
                        src={`data:image/jpeg;base64,${image.edge_detected_image_base64}`} alt="Edge Detection" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] text-white text-md items-center font-bold">
                    <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Result Metrics:</label>
                    <p className="italic">F1 Score:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.f1.toFixed(6)}</p>
                    <p className="italic">IOU:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.iou.toFixed(6)}</p>
                    <p className="italic">Precision:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.precision.toFixed(6)}</p>
                    <p className="italic">Recall:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.recall.toFixed(6)}</p>
                    <p className="italic">SSIM:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.ssim.toFixed(6)}</p>
                    <p className="italic">Hausdorff</p>
                    <p className="italic">Distance: </p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.hausdorff_distance}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <button className="bg-[#34335A] text-white px-4 py-2 rounded hover:bg-[#4d447a] active:bg-[#4d447a]"> Show more</button>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Ground Truth Image</label>
                </div>
              </>
            }
          />
        ))}
      </div>
    </>
  );
}

export default Insights;