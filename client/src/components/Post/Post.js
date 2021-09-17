import React, { useEffect, useRef, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCommentToPost, setLikeToPost } from "../../actions/postActions";
import * as timeago from "timeago.js";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Comment from "../Comment/Comment";

function Post({ postData }) {
  const { user } = useSelector((state) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const commentInput = useRef(null);

  const setCommentDataHandle = () => {
    if (commentInput.length !== 0) {
      dispatch(
        addCommentToPost({
          post_id: postData._id,
          content: commentInput.current.value,
          accessToken: user?.access_token,
        })
      );
      commentInput.current.value = "";
    }
  };

  const setLikeToPostHandle = () => {
    dispatch(
      setLikeToPost({
        id: postData._id,
        accessToken: user?.access_token,
      })
    );
  };

  return (
    <div className="post">
      <div className="post-container">
        <div
          className="post-header"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/${postData.user}/ps`)}
        >
          <Avatar src={postData?.user_imageUrl} />
          <h3>{postData.user_name}</h3>
        </div>
        <div className="post-body">
          <div
            className="post-image"
            onDoubleClick={() => setLikeToPostHandle()}
          >
            <img src={`../uploads/${postData.imageUrl}`} alt="" />
          </div>
          <div className="post-status">
            {postData?.likes?.includes(user?.data?._id) ? (
              <Badge
                badgeContent={postData?.likeCount}
                color="error"
                onClick={() => setLikeToPostHandle()}
              >
                <FavoriteIcon />
              </Badge>
            ) : (
              <Badge
                badgeContent={postData?.likeCount}
                color="error"
                onClick={() => setLikeToPostHandle()}
              >
                <FavoriteBorderIcon />
              </Badge>
            )}

            <Badge badgeContent={postData.commentCount} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </div>
          <div className="post-description">
            <span>{postData.user_name}</span>
            <p>{postData.content}</p>
          </div>

          <div className="post-comments">
            {postData?.comments?.map((item, index) => (
              <Comment key={index} data={item} />
            ))}
          </div>

          <div className="post-timestamp">
            <small>{timeago.format(postData.createdAt)}</small>
          </div>
          <div className="post-add-comment">
            <div className="post-add-comment-write">
              <Avatar src={user?.data?.imageUrl} />
              <input
                ref={commentInput}
                type="text"
                placeholder="Add a comment..."
              />
            </div>
            <div className="post-add-comment-submit">
              <Button onClick={() => setCommentDataHandle()}>PUBLISHING</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
