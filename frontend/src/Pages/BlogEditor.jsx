// pages/BlogEditor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Custom components
import BlogHeader from "../components/BlogHeader";
import TabNavigation from "../components/TabNavigation";
import PreviewContent from "../components/PreviewContent";
import BlogForm from "../components/BlogForm";

const BlogEditor = ({ blogs, setBlogs, setCurrentPage }) => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const selectedBlog = (blogs || []).find((blog) => blog.id === blogId);

  const [activeTab, setActiveTab] = useState("edit");

  const initialValues = {
    title: selectedBlog?.title || "",
    content: selectedBlog?.content || "",
    published: selectedBlog?.published || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const blogData = {
      ...values,
      id: selectedBlog?.id || Date.now().toString(),
      createdAt: selectedBlog?.createdAt || new Date().toISOString(),
    };

    if (selectedBlog) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === blogData.id ? blogData : blog))
      );
    } else {
      setBlogs((prevBlogs) => [blogData, ...prevBlogs]);
    }

    setSubmitting(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (blogId && !selectedBlog) {
      navigate("/dashboard");
    }
  }, [blogId, selectedBlog, navigate]);

  return (
    <div>
      <BlogHeader selectedBlog={selectedBlog} />

      <main className=" px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
              <>
                {activeTab === "edit" ? (
                  <BlogForm
                    activeTab={activeTab}
                    values={values}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    setCurrentPage={setCurrentPage}
                  />
                ) : (
                  <PreviewContent
                    title={values.title}
                    content={values.content}
                  />
                )}
              </>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
