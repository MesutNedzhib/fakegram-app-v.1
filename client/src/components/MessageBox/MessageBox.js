import React from "react";
import "./MessageBox.scss";

function MessageBox({ message, variant }) {
  return (
    <div
      className={`messageBox alert-${variant === "error" ? "error " : "info"}`}
    >
      {message === undefined ? "undefined" : message}
    </div>
  );
}

export default MessageBox;
