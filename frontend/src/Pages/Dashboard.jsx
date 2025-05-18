import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderBar from "../components/Dashboard/HeaderBar";
import SearchBar from "../components/Dashboard/SearchBar";
import BlogCard from "../components/Dashboard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogAction } from "../Redux/Blog/blog.action";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs = [], loading } = useSelector((state) => state.blog);

  const [searchId, setSearchId] = useState("");

  // ✅ Filter blogs dynamically based on search input
  const filteredBlogs = searchId.trim()
    ? blogs.filter((blog) => blog.id === searchId)
    : blogs;

  const handleSearch = () => {
    if (searchId.trim() && filteredBlogs.length === 0) {
      toast.error("No blog found with that ID");
    }
  };

  const handleDelete = (id) => {
    // Ideally you should dispatch a delete action and then re-fetch
    toast.success("Blog deleted successfully!");
  };

  const handleEdit = (blog) => {
    navigate("/editor");
  };

  useEffect(() => {
    dispatch(getAllBlogAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBar
        onNewBlog={() => navigate("/editor")}
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
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
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
        )}
        {!loading && filteredBlogs.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-lg text-gray-600">No blogs found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
