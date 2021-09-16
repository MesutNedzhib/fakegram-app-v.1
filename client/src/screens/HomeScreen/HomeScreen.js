import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getUserPosts } from "../../actions/postActions";
import { io } from "socket.io-client";
import { GET_USER_POSTS_SUCCESS } from "../../constants/postConstants";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const socket = useRef();

  const { user } = useSelector((state) => state.user);
  const { suggUsers } = useSelector((state) => state.suggUsers);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!user) {
      history.push("/auth");
    } else {
      dispatch(getUserPosts(user?.access_token));
    }
  }, [user, history, dispatch]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addPosts", posts);
    socket.current.on("newPosts", (newPosts) => {
      dispatch({
        type: GET_USER_POSTS_SUCCESS,
        payload: newPosts,
      });
    });
  }, [posts, dispatch]);

  return (
    <div className="homeScreen">
      <div className="homeScreen-container">
        <div className="posts-side">
          {!posts ? <LoadingBox /> : ""}
          {posts?.length === 0 ? (
            <MessageBox message={"Not Posts Yet"} />
          ) : (
            posts?.map((item, index) => <Post key={index} postData={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
