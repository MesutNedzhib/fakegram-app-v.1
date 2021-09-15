import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Comment from "../Comment/Comment";

function Post({ postData }) {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState();

  const setCommentDataHandle = () => {
    if (commentValue.length !== 0) {
      dispatch(
        addCommentToPost({
          post_id: postData._id,
          content: commentValue,
          accessToken: user?.access_token,
        })
      );
      setCommentValue("");
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
          onClick={() => history.push(`/${postData._userId}/hp`)}
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
            {postData?.likes?.includes(user?._id) ? (
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
            <p>
              <h4>{postData.user_name}</h4> {postData.content}
            </p>
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
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
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
