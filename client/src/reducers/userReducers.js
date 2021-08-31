import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  USER_LOGOUT,
  GET_RANDOM_USERS_REQUEST,
  GET_RANDOM_USERS_SUCCESS,
  GET_RANDOM_USERS_FAIL,
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
