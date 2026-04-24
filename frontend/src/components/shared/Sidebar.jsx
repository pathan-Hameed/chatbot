function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#202123] text-white flex flex-col">
      
      {/* Top Section */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full py-2 px-3 bg-gray-700 rounded hover:bg-gray-600">
          + New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-2">
          <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            Chat 1
          </li>
          <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
            Chat 2
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">User</p>
      </div>

    </aside>
  );
}

export default Sidebar;