import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_LOGOUT,
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
