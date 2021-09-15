import axios from "axios";
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
    try {
      const { data } = await axios.post("/api/post", formData, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (err) {
      return err.message;
    }
  };

export const getUserPosts = (accessToken) => async (dispatch) => {
  dispatch({
    type: GET_USER_POSTS_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/post/get-user-posts", {
      headers: {
        Authorization: `Bearer: ${accessToken}`,
      },
    });
    dispatch({
      type: GET_USER_POSTS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_POSTS_FAIL,
      payload: err.message,
    });
  }
};

export const addCommentToPost =
  ({ post_id, content, accessToken }) =>
  async (dispatch) => {
    dispatch({
      type: SET_COMMENT_REQUEST,
    });
    try {
      const { data } = await axios.post(
        `/api/post/${post_id}/comment`,
        { content },
        {
          headers: {
            Authorization: `Bearer: ${accessToken}`,
          },
        }
      );

      console.log(data);
    } catch (err) {
      dispatch({ type: SET_COMMENT_FAIL, payload: err.message });
    }
  };

export const setLikeToPost =
  ({ id, accessToken }) =>
  async (dispatch) => {
    dispatch({
      type: SET_LIKE_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/post/${id}/like-unlike`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      });
      console.log(data);
      // if (data) {
      //   dispatch({
      //     type: GET_CURRENT_POST_STATE,
      //   });
      // }
    } catch (err) {
      dispatch({ type: SET_LIKE_FAIL, payload: err.message });
    }
  };
