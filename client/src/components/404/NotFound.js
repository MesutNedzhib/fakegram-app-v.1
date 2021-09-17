import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound-container">
        <h1>Page</h1>
        <h1>not found!</h1>
        <h1>404</h1>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
