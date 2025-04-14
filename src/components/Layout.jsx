import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="app-layout min-h-screen bg-[#010031]">
      <header>
        <Sidebar />
      </header>
      <main className="pt-4 ml-0 md:ml-64">
        <div className="m-10 pb-10">
          {" "}
          <Outlet />
        </div>
      </main>
      <footer>TODO</footer>
    </div>
  );
}

export default Layout;
