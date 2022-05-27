import React, { useState, useEffect, useContext } from "react";

import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";
import { CardContent, Typography } from "@mui/material";
import Compressor from "compressorjs";

export default function Profile() {
  const history = useHistory();
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(LoginContext);

  const { darkMode, darkModeToggle } = useContext(ThemeContext);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      darkMode && darkModeToggle();
      history.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("ThemeContext", darkMode, darkModeToggle);
  }, [darkMode, darkModeToggle]);

  const [compressedFile, setCompressedFile] = useState(null);

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    console.log("compressedResult og", image);
    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        console.log("compressedResult", compressedResult);
        setCompressedFile(compressedResult);
      },
    });
  };

  return (
    <div>
      {isAuthenticated && (
        <>
          <Header
            setUser={setUser}
            setIsAuthenticated={setIsAuthenticated}
            darkMode={darkMode}
            darkModeToggle={darkModeToggle}
          />
          <CardContent style={{ alignItems: "center" }}>
            <Typography
              sx={{ fontSize: 14 }}
              color={darkMode ? "white" : "text.secondary"}
              gutterBottom
            >
              User Details
            </Typography>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color={darkMode ? "white" : "text.secondary"}
            >
              {user.email}
            </Typography>

            <input
              accept="image/*,capture=camera"
              capture="”camera"
              type="file"
              onChange={(event) => handleCompressedUpload(event)}
            />
          </CardContent>
        </>
      )}
    </div>
  );
}
