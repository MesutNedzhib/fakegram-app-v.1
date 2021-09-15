import React, { useState } from "react";
import "./CreatePost.scss";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import { imageFileUpload } from "../../actions/userActions";
import { createPost } from "../../actions/postActions";
import { Button } from "@material-ui/core";
import axios from "axios";

function CreatePost({ setCreatePost }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [imageSrc, setImageSrc] = useState();
  const [fileState, setFileState] = useState();
  const [content, setContent] = useState(undefined);

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setFileState(e.target.files[0]);
  };

  const publishBtn = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_image", fileState);

    try {
      const { data } = await axios.post("/api/post", formData, {
        headers: {
          Authorization: `Bearer: ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        setCreatePost(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="createPost">
      <div className="createPost-container">
        <div className="createPost-header">
          <CloseIcon onClick={() => setCreatePost(false)} />
        </div>
        <div className="createPost-body">
          <div className="createPost-image">
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: "80%",
                height: "100%",
                background: "gold",
                margin: "auto",
              }}
            />
          </div>

          <div className="createPost-description">
            <h4>Description:</h4>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              name=""
              id=""
              rows="5"
              placeholder="Description ..."
            ></textarea>
          </div>
        </div>
        {imageSrc && content ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => publishBtn()}
          >
            Publish
          </Button>
        ) : (
          <Button color="primary" variant="contained" disabled>
            Publish
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
