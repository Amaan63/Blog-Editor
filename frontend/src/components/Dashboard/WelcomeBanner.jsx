import React from "react";

const WelcomeBanner = ({ user }) => {
  return (
    <div className="text-2xl text-center p-3 m-3 font-semibold">
      Hello, {user?.username || "Loading"}
    </div>
  );
};

export default WelcomeBanner;
