const PreviewContent = ({ formValue }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="mb-4 text-3xl font-bold">
        {formValue.title || "Untitled Blog"}
      </h1>
      <p className="mb-4 text-gray-600 italic">
        Tags: {formValue.tags || "No tags"}
      </p>
      <div className="mt-4 prose max-w-none whitespace-pre-line">
        {formValue.content ? (
          formValue.content
        ) : (
          <p className="text-gray-400">No content yet...</p>
        )}
      </div>
    </div>
  );
};

export default PreviewContent;
