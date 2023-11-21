import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import React from 'react';
import SignIn from './SignIn';


const App = () => {
    return (
      <div>
        <h1>Welcome!</h1>
        <SignIn />
        {/* Other components or content */}
      </div>
    );
  };


export default App;