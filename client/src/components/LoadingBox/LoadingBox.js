import React from "react";
import "./LoadingBox.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoadingBox() {
  return (
    <div className="loadingBox">
      <CircularProgress size="10rem" thickness={2.5} />
    </div>
  );
}

export default LoadingBox;
