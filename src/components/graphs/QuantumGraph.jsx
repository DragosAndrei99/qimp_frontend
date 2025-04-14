import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



function QuantumEdgeGraph({
  data,
  label,
  legendLabel1,
  legendLabel2,
  xAxisDataKey,
  yAxisDataKey,
  lines
}) {

  return (
    <div className="">
      <h2 className="text-white text-xl mb-4">{label}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey={xAxisDataKey} stroke="#ccc" />
          <YAxis dataKey={yAxisDataKey} stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
          <Legend 
            wrapperStyle={{ color: '#fff' }}
            content={({ payload }) => (
              <div style={{ color: '#fff' }}>
                <span>{legendLabel1}</span> | <span>{legendLabel2}</span>
              </div>
            )}
            
          />  {lines.map((line) => line)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuantumEdgeGraph;
