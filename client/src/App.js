import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  return (
    <div className="app">
      {currentLocation !== "" ? <Navbar /> : ""}
      <Route path="/hp" component={HomeScreen} />
      <Route exact path="/" component={LoginScreen} />
    </div>
  );
}

export default App;
