import { useState } from "react";
import { FiMenu, FiX, FiCpu, FiHome } from "react-icons/fi";
import { FaCar, FaHistory, FaRegImages } from "react-icons/fa";
import { BiAtom } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
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
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="py-4 px-2 mb-8 border-b border-[#010031] pt-10 md:pt-0">
            <h1 className="text-xl font-bold text-center">Quantum Edge Detection</h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <SidebarItem
                icon={<FiHome size={20} />}
                text="Dashboard"
                path="/"
                handleLinkClick={handleLinkClick}
              />
              <SidebarItem
                icon={<BiAtom size={20} />}
                text="Quantum Edge Detection"
                path="/quantum-edge-detection"
                handleLinkClick={handleLinkClick}

              />
              <SidebarItem
                icon={<FiCpu size={20} />}
                text="Classic Edge Detection"
                path="/classic-edge-detection"
                handleLinkClick={handleLinkClick}

              />
              <SidebarItem
                icon={<FaCar size={20} />}
                text="Vehicle Detection"
                path="/vehicle-detection"
                handleLinkClick={handleLinkClick}

              />
              <SidebarItem
                icon={<FaRegImages size={20} />}
                text="Post Processing Algorithms"
                path="/post-processing"
                handleLinkClick={handleLinkClick}

              />
              <SidebarItem
                icon={<FaHistory size={20} />}
                text="History"
                path="/history"
                handleLinkClick={handleLinkClick}

              />
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-[#010031]">
            <p className="text-sm text-gray-400">
              © 2025 Quantum Edge Detection
            </p>
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

function SidebarItem({ icon, text, path, handleLinkClick }) {
  return (
    <li>
      <NavLink
        onClick={handleLinkClick}
        to={path}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-lg transition-colors ${
            isActive
              ? "bg-[#010031] text-white"
              : "text-gray-300 hover:bg-[#010031] hover:text-white"
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
      </NavLink>
    </li>
  );
}
