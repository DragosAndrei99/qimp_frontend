import { useState } from 'react';
import { FiMenu, FiX, FiCpu  } from 'react-icons/fi';
import { BiAtom } from "react-icons/bi";

export default function Sidebar({ edgeDetectionType, setEdgeDetectionType }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed z-30 md:hidden top-4 left-4 p-2 rounded-md bg-[#151441] text-white"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-[#151441] text-white transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="py-4 px-2 mb-8 border-b border-[#010031] pt-10 md:pt-0">
            <h1 className="text-xl font-bold">Edge Detection</h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <SidebarItem
                icon={<BiAtom size={20} />}
                text="Quantum Edge Detection"
                active={edgeDetectionType === "Quantum"}
                handleClick={() => setEdgeDetectionType("Quantum")}
              />
              <SidebarItem
                icon={<FiCpu size={20} />}
                text="Classic Edge Detection"
                active={edgeDetectionType === "Classic"}
                handleClick={() => setEdgeDetectionType("Classic")}

              />
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-[#010031]">
            <p className="text-sm text-gray-400">© 2025 Quantum Edge Detection</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
        />
      )}
    </>
  );
}

function SidebarItem({ icon, text, active = false, handleClick}) {
  return (
    <li 
    onClick={handleClick}
    className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer
      hover:bg-[#010031] text-white ${
      active
        ? 'bg-[#010031] text-white'
        : 'text-gray-300 hover:bg-[#010031] hover:text-white'
    }`}>
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
    </li>
  );
}