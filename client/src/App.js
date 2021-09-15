import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { Route, useLocation } from "react-router-dom";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];

  return (
    <div className="app">
      {currentLocation === "auth" ? "" : <Navbar />}
      <Route exact path="/" component={HomeScreen} />
      <Route path="/:id/hp" component={ProfileScreen} />
      <Route path="/auth" component={LoginScreen} />
    </div>
  );
}

export default App;
