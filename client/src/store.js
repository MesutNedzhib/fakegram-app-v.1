import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { suggUsersReducer, userReducer } from "./reducers/userReducers";
import { postsReducer, uploadPostReducer } from "./reducers/postReducers";
const initialState = {
  user: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const reducer = combineReducers({
  user: userReducer,
  suggUsers: suggUsersReducer,
  posts: postsReducer,
  uploadedPost: uploadPostReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
