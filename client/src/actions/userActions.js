import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  IMAGE_FILE_UPLOAD_FAIL,
  IMAGE_FILE_UPLOAD_REQUEST,
  IMAGE_FILE_UPLOAD_SUCCESS,
  USER_LOGOUT,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_FAIL,
  SET_FOLLOW_REQUEST,
  GET_RANDOM_USERS_REQUEST,
  GET_RANDOM_USERS_FAIL,
  GET_RANDOM_USERS_SUCCESS,
  SET_FOLLOW_SUCCESS,
  SET_FOLLOW_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (profileObj) => async (dispatch) => {
  const information = {
    name: profileObj.name,
    email: profileObj.email,
    imageUrl: profileObj.imageUrl,
  };
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post("/api/auth/login", information);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserById = (_userId) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });
  try {
    const { data } = await axios.post("/api/user/get-user-by-id", {
      data: { _userId },
    });
    if (data) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.data });
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAIL,
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

export const getRandomSuggestedUsers = (accessToken) => async (dispatch) => {
  dispatch({
    type: GET_RANDOM_USERS_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/user/random-suggested-users", {
      headers: {
        Authorization: `Bearer: ${accessToken}`,
      },
    });

    dispatch({
      type: GET_RANDOM_USERS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: GET_RANDOM_USERS_FAIL, payload: err.message });
  }
};

export const setFollow =
  ({ accessToken, id }) =>
  async (dispatch) => {
    dispatch({
      type: SET_FOLLOW_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/user/${id}/follow`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      });
      console.log(data);
      // if (data) {
      //   dispatch({
      //     type: SET_FOLLOW_SUCCESS,
      //   });
      // }
    } catch (err) {
      dispatch({ type: SET_FOLLOW_FAIL, payload: err.message });
    }
  };

export const setUnFollow =
  ({ accessToken, id }) =>
  async (dispatch) => {
    dispatch({
      type: SET_FOLLOW_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/user/${id}/unfollow`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      });
      console.log(data);
      // if (data) {
      //   dispatch({
      //     type: SET_FOLLOW_SUCCESS,
      //   });
      // }
    } catch (err) {
      dispatch({ type: SET_FOLLOW_FAIL, payload: err.message });
    }
  };
