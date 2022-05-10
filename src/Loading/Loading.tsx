import React from "react";
import "./LoadingStyle.css";

const Loading = () => {
  return (
    <div className="Loader-container" data-testid="loading-screen">
      <div id="loader"></div>
    </div>
  );
};

export default Loading;
