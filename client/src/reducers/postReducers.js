import {
  GET_CURRENT_POST_STATE,
  GET_USER_POSTS_FAIL,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "../constants/postConstants";

export const postsReducer = (state = { posts: null }, action) => {
  switch (action.type) {
    case GET_USER_POSTS_REQUEST:
      return { postsLoading: true };
    case GET_USER_POSTS_SUCCESS:
      return { postsLoading: false, posts: action.payload };
    case GET_USER_POSTS_FAIL:
      return { postsLoading: false, postsError: action.payload };
    case GET_CURRENT_POST_STATE:
      return { postsLoading: false, posts: state.posts };
    default:
      return state;
  }
};

export const uploadPostReducer = (state = { uploadedPost: null }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { postUploadLoading: true };
    case CREATE_POST_SUCCESS:
      return { postUploadLoading: false, uploadedPost: action.payload };
    case GET_USER_POSTS_FAIL:
      return { postUploadLoading: false, uploadedPostError: action.payload };
    default:
      return state;
  }
};
