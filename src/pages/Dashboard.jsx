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

  return (
    <>
      <PageHeader label="Quantum Hadamard Edge Detection"/>
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
        <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-5xl">
          <div className="flex flex-row justify-center items-start">
            <label className="text-md font-bold text-white mb-2 p-2 block tracking-widest w-fit bg-[#34335A]">
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
              <label className="text-md font-bold text-white mb-2 flex flex-rows justify-start p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
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
              <label className="text-md font-bold text-white mb-2 flex flex-rows justify-start p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">
                Classic Edge Detected
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 xl:grid-rows-2 gap-4">
          <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl mx-auto">
            <QuantumEdgeGraph
              data={dataTimeComplexity}
              label="Quantum vs Classic"
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
          <div className="bg-[#1B1A46] p-4 rounded border border-[#4d447a] w-full max-w-4xl mx-auto">
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
      </div>
    </>
  );
}

export default Dashboard;
