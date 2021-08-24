import React, { useState } from "react";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { userLogout } from "../../actions/userActions";
import CreatePost from "../CreatePost/CreatePost";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

function Navbar() {
  const dispatch = useDispatch();
  const [createPostState, setCreatePostState] = useState(false);
  const logout = () => {
    dispatch(userLogout());
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h1 onClick={() => logout()}>Navbar</h1>
        <PhotoCameraIcon onClick={() => setCreatePostState(true)} />
      </div>
      {createPostState ? <CreatePost setCreatePost={setCreatePostState} /> : ""}
    </div>
  );
}

export default Navbar;
