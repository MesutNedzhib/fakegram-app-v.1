import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ProfileScreen.scss";
import axios from "axios";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useLocation } from "react-router-dom";

function ProfileScreen() {
  const location = useLocation();
  const currentUrl = location.pathname.split("/")[1];

  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `/api/post/get-posts-by-user-id/${currentUrl}`
      );
      setPosts(data);
    }

    fetchData();
  }, [currentUrl]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post("/api/user/get-user-by-id", {
        data: { _userId: currentUrl },
      });
      setUser(data);
    }

    fetchData();
  }, [currentUrl]);

  return (
    <div className="profileScreen">
      <div className="profileScreen-continer">
        <div className="profileScreen-user-info">
          <div className="user-info-avatar">
            <Avatar
              src={user?.data?.imageUrl}
              style={{ width: "125px", height: "125px" }}
            />
          </div>
          <div className="user-info-name">
            <h3>{user?.data?.name}</h3>
          </div>
          <div className="user-info-status">
            <span>
              {posts?.data?.length} <small>POSTS</small>
            </span>
            <span>
              {user?.data?.followers?.length} <small>FOLLOWERS</small>
            </span>
            <span>
              {user?.data?.following?.length} <small>FOLLOWING</small>
            </span>
          </div>
        </div>
        <div className="profileScreen-user-posts">
          {posts?.data?.map((item, index) => (
            <div key={index} className="profileScreen-user-post">
              <img src={`../uploads/${item.imageUrl}`} alt="" />
              <div className="profileScreen-user-post-hover">
                <span>
                  <FavoriteIcon />
                  {item.likes.length}
                </span>
                <span>
                  <ChatBubbleOutlineIcon /> {item.comments.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
