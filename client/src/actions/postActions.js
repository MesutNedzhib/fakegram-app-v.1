import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {
  GET_CURRENT_POST_STATE,
  GET_USER_POSTS_FAIL,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  SET_COMMENT_FAIL,
  SET_COMMENT_REQUEST,
  SET_LIKE_FAIL,
  SET_LIKE_REQUEST,
} from "../constants/postConstants";

export const createPost =
  ({ accessToken, formData }) =>
  async () => {
    const { data } = await axios
      .post("/api/post", formData, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.statusText + " " + error.response.status);
      });
  };

export const getUserPosts = (accessToken) => async (dispatch) => {
  dispatch({
    type: GET_USER_POSTS_REQUEST,
  });
  // try {
  await axios
    .get("/api/post/get-user-posts", {
      headers: {
        Authorization: `Bearer: ${accessToken}`,
      },
    })
    .then(function (response) {
      dispatch({
        type: GET_USER_POSTS_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch(function (error) {
      if (error.response.status == 401) {
        localStorage.removeItem("user");
        window.location = "/auth";
      }
    });

  // } catch (err) {
  //   dispatch({
  //     type: GET_USER_POSTS_FAIL,
  //     payload: err.message,
  //   });
  // }
};

export const addCommentToPost =
  ({ post_id, content, accessToken }) =>
  async () => {
    await axios
      .post(
        `/api/post/${post_id}/comment`,
        { content },
        {
          headers: {
            Authorization: `Bearer: ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.statusText + " " + error.response.status);
      });
  };

export const setLikeToPost =
  ({ id, accessToken }) =>
  async () => {
    await axios
      .get(`/api/post/${id}/like-unlike`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.statusText + " " + error.response.status);
      });
  };
