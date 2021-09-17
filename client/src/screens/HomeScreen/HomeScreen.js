import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getUserPosts } from "../../actions/postActions";
import { GET_USER_POSTS_SUCCESS } from "../../constants/postConstants";
import { getRandomSuggestedUsers } from "../../actions/userActions";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import { GET_RANDOM_USERS_SUCCESS } from "../../constants/userConstants";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  let { suggUsers } = useSelector((state) => state.suggUsers);
  let { posts } = useSelector((state) => state.posts);
  const [pss, setPss] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/auth");
    } else {
      if (!posts) {
        dispatch(getUserPosts(user?.access_token));
      }
      if (!suggUsers) {
        dispatch(getRandomSuggestedUsers(user?.access_token));
      }
    }
  }, [user, history, dispatch, posts, suggUsers]);

  return (
    <div className="homeScreen">
      <div className="homeScreen-container">
        <div className="posts-side">
          {!posts ? <LoadingBox /> : ""}
          {posts?.length === 0 ? (
            <MessageBox message={"Not Posts Yet"} />
          ) : (
            posts?.map((item, index) => <Post key={index} postData={item} />)
          )}
        </div>
        <div className="suggestions-side">
          {!suggUsers ? <LoadingBox /> : ""}
          {suggUsers
            ? suggUsers?.map((item, index) => (
                <SuggestedUsers key={index} data={item} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
