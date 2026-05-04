import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <button onClick={() => setOpen(true)}>
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">Chat</h1>
      </div>

      {/* 🔹 Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          h-screen w-64 bg-[#202123] text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="font-semibold">Chats</h2>

          {/* Close button (mobile) */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          <button className="w-full bg-gray-700 hover:bg-gray-600 p-2 rounded mb-4">
            + New Chat
          </button>

          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
              Chat 1
            </li>
            <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
              Chat 2
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          Abdul Hameed
        </div>
      </aside>
    </>
  );
}

export default Sidebar;