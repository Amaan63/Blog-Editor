import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderBar from "../components/Dashboard/HeaderBar";
import SearchBar from "../components/Dashboard/SearchBar";
import BlogCard from "../components/Dashboard/BlogCard";

// Sample data
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "React is a JavaScript library for building user interfaces...",
    published: true,
    createdAt: "2025-05-15",
  },
  {
    id: "2",
    title: "The Power of Tailwind CSS",
    content: "Tailwind CSS is a utility-first CSS framework...",
    published: false,
    createdAt: "2025-05-14",
  },
  {
    id: "3",
    title: "Form Handling with Formik",
    content:
      "Formik is the worlds most popular open source form library for React...",
    published: true,
    createdAt: "2025-05-13",
  },
];

const Dashboard = ({ setCurrentPage, setSelectedBlog }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchId, setSearchId] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs);

  const handleSearch = () => {
    if (!searchId.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    const filtered = blogs.filter((blog) => blog.id === searchId);
    setFilteredBlogs(filtered);

    if (filtered.length === 0) {
      toast.error("No blog found with that ID");
    }
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
    toast.success("Blog deleted successfully!");
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    navigate("/editor");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBar
        onNewBlog={() => {
          setSelectedBlog(null);
          navigate("/editor");
        }}
        onLogout={() => navigate("/editor")}
      />

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <SearchBar
            value={searchId}
            onChange={setSearchId}
            onSearch={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-lg text-gray-600">No blogs found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
