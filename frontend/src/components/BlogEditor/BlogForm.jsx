import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Save, Send } from "lucide-react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateBlogAction,
  publishBlogAction,
} from "../../Redux/Blog/blog.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tags: Yup.string().required("Tag is required"),
});

const BlogForm = ({ formValue, setFormValue }) => {
  const [submitted, setSubmitted] = useState(false);
  const [lastActionType, setLastActionType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state.blog); // adjust as per your reducer

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let actionResult;

      if (values.published) {
        actionResult = await dispatch(publishBlogAction(values));
        toast.success("Blog published successfully!");
      } else {
        actionResult = await dispatch(createOrUpdateBlogAction(values));
        toast.success("Blog saved to draft successfully!");
      }

      // Navigate only after successful action
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Blog submission error:", error);
    } finally {
      setSubmitting(false); // stop loading spinner
    }
  };

  useEffect(() => {
    if (submitted) {
      if (blogState?.blog && !blogState.error) {
        if (lastActionType === "publish") {
          toast.success("Blog published successfully!");
        } else if (lastActionType === "draft") {
          toast.success("Blog saved to draft successfully!");
        } else {
          toast.success("Blog submitted successfully!");
        }
        navigate("/dashboard");
      } else if (blogState?.error) {
        toast.error("Something went wrong");
      }
      setSubmitted(false);
      setLastActionType("");
    }
  }, [blogState, submitted, lastActionType, navigate, setFormValue]);

  return (
    <Formik
      initialValues={formValue}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      // sync formValue changes to Formik if user edits form externally:
      // Also add Formik’s onChange handler to update formValue state on field changes:
    >
      {({ values, isSubmitting }) => {
        // Sync Formik internal state with parent state
        useEffect(() => {
          setFormValue(values);
        }, [values, setFormValue]);

        return (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <Field
                type="text"
                name="tags"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog tag"
              />
              <ErrorMessage
                name="tags"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                rows={12}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here..."
              />
              <ErrorMessage
                name="content"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id="published"
                name="published"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="published" className="text-sm text-gray-700">
                {values.published ? "Publish on Submit" : "Save as Draft"}
              </label>
            </div>

            <div className="flex space-x-3 pt-4 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setFormValue(initialValues)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {values.published ? (
                  <>
                    <Send size={16} className="mr-2" />
                    {isSubmitting ? "Publishing..." : "Publish"}
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    {isSubmitting ? "Saving..." : "Save Draft"}
                  </>
                )}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BlogForm;
