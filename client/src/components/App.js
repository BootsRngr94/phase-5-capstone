import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import Pool from "./Pool";
import SessionChecker from "./SessionChecker";
import Help from "./Help";
import Client from "./Client"
import PoolVisit from "./PoolVisit";
// import Navbar from "./NavBar";


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
        {/* <Redirect from="/" to="/signin" /> */}
        <Route 
        path="/check_session" component={SessionChecker} />
        <Route 
        path="/pool" component={Pool} 
        />
        <Route
        path="/help" component={Help} 
        />
        <Route
        path="/client" component={Client} 
        />
        <Route
        path="/poolvisit" component={PoolVisit} 
        />
      </Switch>
    </Router>
  );
};

export default App;