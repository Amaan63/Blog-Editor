import React from "react";

const WelcomeBanner = ({ user }) => {
  return (
    <div className="text-2xl text-center p-3 m-3">
      Hello {user?.username || "Username Not Found"}
    </div>
  );
};

export default WelcomeBanner;
