import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderBar from "../components/Dashboard/HeaderBar";
import SearchBar from "../components/Dashboard/SearchBar";
import BlogCard from "../components/Dashboard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogAction, getBlogByIdAction } from "../Redux/Blog/blog.action";
import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import {
  getUserFromToken,
  logoutUser,
} from "../Redux/Authentication/authentication.action";
import BlogUpdateModal from "../components/BlogEditor/BlogUpdateModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const {
    blogs = [],
    loading,
    blog,
    error,
  } = useSelector((state) => state.blog);
  const user = useSelector((state) => state.auth.user);

  const [searchId, setSearchId] = useState("");

  // ✅ Filter blogs dynamically based on search input
  const filteredBlogs = blogs;

  const handleSearch = async () => {
    if (searchId.trim()) {
      dispatch(getBlogByIdAction(searchId));
    }
  };

  // Show error toast when error changes
  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error]);

  // When search is cleared, fetch all blogs again
  useEffect(() => {
    if (searchId.trim() === "") {
      dispatch(getAllBlogAction());
    }
  }, [searchId, dispatch]);

  // const handleDelete = (id) => {
  //   // Ideally you should dispatch a delete action and then re-fetch
  //   toast.success("Blog deleted successfully!");
  // };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  // to get All the blogs
  useEffect(() => {
    dispatch(getAllBlogAction());
    dispatch(getUserFromToken());
  }, [dispatch, blog]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBar
        onNewBlog={() => navigate("/editor")}
        onLogout={handleLogout}
      />

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <WelcomeBanner user={user} />
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={handleEdit}
                // onDelete={handleDelete}
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
      {showModal && selectedBlog && (
        <BlogUpdateModal
          selectedBlog={selectedBlog}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
