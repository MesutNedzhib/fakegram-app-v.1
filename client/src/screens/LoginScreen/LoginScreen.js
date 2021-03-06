import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginScreen.scss";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const responseGoogle = (response) => {
    if (response.profileObj) {
      dispatch(login(response.profileObj));
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history, dispatch]);

  return (
    <div className="loginScreen">
      <div className="loginScreen-container">
        <h1>
          fake<span>gram</span>
        </h1>

        <GoogleLogin
          clientId="817135178922-98tq33dpatkunc9pk9ueedhrtfgc6dk4.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default LoginScreen;
