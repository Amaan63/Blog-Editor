// pages/BlogEditor.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import BlogHeader from "../components/BlogEditor/BlogHeader";
import TabNavigation from "../components/BlogEditor/TabNavigation";
import BlogForm from "../components/BlogEditor/BlogForm";
import PreviewContent from "../components/BlogEditor/PreviewContent";
import { useState } from "react";

const initialValues = {
  title: "",
  content: "",
  tags: "",
  published: false,
};

const BlogEditor = () => {
  const [formValue, setFormValue] = useState(initialValues);
  return (
    <div>
      <BlogHeader />
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <TabNavigation />

          <Routes>
            <Route
              path=""
              element={
                <BlogForm formValue={formValue} setFormValue={setFormValue} />
              }
            />
            <Route
              path="preview"
              element={<PreviewContent formValue={formValue} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
