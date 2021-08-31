import axios from "axios";
import {
  GET_CURRENT_POST_STATE,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  SET_COMMENT_FAIL,
  SET_COMMENT_REQUEST,
  SET_LIKE_FAIL,
  SET_LIKE_REQUEST,
} from "../constants/postConstants";

export const postUploadByUserId = (postData) => async (dispatch) => {
  dispatch({
    type: POST_UPLOAD_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/post/upload-post", {
      data: postData,
    });

    dispatch({
      type: POST_UPLOAD_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_UPLOAD_FAIL,
      payload: err.message,
    });
  }
};

export const getPosts = () => async (dispatch, getState) => {
  const following = getState().user?.user?.following;
  following?.push(getState().user?.user?._id);

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
  // let posts = getState().posts.posts;
  // // console.log(posts);
  // const findPost = posts.findIndex((x) => x._id === commentProps._postId);
  // // posts[findPost] = posts[findPost].comments.push({ TEST: "dsa" });
  // const commentsR = posts[findPost]?.comments;
  // commentsR.push(commentProps);
  // posts[findPost].comments = commentsR;
  // // console.log(posts);

  dispatch({
    type: SET_COMMENT_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/post/set-comment", {
      data: commentProps,
    });
    // dispatch({
    //   type: GET_POSTS_SUCCESS,
    //   payload: data.data,
    // });
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
      type: GET_CURRENT_POST_STATE,
    });
  } catch (err) {
    dispatch({ type: SET_LIKE_FAIL, payload: err.message });
  }
};
