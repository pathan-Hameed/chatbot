import { Outlet } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout() {
  return (
    <div className="h-screen flex">

      {/* Sidebar (takes real space) */}
      <div className="hidden md:flex w-64 bg-[#202123]">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
          <Outlet />

      </div>

    </div>
  );
}