import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ProfileScreen.scss";
import axios from "axios";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useLocation } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";

function ProfileScreen() {
  const location = useLocation();
  const currentUrl = location.pathname.split("/")[1];
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/user/${currentUrl}`);
      setUserData(data);
    }

    fetchData();
  }, [currentUrl]);

  const data = userData?.data;

  return (
    <div className="profileScreen">
      {userData ? (
        <div className="profileScreen-continer">
          <div className="profileScreen-user-info">
            <div className="user-info-avatar">
              <Avatar
                src={data?.imageUrl}
                style={{ width: "125px", height: "125px" }}
              />
            </div>
            <div className="user-info-name">
              <h3>{data?.name}</h3>
            </div>
            <div className="user-info-status">
              <span>
                {data?.posts?.length} <small>POSTS</small>
              </span>
              <span>
                {data?.followers?.length} <small>FOLLOWERS</small>
              </span>
              <span>
                {data?.following?.length} <small>FOLLOWING</small>
              </span>
            </div>
          </div>
          {data?.posts?.length !== 0 ? (
            <div className="profileScreen-user-posts">
              {data?.posts?.map((item, index) => (
                <div key={index} className="profileScreen-user-post">
                  <img src={`../uploads/${item.imageUrl}`} alt="" />
                  <div className="profileScreen-user-post-hover">
                    <span>
                      <FavoriteIcon />
                      {item.likeCount}
                    </span>
                    <span>
                      <ChatBubbleOutlineIcon /> {item.commentCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MessageBox message={"No Posts Yet"} variant={"error"} />
          )}
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
}

export default ProfileScreen;
