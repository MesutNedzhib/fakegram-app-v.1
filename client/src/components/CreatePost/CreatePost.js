import React, { useEffect, useState } from "react";
import "./CreatePost.scss";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import { imageFileUpload } from "../../actions/userActions";
import { postUploadByUserId } from "../../actions/postActions";
import { Button } from "@material-ui/core";

function CreatePost({ setCreatePost }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const { postUploadLoading, uploadedPostError, uploadedPost } = useSelector(
  //   (state) => state.uploadedPost
  // );

  // useEffect(() => {
  //   if (uploadedPost) {
  //     setCreatePost(false);
  //   }
  // }, [uploadedPost]);

  const [imageSrc, setImageSrc] = useState();
  const [fileState, setFileState] = useState();
  const [description, setDescription] = useState();

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setFileState(e.target.files[0]);
  };

  const publishBtn = () => {
    const data = {};
    const formData = new FormData();
    formData.append("image", fileState);
    dispatch(imageFileUpload(formData));
    data._userId = user.user._id;
    data._userImageUrl = user.user.imageUrl;
    data._username = user.user.name;
    data.imageUrl = fileState.name;
    data.description = description;
    dispatch(postUploadByUserId(data));

    // setCreatePost(false);
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
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              rows="5"
              placeholder="Description ..."
            ></textarea>
          </div>
        </div>
        {imageSrc && description ? (
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
