import {
  GET_CURRENT_POST_STATE,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_UPLOAD_BY_USER_ID_REQUEST,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
} from "../constants/postConstants";

export const postsReducer = (state = { posts: null }, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { postsLoading: true };
    case GET_POSTS_SUCCESS:
      return { postsLoading: false, posts: action.payload };
    case GET_POSTS_FAIL:
      return { postsLoading: false, postsError: action.payload };
    case GET_CURRENT_POST_STATE:
      return { postsLoading: false, posts: state.posts };
    default:
      return state;
  }
};

export const uploadPostReducer = (state = { uploadedPost: null }, action) => {
  switch (action.type) {
    case POST_UPLOAD_REQUEST:
      return { postUploadLoading: true };
    case POST_UPLOAD_SUCCESS:
      return { postUploadLoading: false, uploadedPost: action.payload };
    case GET_POSTS_FAIL:
      return { postUploadLoading: false, uploadedPostError: action.payload };
    default:
      return state;
  }
};
