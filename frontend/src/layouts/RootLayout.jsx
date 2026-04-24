import { Outlet } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout() {
  return (
    <div className="h-screen flex bg-white text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50">
        <Sidebar />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 overflow-y-auto">
          <Outlet />
        </section>
      </main>

    </div>
  );
}