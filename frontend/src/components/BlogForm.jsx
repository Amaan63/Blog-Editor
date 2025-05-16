// components/BlogForm.jsx
import { ErrorMessage, Field, Form } from "formik";
import { Save, Send } from "lucide-react";

const BlogForm = ({
  activeTab,
  values,
  isSubmitting,
  setFieldValue,
  setCurrentPage,
}) => {
  return (
    <Form className="space-y-6">
      {activeTab === "edit" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              rows={12}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog content here..."
            />
            <ErrorMessage
              name="content"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
        </>
      ) : null}

      <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={values.published}
            onChange={() => setFieldValue("published", !values.published)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-700">
            {values.published ? "Published" : "Save as draft"}
          </label>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setCurrentPage("dashboard")}
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
      </div>
    </Form>
  );
};

export default BlogForm;
