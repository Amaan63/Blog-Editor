import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateBlogAction } from "../../Redux/Blog/blog.action";

const BlogUpdateModal = ({ selectedBlog, setShowModal }) => {
  const dispatch = useDispatch();
  const initialValues = {
    blogId: selectedBlog.id || "",
    title: selectedBlog.title || "",
    content: selectedBlog.content || "",
    tags: selectedBlog.tags || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tags: Yup.string().required("At least one tag is required"),
  });

  const handleSubmit = (values) => {
    // Ideally dispatch update action here
    dispatch(createOrUpdateBlogAction(values))
      .then((res) => {
        toast.success("Blog updated successfully!");
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update blog. Please try again.");
      });
  };

  return (
    <dialog id="edit_modal" className="modal modal-open">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg text-center mb-4">Edit Blog</h3>
        <p className="text-sm text-center mb-4">
          You are editing: <strong>{selectedBlog.title}</strong>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  className="input input-bordered w-full bg-transparent border border-black"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="tags"
                  placeholder="Tags"
                  className="input input-bordered w-full bg-transparent border border-black"
                  onChange={(e) => {
                    let val = e.target.value;

                    let tags = val.split(/\s+/);
                    tags = tags.map((tag) =>
                      tag && !tag.startsWith("#") ? "#" + tag : tag
                    );
                    const newVal = tags.join(" ");
                    setFieldValue("tags", newVal);
                  }}
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Content"
                  className="textarea textarea-bordered w-full bg-transparent border border-black"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="modal-action flex justify-end gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </dialog>
  );
};

export default BlogUpdateModal;
