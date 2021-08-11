import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToDo from "./components/ToDo";
import Login from "./components/Login";
import Singup from "./components/Signup";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    // return unsub();
  }, []);
  return (
    <Router>
      <NavBar user={user} />
      <Switch>
        <Route exact path="/">
          <ToDo user={user} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Singup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
