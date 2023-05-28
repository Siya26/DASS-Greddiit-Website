import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SubGreddit() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subGreddit, setSubGreddit] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [blockUser, setBlockUser] = useState([]);
  const [concern, setConcern] = useState([]);
  const [reporter, setReporter] = useState([]);

  const id = useParams();
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }

    const email = localStorage.getItem("email");
    setEmail(email);

    axios
      .post("/api/getJoin", { email: email, name: id.id })
      .then((res) => {
        setSubGreddit(res.data.my);
        setUsers(res.data.users);
        setBlockUser(res.data.blocked_users);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/getReports", { email: email, name: id.id })
      .then((res) => {
        console.log(res.data);
        setReports(res.data);
        // setUname(res.data.user);
        // setReporter(res.data.reporter);
        // setConcern(res.data.concern);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function def(e) {
    e.preventDefault();
  }

  function accept(i) {
    axios
      .post("/api/accept", {
        email: email,
        name: id.id,
        myEmail: i,
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/reject", {
        email: email,
        name: id.id,
        myEmail: i,
      })
      .then((res) => {
        setSubGreddit(res.data.my);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    // .post("/api/users", {
    //   myEmail: i,
    // })
    // .then((res) => {
    //   console.log(res.data);
    //   setUname(res.data.name);
    //   console.log(uname);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  function reject(i) {
    axios
      .post("/api/reject", {
        email: email,
        name: id.id,
        myEmail: i,
      })
      .then((res) => {
        setSubGreddit(res.data.my);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function block(i) {
    axios
      .post("/api/block", {
        email: email,
        name: id.id,
        user: reports[i].user,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert("Already blocked the user!");
        console.log(err);
      });
  }

  function del(i) {
    axios
      .post("/api/delRep", {
        post_id: reports[i].post_id,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/delPos", {
        post_id: reports[i].post_id,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function ignore(i) {
    axios
      .post("/api/ignore", { id: reports[i]._id })
      .then((res) => {
        // setReports(res.data);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Navbar />
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Users
          </button>
          <button
            class="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Joining Requests
          </button>
          <button
            class="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Reports
          </button>
          <button
            class="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Stats
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabindex="0"
        >
          <h6>Users:</h6>
          {users.map((i) => (
            <div>{i}</div>
          ))}
          <br />
          <h6>Blocked Users:</h6>
          {blockUser.map((i) => (
            <div style={{ color: "red" }}>{i}</div>
          ))}
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabindex="0"
        >
          {subGreddit.map((i) => (
            <div>
              {i}
              <table>
                <tr>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        accept(i);
                        def();
                      }}
                      class="btn btn-outline-success"
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        reject(i);
                        def();
                      }}
                      class="btn btn-outline-danger"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
          tabindex="0"
        >
          {/* {id.id}
          
          {reports.map((i) => (
            <div>
              Reported by:
              {i.reporter}
              Reported user:
              {i.user}
              Concern:
              {i.concern}
            </div>
          ))}
           */}
          {reports.map((i, j) => (
            <div
              style={{
                position: "relative",
                left: "2%",
                top: "10%",
                // transform: "translate(-50%, -50%)",
                //color: "#50a3a2",
              }}
              className="card"
            >
              <h3 class="card-header" style={{ color: "#50a3a2" }}>
                <b>{id.id}</b>
              </h3>
              <div class="card-body">
                <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                  <b>Text:</b>
                </h6>
                <p style={{ textAlign: "left", color: "#50a3a2" }}>
                  {i.text}
                </p>
                <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                  <b>Reported by:</b>
                </h6>
                <p style={{ textAlign: "left", color: "#50a3a2" }}>
                  {i.reporter}
                </p>
                <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                  <b>Reported user:</b>
                </h6>
                <p style={{ textAlign: "left", color: "#50a3a2" }}>{i.user}</p>
                <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                  <b>Concern:</b>
                </h6>
                <p style={{ textAlign: "left", color: "#50a3a2" }}>
                  {i.concern}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    block(j);
                    def();
                  }}
                  class="btn btn-outline-danger"
                  disabled={i.ign}
                >
                  Block User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    del(j);
                    def();
                  }}
                  class="btn btn-outline-dark"
                  disabled={i.ign}
                >
                  Delete Post
                </button>
                <button
                  type="button"
                  onClick={() => {
                    ignore(j);
                    def();
                  }}
                  class="btn btn-outline-secondary"
                >
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
          tabindex="0"
        >
          ...
        </div>
      </div>
    </div>
  );
}

export default SubGreddit;
