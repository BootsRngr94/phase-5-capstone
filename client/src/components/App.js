import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import Navbar from "./NavBar";


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/signin"
          render={(props) => (
            <SignIn {...props} isLoggedIn={isLoggedIn} onLogin={handleLogin} />
          )}
        />
        <Route
          path="/dashboard"
          render={(props) => (
            <Dashboard {...props} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          )}
        />
        <Redirect from="/" to="/signin" />
      </Switch>
    </Router>
  );
};

export default App;