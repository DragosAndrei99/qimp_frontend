import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from "../components/common/PageHeader";
import { FaCheck, FaTimes } from "react-icons/fa";
import Tooltip from "../components/common/Tooltip";
import DetectionResults from "../components/image_details/DetectionResults";

function ImageDetail({ apiEndpoint }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch(`${apiEndpoint}/images/${id}`, {
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				});

				if (!response.ok) {
					throw new Error('Failed to fetch image details');
				}

				const data = await response.json();
				setImage(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImage();
	}, [apiEndpoint, id]);

	if (isLoading) {
		return (
			<>
				<PageHeader label="Image Details" />
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<PageHeader label="Image Details" />
				<div className="text-red-500 text-center p-4">{error}</div>
			</>
		);
	}

	if (!image) {
		return (
			<>
				<PageHeader label="Image Details" />
				<div className="text-red-500 text-center p-4">Image not found</div>
			</>
		);
	}

	return (
		<>
			<PageHeader label="Image Details" />
			<div className="flex flex-col gap-4 justify-center items-center w-full">
				<div className="flex flex-col gap-2 mt-4 mb-8 w-full">
					<div className="flex flex-col gap-8 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] text-white text-md items-center font-bold">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Input Parameters:</label>
						</div>
						<div className="flex flex-col items-center justify-center gap-4 1380px:flex-row">
						<div className="flex flex-col items-center gap-1">
								<p className="italic">Qubits required</p>
								<p className="border-white border-2 px-2 py-1 rounded-md">{Math.log2(image.tile_size * image.tile_size) + 1}</p>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Pixels per tile</p>
								<p className="border-white border-2 px-2 py-1 rounded-md">{image.tile_size * image.tile_size}</p>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Iterations</p>
								<p className="border-white border-2 px-2 py-1 rounded-md">{image.iterations}</p>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Time to Complete</p>
								<p className="border-white border-2 px-2 py-1 rounded-md">{(image.time_to_complete / 60_000).toFixed(2)} mins</p>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Threshold</p>
								<p className="border-white border-2 px-2 py-1 rounded-md">{image.threshold}x</p>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Margins Replaced</p>
								<div className="flex items-center">
									<p className="border-white border-2 px-2 py-1 rounded-md">
										{image.margins_replaced ? (
											<FaCheck className="text-green-500" size={20} />
										) : (
											<FaTimes className="text-red-500" size={20} />
										)}
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Edges Highlighted</p>
								<div className="flex items-center">
									<p className="border-white border-2 px-2 py-1 rounded-md">
										{image.edges_highlighted ? (
											<FaCheck className="text-green-500" size={20} />
										) : (
											<FaTimes className="text-red-500" size={20} />
										)}
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<p className="italic">Gaussian Blur</p>
								<div className="flex items-center">
									<p className="border-white border-2 px-2 py-1 rounded-md">
										{image.gaussian_pre_processed ? (
											<FaCheck className="text-green-500" size={20} />
										) : (
											<FaTimes className="text-red-500" size={20} />
										)}
									</p>
								</div>
							</div>
							{image.edges_highlighted && (
								<>
									<div className="flex flex-col items-center gap-1">
										<p className="italic">Kernel Size</p>
										<p className="border-white border-2 px-2 py-1 rounded-md">{image.kernel_size}</p>
									</div>
									<div className="flex flex-col items-center gap-1">
										<p className="italic">Sigma</p>
										<p className="border-white border-2 px-2 py-1 rounded-md">{image.sigma}</p>
									</div>
								</>
							)}
						</div>
					</div>


					<div className="flex flex-col items-center gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] w-full relative">
						<div className="absolute top-2 right-2 text-white">
							<Tooltip
								toolTipId="ground-truth-info"
								toolTipText="Ground truth is a Classic edge detected image using Canny algorithm with a kernel of 3 and sigma of 1"
							/>
						</div>
						<label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Result vs Ground Truth:</label>
						<div className="flex flex-col items-center justify-center bg-[#39385E] 1380px:flex-row">
							<img
								className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
								src={`data:image/jpeg;base64,${image.edge_detected_image_base64}`} alt="Edge Detection" />
							<img
								className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
								src={`data:image/jpeg;base64,${image.ground_truth_image_base64}`} alt="Ground truth" />
						</div>
					</div>

					<div className="flex flex-col items-center gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] w-full relative">
					<label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Original Image:</label>
					<img
								className="border-white border-2 w-[500px] 1520px:w-[45%] 2400px:w-[1000px]"
								src={`data:image/jpeg;base64,${image.original_image_base64}`} alt="Original" />
					</div>

					<div className="flex flex-col items-center gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] w-full relative">
						<div className="absolute top-2 right-2 text-white">
							<Tooltip
								toolTipId="vehicle-detection-info"
								toolTipText="Confidence level was set to 0.3 for both images"
							/>
						</div>
						<label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Vehicle detection:</label>
						<div className="flex flex-col items-center justify-center bg-[#39385E] 1380px:flex-row">
							<img
								className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
								src={`data:image/jpeg;base64,${image.edge_detected_object_detection.annotated_image_base64}`} alt="Edge Detection" />
							<img
								className="border-white border-2 w-[500px] 1520px:w-[50%] 2400px:w-[1000px]"
								src={`data:image/jpeg;base64,${image.ground_truth_object_detection.annotated_image_base64}`} alt="Ground truth" />
						</div>
						<div className="flex flex-col gap-2 w-full justify-around 1380px:flex-row">
							<DetectionResults detectionResults={image.edge_detected_object_detection.detection_results} title="Vehicle Detection Results on Quantum Edge Detected:" />
							<DetectionResults detectionResults={image.ground_truth_object_detection.detection_results} title="Vehicle Detection Results on Ground Truth:" />
						</div>

					</div>

					<div className="flex flex-col gap-2 bg-[#1B1A46] py-4 px-8 rounded border border-[#4d447a] text-white text-md items-center font-bold">
						<label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">Quantum Edge Detection Result Metrics:</label>
						<div className='flex flex-col items-center gap-4 1380px:flex-row'> 
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
							</div>
						</div>
						</div>
					</div>
				</div>
				<button
					onClick={() => navigate('/insights')}
					className="text-lg bg-[#34335A] font-semibold text-white px-4 py-2 rounded-md hover:bg-[#4d447a] active:bg-[#4d447a]"
				>
					Back to Insights
				</button>
			</div>
		</>
	);
}

export default ImageDetail; 