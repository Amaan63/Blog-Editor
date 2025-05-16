import "./App.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import BlogEditor from "./Pages/BlogEditor";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="font-sans antialiased text-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route
              path="/*"
              element={<Auth setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  setCurrentPage={setCurrentPage}
                  setSelectedBlog={setSelectedBlog}
                />
              }
            />
            <Route
              path="/editor"
              element={
                <BlogEditor
                  selectedBlog={selectedBlog}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
