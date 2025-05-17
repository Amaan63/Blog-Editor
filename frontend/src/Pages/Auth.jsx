import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Auth = () => {
  const location = useLocation();

  // For Button Colo change
  const isLogin = location.pathname === "/";
  const isRegister = location.pathname === "/register";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">BlogCraft</h1>
          <p className="text-gray-600">
            Create, manage, and share your stories
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-lg ${
              isRegister
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
