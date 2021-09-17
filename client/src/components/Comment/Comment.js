import { Avatar } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import "./Comment.scss";
import * as timeago from "timeago.js";
import { useHistory } from "react-router-dom";

function Comment({ data }) {
  const history = useHistory();

  return (
    <div className="comment">
      <div className="comment-conrainer">
        <div className="comment-row" style={{ cursor: "pointer" }}>
          <Avatar
            src={data?.user_imageUrl}
            onClick={() => history.push(`/${data.user}/ps`)}
          />
          <span onClick={() => history.push(`/${data.user}/ps`)}>
            {data.user_name}
          </span>
          <p>{data.content}</p>
        </div>
        <div className="comment-timestamp">
          <small>{timeago.format(data?.createdAt)}</small>
        </div>
      </div>
    </div>
  );
}

export default Comment;
