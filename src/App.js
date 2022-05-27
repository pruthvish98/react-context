import React, { useState } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./container/Login";
import Profile from "./container/Profile";
import { LoginContext } from "./contexts/LoginContext";
import { ThemeContext } from "./contexts/ThemeContext";
import Container from "@mui/material/Container";

function App() {
  const [user, setUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const darkModeToggle = () =>
    darkMode ? setDarkMode(false) : setDarkMode(true);

  return (
    <Container
      className="App"
      style={{
        height: "100vh",
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}
      maxWidth="xl"
    >
      <LoginContext.Provider
        value={{
          user: user,
          isAuthenticated: isAuthenticated,
          setUser: setUser,
          setIsAuthenticated: setIsAuthenticated,
        }}
      >
        <ThemeContext.Provider
          value={{
            darkMode: darkMode,
            darkModeToggle: darkModeToggle,
          }}
        >
          <div>
            <Router>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
              </Switch>
            </Router>
          </div>
        </ThemeContext.Provider>
      </LoginContext.Provider>
    </Container>
  );
}

export default App;
