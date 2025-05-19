import { Link, useLocation } from "react-router-dom";
import { PenLine, Eye } from "lucide-react";

const TabNavigation = () => {
  const location = useLocation();

  const isEdit =
    location.pathname === "/editor" ||
    location.pathname.startsWith("/editor/edit");

  const isPreview = location.pathname.startsWith("/editor/preview");

  return (
    <div className="flex border-b border-gray-200 mb-4  justify-center text-xl m-3 font-semibold">
      <h1>Blog Form</h1>
    </div>
  );
};

export default TabNavigation;
