// components/PreviewContent.jsx
const PreviewContent = ({ title, content }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="mb-4 text-3xl font-bold">{title || "Untitled Blog"}</h1>
      <div className="mt-4 prose max-w-none">
        {content ? (
          content.split("\n").map((paragraph, index) =>
            paragraph ? (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ) : (
              <br key={index} />
            )
          )
        ) : (
          <p className="text-gray-400">No content yet...</p>
        )}
      </div>
    </div>
  );
};

export default PreviewContent;
