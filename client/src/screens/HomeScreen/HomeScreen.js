import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getUserPosts } from "../../actions/postActions";
import { GET_USER_POSTS_SUCCESS } from "../../constants/postConstants";
import { getRandomSuggestedUsers } from "../../actions/userActions";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import { GET_RANDOM_USERS_SUCCESS } from "../../constants/userConstants";
import { io } from "socket.io-client";
import axios from "axios";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const socket = useRef();

  const { user } = useSelector((state) => state.user);
  // let { suggUsers } = useSelector((state) => state.suggUsers);
  // const { posts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/auth");
    } else {
      // if (!suggUsers) {
      //   dispatch(getRandomSuggestedUsers(user?.access_token));
      // }

      async function fetchData() {
        await axios
          .get("/api/post/get-user-posts", {
            headers: {
              Authorization: `Bearer: ${user?.access_token}`,
            },
          })
          .then(function (res) {
            setPosts(res.data.data);
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              localStorage.removeItem("user");
              window.location = "/auth";
            }
          });
      }
      if (!posts) {
        fetchData();
      }
    }
  }, [user, history, dispatch, posts]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addPosts", posts);

    socket.current.on("newPost", (newPost) => {
      setPosts(newPost);
    });
    socket.current.on("updatedPost", (updatedPost) => {
      setPosts(updatedPost);
    });
    socket.current.on("newComment", (newComment) => {
      setPosts(newComment);
    });
  });

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
        {/* <div className="suggestions-side">
          {!suggUsers ? <LoadingBox /> : ""}
          {suggUsers
            ? suggUsers?.map((item, index) => (
                <SuggestedUsers key={index} data={item} />
              ))
            : ""}
        </div> */}
      </div>
    </div>
  );
}

export default HomeScreen;
