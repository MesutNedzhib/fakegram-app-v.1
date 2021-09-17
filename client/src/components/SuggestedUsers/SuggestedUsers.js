import { Avatar, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setFollow, setUnFollow } from "../../actions/userActions";
import "./SuggestedUsers.scss";

function SuggestedUsers({ data }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  return (
    <div className="suggestedestedUsers">
      <div className="suggested-user">
        <div
          style={{ cursor: "pointer" }}
          className="suggested-user-info"
          onClick={() => history.push(`/${data._id}/ps`)}
        >
          <Avatar src={data.imageUrl} />
          <h4>{data.name}</h4>
        </div>
        {data?.followers.includes(user?.data?._id) ? (
          <div className="suggested-user-follow-btn">
            <Button
              onClick={() =>
                dispatch(
                  setUnFollow({
                    accessToken: user?.access_token,
                    id: data._id,
                  })
                )
              }
            >
              Unfollow
            </Button>
          </div>
        ) : (
          <div className="suggested-user-follow-btn">
            <Button
              onClick={() =>
                dispatch(
                  setFollow({
                    accessToken: user?.access_token,
                    id: data._id,
                  })
                )
              }
            >
              Follow
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestedUsers;
