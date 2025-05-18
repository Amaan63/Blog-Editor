import { Link, useLocation } from "react-router-dom";
import { PenLine, Eye } from "lucide-react";

const TabNavigation = () => {
  const location = useLocation();

  const isEdit =
    location.pathname === "/editor" ||
    location.pathname.startsWith("/editor/edit");

  const isPreview = location.pathname.startsWith("/editor/preview");

  return (
    <div className="flex border-b border-gray-200 mb-4">
      <Link
        to="/editor/edit"
        className={`px-4 py-2 text-sm font-medium ${
          isEdit
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <PenLine size={16} className="inline mr-1" />
        Edit
      </Link>
      <Link
        to="/editor/preview"
        className={`px-4 py-2 ml-4 text-sm font-medium ${
          isPreview
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Eye size={16} className="inline mr-1" />
        Preview
      </Link>
    </div>
  );
};

export default TabNavigation;
