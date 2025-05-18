// pages/BlogEditor.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import BlogHeader from "../components/BlogEditor/BlogHeader";
import TabNavigation from "../components/BlogEditor/TabNavigation";
import BlogForm from "../components/BlogEditor/BlogForm";
import PreviewContent from "../components/BlogEditor/PreviewContent";


const BlogEditor = () => {
  return (
    <div>
      <BlogHeader />
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <TabNavigation />
          <Routes>
            {/* This route will match when you go to /editor */}
            <Route path="" element={<BlogForm />} />
            <Route path="edit" element={<BlogForm />} />
            <Route path="preview" element={<PreviewContent />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
