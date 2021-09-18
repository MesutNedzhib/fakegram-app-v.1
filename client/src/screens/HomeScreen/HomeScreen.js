import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import { io } from "socket.io-client";
import axios from "axios";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const socket = useRef();

  const { user } = useSelector((state) => state.user);

  const [posts, setPosts] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/auth");
    } else {
      async function fetchUserPosts() {
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

      async function fetchSuggestedUsers() {
        await axios
          .get("/api/user/random-suggested-users", {
            headers: {
              Authorization: `Bearer: ${user?.access_token}`,
            },
          })
          .then(function (res) {
            setSuggestedUsers(res.data.data);
          })
          .catch(function (error) {
            console.log(error.response.statusText);
            if (error.response.status === 401) {
              localStorage.removeItem("user");
              window.location = "/auth";
            }
          });
      }

      if (!posts) {
        fetchUserPosts();
      }
      if (!suggestedUsers) {
        fetchSuggestedUsers();
      }
    }
  }, [user, history, dispatch, posts, suggestedUsers]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addPosts", posts);

    socket.current.emit("addSuggestedUsers", suggestedUsers);

    socket.current.on("newPost", (newPost) => {
      setPosts(newPost);
    });
    socket.current.on("updatedPost", (updatedPost) => {
      setPosts(updatedPost);
    });
    socket.current.on("newComment", (newComment) => {
      setPosts(newComment);
    });
    socket.current.on("newSuggestedUsers", (suggestedUsers) => {
      setSuggestedUsers(suggestedUsers);
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
        <div className="suggestions-side">
          {!suggestedUsers ? <LoadingBox /> : ""}
          {suggestedUsers
            ? suggestedUsers?.map((item, index) => (
                <SuggestedUsers key={index} data={item} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
