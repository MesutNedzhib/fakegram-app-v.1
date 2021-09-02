import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getRandomSuggUsers,
  getUserById,
  setFollow,
} from "../../actions/userActions";
import { getPosts } from "../../actions/postActions";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import { io } from "socket.io-client";
import { GET_RANDOM_USERS_SUCCESS } from "../../constants/userConstants";
import { GET_POSTS_SUCCESS } from "../../constants/postConstants";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const socket = useRef();

  const { user } = useSelector((state) => state.user);
  const { suggUsers } = useSelector((state) => state.suggUsers);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    if (!posts) {
      dispatch(getPosts());
    }
  }, [user, history, dispatch, posts]);

  useEffect(() => {
    dispatch(getRandomSuggUsers(user?._id));
    dispatch(getUserById(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addPosts", posts);
    socket.current.on("newPosts", (newPosts) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: newPosts,
      });
    });
  }, [posts, dispatch]);

  useEffect(() => {
    socket.current.emit("addSuggUsers", suggUsers);
    socket.current.on("newSuggUsers", (newSuggUsers) => {
      dispatch({
        type: GET_RANDOM_USERS_SUCCESS,
        payload: newSuggUsers,
      });
    });
  }, [suggUsers, dispatch]);

  useEffect(() => {
    socket.current.on("updatedUser", (updatedUser) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    });
  }, []);

  const setFollowHandle = (item) => {
    dispatch(
      setFollow({
        _userId: item._id,
        _currentUserId: user._id,
      })
    );
  };

  return (
    <div className="homeScreen">
      <div className="homeScreen-container">
        <div className="posts-side">
          {posts?.map((item, index) => (
            <Post key={index} postData={item} />
          ))}
        </div>
        <div className="suggestions-side">
          {!suggUsers ? <LoadingBox /> : ""}
          {suggUsers?.length === 0 ? (
            <MessageBox message={"Not Posts Yet"} />
          ) : (
            suggUsers?.map((item, index) => (
              <div key={index} className="sugg-user">
                <div
                  style={{ cursor: "pointer" }}
                  className="sugg-user-info"
                  onClick={() => history.push(`/${item._id}/hp`)}
                >
                  <Avatar src={item.imageUrl} />
                  <h4>{item.name}</h4>
                </div>
                {item?.followers.includes(user._id) ? (
                  <div className="sugg-user-follow-btn">
                    <Button
                      onClick={() =>
                        dispatch(
                          setFollow({
                            _userId: item._id,
                            _currentUserId: user._id,
                          })
                        )
                      }
                    >
                      Unfollow
                    </Button>
                  </div>
                ) : (
                  <div className="sugg-user-follow-btn">
                    <Button onClick={() => setFollowHandle(item)}>
                      Follow
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
