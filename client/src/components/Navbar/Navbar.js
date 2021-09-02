import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../actions/userActions";
import CreatePost from "../CreatePost/CreatePost";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [createPostState, setCreatePostState] = useState(false);
  const { uploadedPost } = useSelector((state) => state.uploadedPost);
  const { user } = useSelector((state) => state.user);
  const logout = () => {
    dispatch(userLogout());
    history.push("/");
  };

  useEffect(() => {
    if (uploadedPost) {
      setCreatePostState(false);
    }
  }, [uploadedPost]);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left-side">
          <h1 style={{ cursor: "pointer" }} onClick={() => history.push("/hp")}>
            fake<span style={{ color: "orange" }}>gram</span>
          </h1>
        </div>
        <div className="navbar-right-side">
          <PhotoCameraIcon onClick={() => setCreatePostState(true)} />
          <Avatar
            src={user.imageUrl}
            style={{ width: "20px", height: "20px" }}
            onClick={() => history.push(`/${user._id}/hp`)}
          />
          <ExitToAppIcon onClick={() => logout()} />
        </div>
      </div>
      {createPostState ? <CreatePost setCreatePost={setCreatePostState} /> : ""}
    </div>
  );
}

export default Navbar;
