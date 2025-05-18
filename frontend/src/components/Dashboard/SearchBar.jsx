import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search blog by ID"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
