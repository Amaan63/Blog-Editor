// components/TabNavigation.jsx
import { PenLine, Eye } from "lucide-react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === "edit"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("edit")}
      >
        <PenLine size={16} className="inline mr-1" />
        Edit
      </button>
      <button
        className={`px-4 py-2 ml-4 text-sm font-medium ${
          activeTab === "preview"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("preview")}
      >
        <Eye size={16} className="inline mr-1" />
        Preview
      </button>
    </div>
  );
};

export default TabNavigation;
