import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  IMAGE_FILE_UPLOAD_FAIL,
  IMAGE_FILE_UPLOAD_REQUEST,
  IMAGE_FILE_UPLOAD_SUCCESS,
  POST_UPLOAD_BY_USER_ID_FAIL,
  POST_UPLOAD_BY_USER_ID_SUCCESS,
  POST_UPLOAD_BY_USER_ID_REQUEST,
  USER_LOGOUT,
  GET_POSTS_REQUEST,
  GET_POSTS_FAIL,
  GET_POSTS_SUCCESS,
  SET_COMMENT_REQUEST,
  SET_COMMENT_FAIL,
  SET_COMMENT_SUCCESS,
  SET_LIKE_FAIL,
  SET_LIKE_REQUEST,
} from "../constants/userConstants";
import axios from "axios";

export const createUser = (profileObj) => async (dispatch) => {
  const dataForSend = {
    name: profileObj.name,
    email: profileObj.email,
    imageUrl: profileObj.imageUrl,
  };
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const { data } = await axios.post("/api/user/create-user", { dataForSend });
    dispatch({ type: CREATE_USER_SUCCESS, payload: data.data });
    localStorage.setItem("user", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("user");
};

export const imageFileUpload = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  dispatch({
    type: IMAGE_FILE_UPLOAD_REQUEST,
  });
  try {
    const { data } = await axios.post(
      "/api/post/image-file-upload",
      formData,
      config
    );
    dispatch({
      type: IMAGE_FILE_UPLOAD_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_FILE_UPLOAD_FAIL,
      payload: err.message,
    });
  }
};

export const postUploadByUserId = (postData) => async (dispatch) => {
  dispatch({
    type: POST_UPLOAD_BY_USER_ID_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/post/upload-post", {
      data: postData,
    });
    console.log(data);
    dispatch({
      type: POST_UPLOAD_BY_USER_ID_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: POST_UPLOAD_BY_USER_ID_FAIL,
      payload: err.message,
    });
  }
};

export const getPosts = () => async (dispatch, getState) => {
  const _userId = getState().user.user._id;
  const following = ["61224da9b4ecfa346c005d74"];

  dispatch({
    type: GET_POSTS_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/post/get-posts", {
      data: { following },
    });

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload: err.message,
    });
  }
};

export const setComment = (commentProps) => async (dispatch, getState) => {
  let posts = getState().posts.posts;
  // console.log(posts);
  const findPost = posts.findIndex((x) => x._id === commentProps._postId);
  // posts[findPost] = posts[findPost].comments.push({ TEST: "dsa" });
  const commentsR = posts[findPost]?.comments;
  commentsR.push(commentProps);
  posts[findPost].comments = commentsR;
  // console.log(posts);

  dispatch({
    type: SET_COMMENT_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/user/set-comment", {
      data: commentProps,
    });
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: SET_COMMENT_FAIL, payload: err.message });
  }
};

export const setLikeToPost = (likeProps) => async (dispatch) => {
  dispatch({
    type: SET_LIKE_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/post/set-like", {
      data: likeProps,
    });

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: SET_LIKE_FAIL, payload: err.message });
  }
};
