import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";

function SubGreddits() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subGreddit, setSubGreddit] = useState([]);
  const [requests, setRequests] = useState([]);
  const [state, setState] = useState(true);
  const [sort, setSort] = useState(false);
  const [sort1, setSort1] = useState([]);
  const [sort2, setSort2] = useState([]);
  const [sort3, setSort3] = useState([]);
  const [sort4, setSort4] = useState([]);
  const [search, setSearch] = useState("");

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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }
    
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    axios
      .post("/api/getSubGreddit")
      .then((res) => {
        setSubGreddit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function def(e) {
    e.preventDefault();
  }

  function handleSave() {
    localStorage.setItem("isLogin", "true");
    navigate("/saved-posts");
  }

  function asc() {
    subGreddit.sort(function (p, q) {
      return p.name.localeCompare(q.name);
    });
    setSubGreddit(subGreddit);

    setState(false);
    setSort(true);
    setSort1(subGreddit);
    setSort2([]);
    setSort3([]);
    setSort4([]);
  }

  function desc() {
    subGreddit.sort(function (p, q) {
      return q.name.localeCompare(p.name);
    });
    setSubGreddit(subGreddit);

    setState(false);
    setSort(true);
    setSort2(subGreddit);
    setSort1([]);
    setSort3([]);
    setSort4([]);
  }

  function fol() {
    subGreddit.sort(function (p, q) {
      return q.users.length - p.users.length;
    });
    setSubGreddit(subGreddit);

    setState(false);
    setSort(true);
    setSort3(subGreddit);
    setSort1([]);
    setSort2([]);
    setSort4([]);
  }

  function crt() {
    subGreddit.sort(function (p, q) {
      return (
        new Date(q.createTime).getTime() - new Date(p.createTime).getTime()
      );
    });
    setSubGreddit(subGreddit);

    setState(false);
    setSort(true);
    setSort4(subGreddit);
    setSort2([]);
    setSort3([]);
    setSort1([]);
  }

  function request(p, q) {
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    axios
      .post("/api/join", {
        myEmail: email,
        name: q,
        requestedEmail: p,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("Requested");
  }

  function open(p, q) {
    localStorage.setItem("email_sub", p);
    navigate("/sub-greddiits/" + q);
  }

  function leave(p, q) {
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    axios
      .post("/api/removeUsers", {
        myEmail: email,
        name: q,
        requestedEmail: p,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    alert("You left the subgreddiit");
  }

  return (
    <div>
      {state && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "black" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <i class="fa-brands fa-reddit-alien"></i>
                  <span className="gredit">Greddiit</span>
                </Typography>
                {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
              />
            </Search> */}
                <nav class="bg-body-inherit">
                  <div class="container-fluid">
                    <form class="d-flex" role="search">
                      <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ opacity: "1", borderRadius: "0%" }}
                      />
                      {/* <button class="btn btn-outline-success" type="submit">
                    Search
                  </button> */}
                      <SearchIcon style={{ marginTop: "5px" }} />
                    </form>
                  </div>
                </nav>
                <p
                  style={{
                    color: "white",
                    marginRight: "25px",
                    marginTop: "17px",
                  }}
                  //class="fa-solid fa-comment"
                  className="mouse"
                  onClick={handleMySubGreddit}
                >
                  MY SUB GREDDIITS
                </p>
                <p
                  style={{
                    color: "white",
                    marginRight: "25px",
                    marginTop: "17px",
                  }}
                  //class="fa-solid fa-comment"
                  className="mouse"
                  onClick={handleSubGreddit}
                >
                  SUB GREDDIITS
                </p>
                <i
                  style={{
                    color: "white",
                    marginRight: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                  class="fa-regular fa-copy"
                ></i>
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
          <div>
            <h3>Sort by</h3>
            <button
              //onClick={setOpen(true)}
              className="round"
              class="btn btn-primary"
              onClick={() => {
                asc();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // right: "50%",
                // top: "85%",
                // position: "absolute",
                //paddingRight: "20px",
              }}
            >
              Ascending
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                desc();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // left: "50%",
                // top: "85%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Descending
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                fol();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // right: "50%",
                // top: "90%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Followers
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                crt();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // left: "50%",
                // top: "90%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Creation Time
            </button>
          </div>

          <div className="row">
            {subGreddit
              ? subGreddit.map((greddit, i) => {
                  if (
                    greddit.name.toUpperCase().includes(search.toUpperCase()) ||
                    !search
                  ) {
                    return (
                      <div>
                        {greddit.email === email && (
                          <div
                            style={{
                              position: "relative",
                              // left: "50%",
                              // top: "55%",
                              // transform: "translate(-50%, -50%)",
                              //color: "#50a3a2",
                            }}
                            className="card"
                          >
                            <h3
                              class="card-header"
                              style={{ color: "#50a3a2" }}
                            >
                              <b>{greddit.name}</b>
                            </h3>
                            <div class="card-body">
                              <h6
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                <b>Description:</b>
                              </h6>
                              <p
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                {greddit.desc}
                              </p>
                              <h6
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                <b>Banned Keywords:</b>
                              </h6>
                              <p
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                {greddit.ban.toString()}
                              </p>
                              <h6
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                <b>No of users:</b>
                              </h6>
                              <p
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                {greddit.users.length}
                              </p>
                              <h6
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                <b>No of posts:</b>
                              </h6>
                              <p
                                style={{ textAlign: "left", color: "#50a3a2" }}
                              >
                                {greddit.no_posts}
                              </p>
                              {/* <button class="btn btn-primary" className="btn1" onClick={(event) => delbut(event, i)}>
                          Delete
                        </button>
                        <button class="btn btn-primary" className="btn1" onClick={openbut}>
                          Open
                        </button> */}

                              <div>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    open(greddit.email, greddit.name);
                                    def();
                                  }}
                                  style={{
                                    backgroundColor: "#50a3a2",
                                    borderColor: "#50a3a2",
                                    color: "white",
                                    // right: "50%",
                                  }}
                                >
                                  Open
                                </Button>

                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    leave(greddit.email, greddit.name);
                                  }}
                                  style={{
                                    // backgroundColor: "#50a3a2",
                                    // borderColor: "#50a3a2",
                                    // color: "white",
                                    // right: "50%",
                                  }}
                                  disabled
                                >
                                  Leave
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  // </div>
                })
              : null}
          </div>
          <div className="row">
            {subGreddit
              ? subGreddit.map((greddit, i) => {
                  if (
                    greddit.name.toUpperCase().includes(search.toUpperCase()) ||
                    !search
                  ) {
                    return (
                      <div>
                        {greddit.email !== email &&
                          greddit.users.includes(email) && (
                            <div
                              style={{
                                position: "relative",
                                // left: "50%",
                                // top: "55%",
                                // transform: "translate(-50%, -50%)",
                                //color: "#50a3a2",
                              }}
                              className="card"
                            >
                              <h3
                                class="card-header"
                                style={{ color: "#50a3a2" }}
                              >
                                <b>{greddit.name}</b>
                              </h3>
                              <div class="card-body">
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>Description:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.desc}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>Banned Keywords:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.ban.toString()}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>No of users:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.users.length}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>No of posts:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.no_posts}
                                </p>
                                {/* <button class="btn btn-primary" className="btn1" onClick={(event) => delbut(event, i)}>
                          Delete
                        </button>
                        <button class="btn btn-primary" className="btn1" onClick={openbut}>
                          Open
                        </button> */}

                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      open(greddit.email, greddit.name);
                                      def();
                                    }}
                                    style={{
                                      backgroundColor: "#50a3a2",
                                      borderColor: "#50a3a2",
                                      color: "white",
                                    }}
                                  >
                                    Open
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      leave(greddit.email, greddit.name);
                                      // def();
                                    }}
                                    style={{
                                      backgroundColor: "#50a3a2",
                                      borderColor: "#50a3a2",
                                      color: "white",
                                      // right: "50%",
                                    }}
                                  >
                                    leave
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  }
                  // </div>
                })
              : null}
          </div>
          <div className="row">
            {subGreddit
              ? subGreddit.map((greddit, i) => {
                  if (
                    greddit.name.toUpperCase().includes(search.toUpperCase()) ||
                    !search
                  ) {
                    return (
                      <div>
                        {greddit.email !== email &&
                          !greddit.users.includes(email) && (
                            <div
                              style={{
                                position: "relative",
                                // left: "50%",
                                // top: "55%",
                                // transform: "translate(-50%, -50%)",
                                //color: "#50a3a2",
                              }}
                              className="card"
                            >
                              <h3
                                class="card-header"
                                style={{ color: "#50a3a2" }}
                              >
                                <b>{greddit.name}</b>
                              </h3>
                              <div class="card-body">
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>Description:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.desc}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>Banned Keywords:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.ban.toString()}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>No of users:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.users.length}
                                </p>
                                <h6
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  <b>No of posts:</b>
                                </h6>
                                <p
                                  style={{
                                    textAlign: "left",
                                    color: "#50a3a2",
                                  }}
                                >
                                  {greddit.no_posts}
                                </p>
                                {/* <button class="btn btn-primary" className="btn1" onClick={(event) => delbut(event, i)}>
                          Delete
                        </button>
                        <button class="btn btn-primary" className="btn1" onClick={openbut}>
                          Open
                        </button> */}
                                <div>
                                  {(greddit.left_users.includes(email) ||  greddit.blocked_users.includes(email)) ? (
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        request(greddit.email, greddit.name);
                                        def();
                                      }}
                                      style={{
                                        backgroundColor: "#50a3a2",
                                        borderColor: "#50a3a2",
                                        color: "white",
                                        // right: "50%",
                                      }}
                                      disabled
                                    >
                                      Join
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        request(greddit.email, greddit.name);
                                        def();
                                      }}
                                      style={{
                                        backgroundColor: "#50a3a2",
                                        borderColor: "#50a3a2",
                                        color: "white",
                                        // right: "50%",
                                      }}
                                    >
                                      Join
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  }
                  {
                    /* // </div> */
                  }
                })
              : null}
          </div>
        </div>
      )}
      {sort && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "black" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <i class="fa-brands fa-reddit-alien"></i>
                  <span className="gredit">Greddiit</span>
                </Typography>
                {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
              />
            </Search> */}
                <nav class="bg-body-inherit">
                  <div class="container-fluid">
                    <form class="d-flex" role="search">
                      <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ opacity: "1", borderRadius: "0%" }}
                      />
                      {/* <button class="btn btn-outline-success" type="submit">
                    Search
                  </button> */}
                      <SearchIcon style={{ marginTop: "5px" }} />
                    </form>
                  </div>
                </nav>
                <p
                  style={{
                    color: "white",
                    marginRight: "25px",
                    marginTop: "17px",
                  }}
                  //class="fa-solid fa-comment"
                  className="mouse"
                  onClick={handleMySubGreddit}
                >
                  MY SUB GREDDIITS
                </p>
                <p
                  style={{
                    color: "white",
                    marginRight: "25px",
                    marginTop: "17px",
                  }}
                  //class="fa-solid fa-comment"
                  className="mouse"
                  onClick={handleSubGreddit}
                >
                  SUB GREDDIITS
                </p>
                <i
                  style={{
                    color: "white",
                    marginRight: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                  class="fa-regular fa-copy"
                ></i>
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
          <div>
            <h3>Sort by</h3>
            <button
              //onClick={setOpen(true)}
              className="round"
              class="btn btn-primary"
              onClick={() => {
                asc();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // right: "50%",
                // top: "85%",
                // position: "absolute",
                //paddingRight: "20px",
              }}
            >
              Ascending
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                desc();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // left: "50%",
                // top: "85%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Descending
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                fol();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // right: "50%",
                // top: "90%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Followers
            </button>
            <button
              className="round"
              class="btn btn-primary"
              onClick={() => {
                crt();
                def();
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#50a3a2",
                color: "#50a3a2",
                // left: "50%",
                // top: "90%",
                // position: "absolute",
                //paddingLeft: "20px",
              }}
            >
              Creation Time
            </button>
          </div>
          <div className="row">
            {subGreddit
              ? subGreddit.map((greddit, i) => {
                  if (
                    greddit.name.toUpperCase().includes(search.toUpperCase()) ||
                    !search
                  ) {
                    return (
                      <div
                        style={{
                          position: "relative",
                          // left: "50%",
                          // top: "55%",
                          // transform: "translate(-50%, -50%)",
                          //color: "#50a3a2",
                        }}
                        className="card"
                      >
                        <h3 class="card-header" style={{ color: "#50a3a2" }}>
                          <b>{greddit.name}</b>
                        </h3>
                        <div class="card-body">
                          <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                            <b>Description:</b>
                          </h6>
                          <p style={{ textAlign: "left", color: "#50a3a2" }}>
                            {greddit.desc}
                          </p>
                          <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                            <b>Banned Keywords:</b>
                          </h6>
                          <p style={{ textAlign: "left", color: "#50a3a2" }}>
                            {greddit.ban.toString()}
                          </p>
                          <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                            <b>No of users:</b>
                          </h6>
                          <p style={{ textAlign: "left", color: "#50a3a2" }}>
                            {greddit.users.length}
                          </p>
                          <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                            <b>No of posts:</b>
                          </h6>
                          <p style={{ textAlign: "left", color: "#50a3a2" }}>
                            {greddit.no_posts}
                          </p>
                          {/* <button class="btn btn-primary" className="btn1" onClick={(event) => delbut(event, i)}>
                          Delete
                        </button>
                        <button class="btn btn-primary" className="btn1" onClick={openbut}>
                          Open
                        </button> */}
                          <div>
                            {greddit.email === email ? (
                              <div>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    open(greddit.email, greddit.name);
                                    def();
                                  }}
                                  style={{
                                    backgroundColor: "#50a3a2",
                                    borderColor: "#50a3a2",
                                    color: "white",
                                    // right: "50%",
                                  }}
                                >
                                  Open
                                </Button>

                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    leave(greddit.email, greddit.name);
                                  }}
                                  style={{
                                    // backgroundColor: "#50a3a2",
                                    // borderColor: "#50a3a2",
                                    // color: "white",
                                    // right: "50%",
                                  }}
                                  disabled
                                >
                                  Leave
                                </Button>
                              </div>
                            ) : greddit.users.includes(email) ? (
                              <div>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    open(greddit.email, greddit.name);
                                    def();
                                  }}
                                  style={{
                                    backgroundColor: "#50a3a2",
                                    borderColor: "#50a3a2",
                                    color: "white",
                                    // right: "50%",
                                  }}
                                >
                                  Open
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    leave(greddit.email, greddit.name);
                                    // def();
                                  }}
                                  style={{
                                    backgroundColor: "#50a3a2",
                                    borderColor: "#50a3a2",
                                    color: "white",
                                    // right: "50%",
                                  }}
                                >
                                  leave
                                </Button>
                              </div>
                            ) : (
                              <div>
                                {(greddit.left_users.includes(email) ||  greddit.blocked_users.includes(email))? (
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      request(greddit.email, greddit.name);
                                      def();
                                    }}
                                    style={{
                                      backgroundColor: "#50a3a2",
                                      borderColor: "#50a3a2",
                                      color: "white",
                                      // right: "50%",
                                    }}
                                    disabled
                                  >
                                    Join
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      request(greddit.email, greddit.name);
                                      def();
                                    }}
                                    style={{
                                      backgroundColor: "#50a3a2",
                                      borderColor: "#50a3a2",
                                      color: "white",
                                      // right: "50%",
                                    }}
                                  >
                                    Join
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  // </div>
                })
              : null}
          </div>
        </div>
      )}
    </div>
    //</div>
  );
}

export default SubGreddits;
