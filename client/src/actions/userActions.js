import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_LOGOUT,

} from "../constants/userConstants";
import axios from "axios";

export const login = (profileObj) => async (dispatch) => {
  const information = {
    name: profileObj.name,
    email: profileObj.email,
    imageUrl: profileObj.imageUrl,
  };
  dispatch({ type: LOGIN_REQUEST });

  await axios
    .post("/api/auth/login", information)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      console.log(error.response.statusText + " " + error.response.status);
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location = "/auth";
      }
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("user");
};

export const setFollow =
  ({ accessToken, id }) =>
  async () => {
    await axios
      .get(`/api/user/${id}/follow`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.statusText + " " + error.response.status);
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location = "/auth";
        }
      });
  };

export const setUnFollow =
  ({ accessToken, id }) =>
  async () => {
    await axios
      .get(`/api/user/${id}/unfollow`, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.statusText + " " + error.response.status);
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location = "/auth";
        }
      });
  };
