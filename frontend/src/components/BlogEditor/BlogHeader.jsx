// components/BlogHeader.jsx
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <List size={16} className="mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
