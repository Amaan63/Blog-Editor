import "./App.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import BlogEditor from "./Pages/BlogEditor";

const App = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-[#F9FAFB]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
      <Routes>
        <Route path="/*" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/*" element={<BlogEditor />} />
      </Routes>
    </div>
  );
};

export default App;
