import { useState } from 'react';

import ImageProcessing from "./ImageProcessing";
import Sidebar from "./Sidebar";

function Layout() {
  const [edgeDetectionType, setEdgeDetectionType] = useState('Quantum');

  return (
    <div className="min-h-screen bg-[#010031]">
      <Sidebar edgeDetectionType={edgeDetectionType} setEdgeDetectionType={setEdgeDetectionType} />
      <div className="pt-10 ml-0 md:ml-64">
        <ImageProcessing edgeDetectionType={edgeDetectionType}/>
      </div>
    </div>
  );
}


export default Layout;