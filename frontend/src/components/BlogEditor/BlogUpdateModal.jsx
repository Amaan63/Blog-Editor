import { toast } from "react-toastify";

const initialValues ={
  id:"",
  title:"",
  content:"",
  tags:""
}
const BlogUpdateModal = ({ selectedBlog, setShowModal }) => {

  return (
    <dialog id="edit_modal" className="modal modal-open">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg flex justify-center">Edit Blog</h3>
        <p className="py-4">
          You are editing: <strong>{selectedBlog.title}</strong>
        </p>
        <input
          type="text"
          className="input input-bordered w-full mb-4 bg-transparent border border-black"
          defaultValue={selectedBlog.title}
        />
        <input
          type="text"
          className="input input-bordered w-full mb-4 bg-transparent border border-black"
          defaultValue={selectedBlog.tags}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-4 bg-transparent border border-black"
          defaultValue={selectedBlog.content}
        ></textarea>

        <div className="modal-action">
          <button className="btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              // Submit edited blog (you can dispatch an action here)
              toast.success("Blog updated (dummy)!");
              setShowModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BlogUpdateModal;
