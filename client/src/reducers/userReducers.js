import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  USER_LOGOUT,
  GET_CURRENT_POST_STATE,
} from "../constants/userConstants";

export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true };
    case CREATE_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case CREATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

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
