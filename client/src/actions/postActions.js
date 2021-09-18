import axios from "axios";

export const createPost =
  ({ accessToken, formData }) =>
  async () => {
    await axios
      .post("/api/post", formData, {
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          "Content-Type": "multipart/form-data",
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

export const addCommentToPost =
  ({ post_id, content, accessToken }) =>
  async () => {
    await axios
      .post(
        `/api/post/${post_id}/comment`,
        { content },
        {
          headers: {
            Authorization: `Bearer: ${accessToken}`,
          },
        }
      )
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

export const setLikeToPost =
  ({ id, accessToken }) =>
  async () => {
    await axios
      .get(`/api/post/${id}/like-unlike`, {
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
