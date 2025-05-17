import { LogOut, Plus } from "lucide-react";

const HeaderBar = ({ onNewBlog, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            BlogCraft Dashboard
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={onNewBlog}
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              New Blog
            </button>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
