import Navbar from "./components/Navbar/Navbar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import NotFound from "./components/404/NotFound";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/auth">
            <LoginScreen />
          </Route>
          <Route exact path="/">
            <Navbar />
            <HomeScreen />
          </Route>
          <Route path="/:id/ps">
            <Navbar />
            <ProfileScreen />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
