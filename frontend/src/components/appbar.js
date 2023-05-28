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
import { borderRadius } from "@mui/system";

function Appbar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "black" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <i class="fa-brands fa-reddit-alien"></i>
              <span className="gredit">Greddiit</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Appbar;
