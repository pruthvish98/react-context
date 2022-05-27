import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import credentials from "../../config/credentials";
import { LoginContext } from "../../contexts/LoginContext";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useHistory, Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMsg, setErrMsg] = useState(false);

  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(LoginContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let checkUser = credentials.find((val) => {
      if (val.email === data.email && val.password === data.password) {
        setErrMsg(false);
        return val;
      } else {
        setErrMsg("Please enter correct email and password!");
        setIsAuthenticated(false);
        setUser(false);
        return null;
      }
    });

    if (checkUser) {
      setUser(checkUser);
      setIsAuthenticated(true);
      history.push("/profile");
    }
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    console.log(
      "Login context",
      user,
      isAuthenticated,
      setUser,
      setIsAuthenticated
    );
  }, [user, isAuthenticated, setUser, setIsAuthenticated]);

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {errorMsg && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{errorMsg}</Alert>
            </Stack>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/about">about page</Link>
        </Box>
      </Box>
    </Container>
  );
}
