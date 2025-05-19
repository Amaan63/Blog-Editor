import { Edit, Trash2 } from "lucide-react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              blog.status?.toLowerCase() === "published"
                ? "bg-green-100 text-green-800"
                : blog.status?.toLowerCase() === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {blog.status || "Unknown"}
          </span>
          <span className="text-xs text-gray-500">ID: {blog.id}</span>
        </div>

        <h3 className="mb-1 text-lg font-bold text-gray-900">{blog.title}</h3>

        {/* Author */}
        <p className="mb-1 text-sm text-gray-500">
          By: {blog.user?.username || "Unknown Author"}
        </p>

        {/* Tags Display */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.split(/\s+/).map((tag, index) =>
              tag ? (
                <span
                  key={index}
                  className="inline-block text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                >
                  {tag}
                </span>
              ) : null
            )}
          </div>
        )}

        {/* Content - dynamic height */}
        <p className="text-gray-600">{blog.content}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">{blog.createdAt}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(blog)}
              className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
