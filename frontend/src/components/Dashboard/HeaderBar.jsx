import { LogOut, Plus } from "lucide-react";

const HeaderBar = ({ onNewBlog, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center md:text-left">
            BlogCraft Dashboard
          </h1>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center md:justify-end">
            <button
              onClick={onNewBlog}
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              New Blog
            </button>
            <button
              onClick={onLogout}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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
