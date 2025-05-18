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

const initialValues = {
  title: "",
  content: "",
  tags: "",
  published: false,
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tags: Yup.string().required("Tag is required"),
});

const BlogForm = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [lastActionType, setLastActionType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state.blog); // adjust this based on your reducer

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (values) => {
    console.log("values------", values);
    setSubmitted(true);

    if (values.published) {
      setLastActionType("publish");
      dispatch(publishBlogAction(values));
    } else {
      setLastActionType("draft");
      dispatch(createOrUpdateBlogAction(values));
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
        setFormValue(initialValues);
      } else if (blogState?.error) {
        toast.error("Something went wrong");
      }
      setSubmitted(false);
      setLastActionType("");
    }
  }, [blogState, submitted, lastActionType]);

  return (
    <Formik
      initialValues={formValue}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Field
            type="text"
            name="title"
            value={formValue.title}
            onChange={handleChange}
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
            value={formValue.tags}
            onChange={handleChange}
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
            value={formValue.content}
            onChange={handleChange}
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
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formValue.published}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            {formValue.published ? "Publish on Submit" : "Save as Draft"}
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
            disabled={submitted}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {formValue.published ? (
              <>
                <Send size={16} className="mr-2" />
                {submitted ? "Publishing..." : "Publish"}
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {submitted ? "Saving..." : "Save Draft"}
              </>
            )}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default BlogForm;
