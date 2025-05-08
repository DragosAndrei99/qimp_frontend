import { NavLink } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import QuantumEdgeGraph from "../components/graphs/QuantumGraph";
import { Line } from "recharts";
function Dashboard() {
  const dataQubitsForPixels = [
    { name: "0Q", qubits: 0, pixels: 0 },
    { name: "7Q", qubits: 7, pixels: 64 },
    { name: "8Q", qubits: 8, pixels: 128 },
    { name: "9Q", qubits: 9, pixels: 256 },
    { name: "10Q", qubits: 10, pixels: 512 },
    { name: "11Q", qubits: 11, pixels: 1024 },
    { name: "12Q", qubits: 12, pixels: 2048 },
    { name: "13Q", qubits: 13, pixels: 4096 },
    { name: "14Q", qubits: 14, pixels: 8192 },
  ];

  const dataTimeComplexity = [
    { name: "0x0", quantum: 0, sobel: 0, canny: 0 },
    { name: "100x100", quantum: 10000, sobel: 10000, canny: 10000 },
    { name: "200x200", quantum: 10000, sobel: 40000, canny: 40000 },
    { name: "300x300", quantum: 10000, sobel: 90000, canny: 90000 },
    { name: "400x400", quantum: 10000, sobel: 160000, canny: 160000 },
    { name: "500x500", quantum: 10000, sobel: 250000, canny: 250000 },
  ];

  const dataShotsSSIM = [
    { name: "0", shots: 0, ssim: 0 },
    { name: "1", shots: 1, ssim: 0.00132 },
    { name: "10", shots: 10, ssim: 0.10141 },
    { name: "15", shots: 15, ssim: 0.20141 },
    { name: "101", shots: 101, ssim: 0.31345 },
    { name: "201", shots: 201, ssim: 0.42531 },
    { name: "601", shots: 601, ssim: 0.42904 },
    { name: "1001", shots: 1001, ssim: 0.43036 },
    { name: "2001", shots: 2001, ssim: 0.43093 },
    { name: "4001", shots: 4001, ssim: 0.42961 },
    { name: "8001", shots: 8001, ssim: 0.42929 },
    { name: "10001", shots: 10001, ssim: 0.43111 },
  ]

  const dataF1ScorePrecisionRecall = [
    {name: "0x0 Tiles", f1: 0, precision: 0, recall: 0},
    {name: "4x4 Tiles", f1: 0.06959, precision: 0.4821, recall: 0.03750},
    {name: "8x8 Tiles", f1: 0.09390, precision: 0.50674, recall: 0.05174},
    {name: "16x16 Tiles", f1: 0.07384, precision: 0.52524, recall: 0.03971},
    {name: "32x32 Tiles", f1: 0.04893, precision: 0.54185, recall: 0.02562}

  ]

  return (
    <>
      <PageHeader label="Quantum Hadamard Edge Detection" />
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
        <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl">
          <div className="flex flex-row justify-center items-start">
            <label className="text-md font-bold theme-text-primary mb-2 p-2 block tracking-widest w-fit theme-bg-secondary">
              Quantum Edge Detected Sample
            </label>
          </div>
          <div className="flex items-center justify-center bg-[#39385E] border mt-4">
            <img
              src="/images/qhed_sample.jpg"
              alt="Final Edge Detected"
              className="max-w-100"
            />
          </div>

          <div className="flex flex-col-reverse justify-between items-center mt-8 gap-4 1380px:flex-row">
            <img
              src="/images/og_sample.png"
              alt="Final Edge Detected"
              className="max-w-80 border border-black w-full h-auto"
            />
            <div className="flex-1 flex flex-row justify-center">
              <label className="text-md font-bold theme-text-primary mb-2 flex flex-rows justify-start p-2 block tracking-widest w-fit whitespace-nowrap theme-bg-secondary">
                Original Image
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between items-center mt-8 gap-4 1380px:flex-row">
            <img
              src="/images/canny_sample.jpg"
              alt="Final Edge Detected"
              className="max-w-80 border border w-full h-auto"
            />
            <div className="flex-1 flex flex-row justify-center">
              <label className="text-md font-bold theme-text-primary mb-2 flex flex-rows justify-start p-2 block tracking-widest w-fit whitespace-nowrap theme-bg-secondary">
                Classic Edge Detected
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 xl:grid-rows-2 gap-4">
          <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl mx-auto">
            <QuantumEdgeGraph
              data={dataTimeComplexity}
              label="Quantum vs Classic Time Complexity"
              legendLabel1="Time Complexity  (Y-Axis)"
              legendLabel2="Image Size (X-Axis)"
              xAxisDataKey="name"
              yAxisDataKey="canny"
              lines={[
                <Line
                  type="monotone"
                  dataKey="quantum"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Quantum Hadamard Edge Detection"
                />,
                <Line
                  type="monotone"
                  dataKey="sobel"
                  stroke="#10b981"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Sobel Edge Detection"
                />,

                <Line
                  type="monotone"
                  dataKey="canny"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Canny Edge Detection"
                />,
              ]}
            />
          </div>
          <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl mx-auto">
            <QuantumEdgeGraph
              data={dataQubitsForPixels}
              label="Qubits Needed to encode Pixels (QHED)"
              legendLabel1="Pixels (Y-Axis)"
              legendLabel2="Qubits (X-Axis)"
              xAxisDataKey="name"
              yAxisDataKey="pixels"
              lines={[
                <Line
                  type="monotone"
                  dataKey={"pixels"}
                  stroke="#60a5fa"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />,
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 theme-bg-container rounded w-full max-w-5xl mx-auto ">
          <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl mx-auto h-[420px] ">

            <QuantumEdgeGraph
              data={dataShotsSSIM}
              label="Structural Similarity Index measurement for different nums of shots"
              legendLabel1="Structural Similarity Index (Y-Axis)"
              legendLabel2="Shots (X-Axis)"
              xAxisDataKey="name"
              yAxisDataKey="ssim"
              lines={[
                <Line
                  type="monotone"
                  dataKey={"ssim"}
                  stroke="#60a5fa"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />,
              ]}
            />
          </div>

          <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl mx-auto ">
          <QuantumEdgeGraph
              data={dataF1ScorePrecisionRecall}
              label="Precision, Recall and F-1 Score for Quantum Edge Detected Images for different tile sizes"
              legendLabel1="0 - 0.6 (Y-Axis)"
              legendLabel2="No. of pixels per tile (X-Axis)"
              xAxisDataKey="name"
              yAxisDataKey="precision"
              lines={[
                <Line
                  type="monotone"
                  dataKey="precision"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Precision"
                />,
                <Line
                  type="monotone"
                  dataKey="recall"
                  stroke="#10b981"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Recall"
                />,

                <Line
                  type="monotone"
                  dataKey="f1"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="F1 Score"
                />,
              ]}
            />
          </div>
        </div>
        <div className="theme-bg-container p-4 rounded border theme-border w-full max-w-5xl">
          <div className="flex flex-row justify-center items-start">
            <label className="text-md font-bold theme-text-primary mb-2 p-2 block tracking-widest w-fit theme-bg-secondary">
              Vehicle Detection Sample
            </label>
          </div>
          <div className="flex items-center justify-center bg-[#39385E] border mt-4">
            <img
              src="/images/quantum_obj_detected.jpg"
              alt="Final Edge Detected"
              className="max-w-100"
            />
          </div>
          <div className="flex flex-col justify-between items-center mt-8 gap-4">
            <div className="flex-1 flex flex-row justify-center">
              <label className="text-md font-bold theme-text-primary mb-2 flex flex-rows justify-start p-2 block tracking-widest w-fit whitespace-nowrap theme-bg-secondary">
                Original Image
              </label>
            </div>
            <img
              src="/images/og_vehicle_detected.jpg"
              alt="Final Edge Detected"
              className="max-w-100 border border-black w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 md:left-[calc(50%+125px)]">
        <NavLink
          to="/quantum-edge-detection"
          className="bg-emerald-500 hover:bg-emerald-600
                text-xl text-white font-bold
                py-2 px-16
                rounded-lg 
                shadow-md hover:shadow-lg 
                transition-all duration-200 
                transform hover:scale-105 disabled:transform-none
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                active:scale-95 disabled:active:scale-100
                cursor-pointer disabled:cursor-not-allowed">Try it now</NavLink>
      </div>
    </>
  );
}

export default Dashboard;
