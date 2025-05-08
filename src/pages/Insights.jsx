import PageHeader from "../components/common/PageHeader";
import { useEffect, useState } from "react";
import ImageComponent from "../components/edge_detection/ImageComponent";
import Tooltip from "../components/common/Tooltip";
import { FaStar, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';


function Insights({ apiEndpoint }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bestMetrics, setBestMetrics] = useState({
    f1: 0,
    iou: 0,
    precision: 0,
    recall: 0,
    ssim: 0,
    hausdorff_distance: Infinity,
    time_to_complete: Infinity,
    tile_size: 0
  });

  const [averageSSIM, setAverageSSIM] = useState(0);
  const [averageTimeToComplete, setAverageTimeToComplete] = useState(0);
  const [averageF1Score, setAverageF1Score] = useState(0);
 
  const navigate = useNavigate();

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
        const reversedData = data.reverse();
        setImages(reversedData);
        setAverageSSIM(reversedData.reduce((sum, img) => sum + img.ssim, 0) / reversedData.length);
        setAverageTimeToComplete(reversedData.reduce((sum, img) => sum + img.time_to_complete, 0) / reversedData.length);
        setAverageF1Score(reversedData.reduce((sum, img) => sum + img.f1, 0) / reversedData.length);
        const best = {
          f1: Math.max(...reversedData.map(img => img.f1)),
          iou: Math.max(...reversedData.map(img => img.iou)),
          precision: Math.max(...reversedData.map(img => img.precision)),
          recall: Math.max(...reversedData.map(img => img.recall)),
          ssim: Math.max(...reversedData.map(img => img.ssim)),
          hausdorff_distance: Math.min(...reversedData.map(img => img.hausdorff_distance)),
          time_to_complete: Math.min(...reversedData.map(img => img.time_to_complete)),
          tile_size: Math.max(...reversedData.map(img => img.tile_size)),
        };
        setBestMetrics(best);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [apiEndpoint]);

  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`${apiEndpoint}/images/${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete image');
        }

        setImages(images.filter(img => img.edge_detected_image_id !== imageId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

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
      <div className="flex flex-col justify-center items-center gap-8 w-full bg-white dark:bg-[#1B1A46] py-4 px-8 mb-8 rounded border border-gray-200 dark:border-[#4d447a] text-md 1380px:text-lg lg:flex-row">
        <div className="flex flex-col items-center">
          <p className="text-gray-900 dark:text-white font-bold mb-1">Edge Detected Images</p>
          <p className="text-gray-900 dark:text-white text-2xl font-bold border border-gray-200 dark:border-[#4d447a] px-2 py-1 rounded-md">
            {images.length}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="theme-text-primary font-bold mb-1">Average Processing Time</p>
          <p className="theme-text-primary text-lg 1380px:text-2xl font-bold border theme-border px-2 py-1 rounded-md">{(averageTimeToComplete / 60_000).toFixed(2)} mins</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="theme-text-primary font-bold mb-1">Fastest Processing Time</p>
          <p className="theme-text-primary text-lg 1380px:text-2xl font-bold border theme-border px-2 py-1 rounded-md">{(bestMetrics.time_to_complete / 60_000).toFixed(2)} mins</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="theme-text-primary font-bold mb-1">Average SSIM Score</p>
          <p className="theme-text-primary text-lg 1380px:text-2xl font-bold border theme-border px-2 py-1 rounded-md">{averageSSIM.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="theme-text-primary font-bold mb-1">Max Qubits Used</p>
          <p className="theme-text-primary text-lg 1380px:text-2xl font-bold border theme-border px-2 py-1 rounded-md">{Math.log2(bestMetrics.tile_size * bestMetrics.tile_size) + 1}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="theme-text-primary font-bold mb-1">Average F1 Score</p>
          <p className="theme-text-primary text-lg 1380px:text-2xl font-bold border theme-border px-2 py-1 rounded-md">{averageF1Score.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        {images.map((image, idx) => (
          <ImageComponent
            key={image.edge_detected_image_id}
            title={`Entry ${idx + 1}`}
            processedImage={`data:image/jpeg;base64,${image.ground_truth_image_base64}`}
            enableSelect={false}
            downloadImage={`data:image/jpeg;base64,${image.edge_detected_image_base64}`}
            children={
              <>
                <div className="flex flex-row gap-2 mt-4 mb-8">
                  <div className="hidden xl:flex flex-col gap-2 theme-bg-container py-4 px-8 rounded border theme-border theme-text-primary text-md items-center font-bold">
                    <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Input Parameters:</label>
                    <p className="italic">Pixels per tile:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.tile_size * image.tile_size}</p>
                    <p className="italic">Iterations:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.iterations}</p>
                    <p className="italic">Time to Complete:</p>
                    <div className="flex items-center">
                      <p className="border-white border-2 px-2 py-1 rounded-md">{(image.time_to_complete / 60_000).toFixed(2)} mins</p>
                      {images.length > 1 && image.time_to_complete === bestMetrics.time_to_complete && (
                        <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                      )}
                    </div>
                    <p className="italic">Threshold:</p>
                    <p className="border-white border-2 px-2 py-1 rounded-md">{image.threshold}x</p>
                    <p className="italic">Margins Replaced:</p>
                    <div className="flex items-center">
                      <p className="border-white border-2 px-2 py-1 rounded-md">
                        {image.margins_replaced ? (
                          <FaCheck className="text-green-500" size={20} />
                        ) : (
                          <FaTimes className="text-red-500" size={20} />
                        )}
                      </p>
                    </div>
                    <p className="italic">Edges Highlighted:</p>
                    <div className="flex items-center">
                      <p className="border-white border-2 px-2 py-1 rounded-md">
                        {image.edges_highlighted ? (
                          <FaCheck className="text-green-500" size={20} />
                        ) : (
                          <FaTimes className="text-red-500" size={20} />
                        )}
                      </p>
                    </div>
                    <p className="italic">Gaussian Blur:</p>
                    <div className="flex items-center">
                      <p className="border-white border-2 px-2 py-1 rounded-md">
                        {image.gaussian_pre_processed ? (
                          <FaCheck className="text-green-500" size={20} />
                        ) : (
                          <FaTimes className="text-red-500" size={20} />
                        )}
                      </p>
                    </div>
                    {image.edges_highlighted && (
                      <>
                        <p className="italic">Kernel Size:</p>
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.kernel_size}</p>
                        <p className="italic">Sigma:</p>
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.sigma}</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 theme-bg-container py-4 px-8 rounded border theme-border w-full">
                    <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Quantum Edge Detected Result:</label>
                    <div className="flex flex-row items-center justify-center bg-[#39385E]">
                      <img
                        className="border-white border-2"
                        src={`data:image/jpeg;base64,${image.edge_detected_image_base64}`} alt="Edge Detection" />
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col gap-2 theme-bg-container py-4 px-8 rounded border theme-border theme-text-primary text-md items-center font-bold">
                    <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Result Metrics:</label>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">F1 Score:</p>
                        <Tooltip
                          toolTipId={`f1-${image.edge_detected_image_id}`}
                          toolTipText="F1 Score combines precision and recall into a single metric, providing a balance between them. Higher values indicate better performance."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.f1.toFixed(6)} </p>
                        {images.length > 1 && image.f1 === bestMetrics.f1 && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">IOU:</p>
                        <Tooltip
                          toolTipId={`iou-${image.edge_detected_image_id}`}
                          toolTipText="Intersection over Union (IoU) measures the overlap between predicted and ground truth regions. Higher values indicate better segmentation accuracy."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.iou.toFixed(6)} </p>
                        {images.length > 1 && image.iou === bestMetrics.iou && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">Precision:</p>
                        <Tooltip
                          toolTipId={`precision-${image.edge_detected_image_id}`}
                          toolTipText="Precision measures the accuracy of positive predictions. Higher values indicate fewer false positives."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.precision.toFixed(6)} </p>
                        {images.length > 1 && image.precision === bestMetrics.precision && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">Recall:</p>
                        <Tooltip
                          toolTipId={`recall-${image.edge_detected_image_id}`}
                          toolTipText="Recall measures the ability to find all relevant instances. Higher values indicate fewer false negatives."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.recall.toFixed(6)} </p>
                        {images.length > 1 && image.recall === bestMetrics.recall && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">SSIM:</p>
                        <Tooltip
                          toolTipId={`ssim-${image.edge_detected_image_id}`}
                          toolTipText="Structural Similarity Index (SSIM) measures the similarity between two images. Values range from -1 to 1, where 1 indicates perfect similarity."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.ssim.toFixed(6)} </p>
                        {images.length > 1 && image.ssim === bestMetrics.ssim && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center">
                        <p className="italic">Hausdorff Distance:</p>
                        <Tooltip
                          toolTipId={`hausdorff-${image.edge_detected_image_id}`}
                          toolTipText="Hausdorff Distance measures the maximum distance between two sets of points. Lower values indicate better edge detection accuracy."
                        />

                      </div>
                      <div className="flex items-center">
                        <p className="border-white border-2 px-2 py-1 rounded-md">{image.hausdorff_distance.toFixed(6)} </p>
                        {images.length > 1 && image.hausdorff_distance === bestMetrics.hausdorff_distance && (
                          <span className="text-yellow-400 ml-2"><FaStar size={18} /></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate(`/insights/${image.edge_detected_image_id}`)} 
                      className="theme-button text-lg font-semibold px-4 py-2 rounded"
                    >
                      <TbListDetails size={16} />
                      Show more
                    </button>
                    <button 
                      onClick={() => handleDelete(image.edge_detected_image_id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-4 py-2 rounded flex items-center gap-2"
                    >
                      <FaTrash size={16} />
                      Delete
                    </button>
                  </div>
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