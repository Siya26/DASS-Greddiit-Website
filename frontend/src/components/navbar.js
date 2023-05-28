import React from "react";
import logo from "../images/greddiit2.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { margin } from "@mui/system";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem("isLogin", "false");
    navigate("/");
  }

  function handleProfile() {
    localStorage.setItem("isLogin", "true");
    navigate("/profile");
  }

  function handleMySubGreddit() {
    localStorage.setItem("isLogin", "true");
    navigate("/my-sub-greddiits");
  }

  function handleSubGreddit() {
    localStorage.setItem("isLogin", "true");
    navigate("/sub-greddiits");
  }

  function handleSave() {
    localStorage.setItem("isLogin", "true");
    navigate("/saved-posts");
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "black" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <i class="fa-brands fa-reddit-alien"></i>
              <span className="gredit">Greddiit</span>
            </Typography>
            <p style={{ color: "white", marginRight: "25px", marginTop: "17px"}}
            //class="fa-solid fa-comment"
            className="mouse"
            onClick={handleMySubGreddit}
            >MY SUB GREDDIITS</p>
            <p style={{ color: "white", marginRight: "25px", marginTop: "17px"}}
            //class="fa-solid fa-comment"
            className="mouse"
            onClick={handleSubGreddit}
            >SUB GREDDIITS</p>
            <i 
            style={{ color: "white", marginRight: "30px", cursor: "pointer"}}
            onClick={handleSave}
            class="fa-regular fa-copy"></i>
            <i
              style={{ color: "white", marginRight: "25px"}}
              class="fa-solid fa-user"
              //className="mouse"
              onClick={handleProfile}
            ></i>
            <i
              style={{ color: "white" }}
              class="fa-solid fa-right-from-bracket"
              //className="mouse"
              onClick={handleLogout}
            ></i>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
