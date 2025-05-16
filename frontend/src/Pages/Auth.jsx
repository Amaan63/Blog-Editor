import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = ({ setIsAuthenticated }) => {
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
          <Link to="/" className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
          >
            Register
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
