import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_RANDOM_USERS_REQUEST,
  GET_RANDOM_USERS_SUCCESS,
  GET_RANDOM_USERS_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const suggUsersReducer = (state = { suggUsers: null }, action) => {
  switch (action.type) {
    case GET_RANDOM_USERS_REQUEST:
      return { suggUsersLoading: true };
    case GET_RANDOM_USERS_SUCCESS:
      return { suggUsersLoading: false, suggUsers: action.payload };
    case GET_RANDOM_USERS_FAIL:
      return { suggUsersLoading: false, suggUsersError: action.payload };
    default:
      return state;
  }
};
