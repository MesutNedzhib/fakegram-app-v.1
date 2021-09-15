import { Avatar } from "@material-ui/core";
import React from "react";
import "./Comment.scss";
import * as timeago from "timeago.js";

function Comment({ data }) {
  return (
    <div className="comment">
      <div className="comment-conrainer">
        <div className="comment-row" style={{ cursor: "pointer" }}>
          <Avatar src={data?.user_imageUrl} />
          <p>
            <h4>{data.user_name}</h4>
            {data.content}
          </p>
        </div>
        <div className="comment-timestamp">
          <small>{timeago.format(data?.createdAt)}</small>
        </div>
      </div>
    </div>
  );
}

export default Comment;
