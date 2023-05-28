import React from "react";
import logo from "../images/greddiit2.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { margin } from "@mui/system";

function SubNav() {
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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "black" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <i class="fa-brands fa-reddit-alien"></i>
              <span className="gredit">Greddiit</span>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <p
              style={{ color: "white", marginRight: "25px", marginTop: "17px" }}
              //class="fa-solid fa-comment"
              className="mouse"
              onClick={handleMySubGreddit}
            >
              MY SUB GREDDIITS
            </p>
            <p
              style={{ color: "white", marginRight: "25px", marginTop: "17px" }}
              //class="fa-solid fa-comment"
              className="mouse"
              onClick={handleSubGreddit}
            >
              SUB GREDDIITS
            </p>
            <i
              style={{ color: "white", marginRight: "25px" }}
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

export default SubNav;
