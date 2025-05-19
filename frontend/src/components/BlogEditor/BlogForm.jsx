import React, { useState, useEffect, useRef } from "react";
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

// Validation rules for form fields
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tags: Yup.string().required("Tag is required"),
});

const BlogForm = ({ formValue, setFormValue }) => {
  const [submitted, setSubmitted] = useState(false);
  // to differentiate between draft and publish
  const [lastActionType, setLastActionType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state.blog);
  {
    /*  
  const typingTimeoutRef = useRef(null); // For 5s debounced save
  const autoSaveIntervalRef = useRef(null); // For 30s auto-save 
  */
  }

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let actionResult;

      if (values.published) {
        actionResult = dispatch(publishBlogAction(values));
        toast.success("Blog published successfully!");
      } else {
        actionResult = dispatch(createOrUpdateBlogAction(values));
        toast.success("Blog saved to draft successfully!");
      }

      navigate("/dashboard"); // Redirect after submit
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Blog submission error:", error);
    } finally {
      setSubmitting(false); // Stop submit loading
    }
  };

  // Handle success or error after dispatch
  useEffect(() => {
    if (submitted) {
      if (blogState?.blog && !blogState.error) {
        if (lastActionType === "publish") {
          toast.success("Blog published successfully!");
        } else {
          toast.success("Blog saved to draft successfully!");
        }
        navigate("/dashboard");
      } else if (blogState?.error) {
        toast.error("Something went wrong");
      }

      setSubmitted(false);
      setLastActionType("");
    }
  }, [blogState, submitted, lastActionType, navigate]);

  return (
    <Formik
      initialValues={formValue}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, setFieldValue }) => {
        {
          /*  
        // Debounce auto-save after 5 seconds of no typing
        useEffect(() => {
          setFormValue(values); // Keep form state in sync

          // Clear previous timer if still active
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

          // Check that required fields are not empty before auto-saving
          const shouldAutoSave =
            values.title.trim() !== "" &&
            values.content.trim() !== "" &&
            values.tags.trim() !== "";

          // Only auto-save if it's a draft and fields are filled
          // if (!values.published && shouldAutoSave) {
          //   typingTimeoutRef.current = setTimeout(() => {
          //     dispatch(createOrUpdateBlogAction(values));
          //     toast.info("Auto-saved after inactivity");
          //   }, 5000); // Save after 5s of no typing
          //}
        }, [values, dispatch, setFormValue]);*/
        }
        {
          /* 
        // // Set up auto-save every 30 seconds for drafts
        // useEffect(() => {
        //   const shouldAutoSave =
        //     values.title.trim() !== "" &&
        //     values.content.trim() !== "" &&
        //     values.tags.trim() !== "";

        //   // Start interval only for drafts with non-empty values
        //   if (!values.published && shouldAutoSave) {
        //     autoSaveIntervalRef.current = setInterval(() => {
        //       dispatch(createOrUpdateBlogAction(values));
        //       toast.info("Auto-saved every 30 seconds");
        //     }, 30000);
        //   }

        //   // Clear interval when unmounted or switching to publish mode
        //   return () => {
        //     if (autoSaveIntervalRef.current) {
        //       clearInterval(autoSaveIntervalRef.current);
        //     }
        //   };
        // }, [values.published, values, dispatch]);  */
        }

        return (
          <Form className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter blog title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              {/* <Field
                type="text"
                name="tags"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter blog tag"
              /> */}
              <Field
                name="tags"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                value={values.tags}
                onChange={(e) => {
                  let val = e.target.value;

                  let tags = val.split(/\s+/);
                  tags = tags.map((tag) =>
                    tag && !tag.startsWith("#") ? "#" + tag : tag
                  );
                  const newVal = tags.join(" ");
                  setFieldValue("tags", newVal);
                }}
                placeholder="Enter blog tags separated by space"
              />
              <ErrorMessage
                name="tags"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Content Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                rows={12}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Write your blog content here..."
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id="published"
                name="published"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="published" className="text-sm text-gray-700">
                {values.published ? "Publish on Submit" : "Save as Draft"}
              </label>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setFormValue(formValue)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md"
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
