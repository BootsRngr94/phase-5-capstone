import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import Pool from "./Pool";
import SessionChecker from "./SessionChecker";
import Help from "./Help";
import Client from "./Client";
import PoolVisit from "./PoolVisit";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import "../stylesheets/dark.css";
import "../stylesheets/app.css";
import "../stylesheets/bubbles.css";
import "../stylesheets/index.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    const body = document.body;
    const wrapper = document.querySelector('.wrapper');
    body.classList.toggle("dark-mode", darkMode);
    if (wrapper) {
      wrapper.classList.toggle('dark-mode', darkMode);
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark app" : "app"} >
      <div className="mode_switch"></div>
      <div
        className="lightmode"
        onClick={() => dispatch({ type: "LIGHT" })}
        
      >
        <FontAwesomeIcon icon={faSun} />
      </div>
      <div
        className="darkmode"
        onClick={() => dispatch({ type: "DARK" })}
      >
        <FontAwesomeIcon icon={faMoon} />
      </div>
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
              <Dashboard
                {...props}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )}
          />
          <Route path="/check_session" component={SessionChecker} />
          <Route path="/pool" component={Pool} />
          <Route path="/help" component={Help} />
          <Route path="/client" component={Client} />
          <Route path="/poolvisit" component={PoolVisit} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
