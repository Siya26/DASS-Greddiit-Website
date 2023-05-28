import React, { useState } from "react";
import { Follower, Following } from "./follow";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import girl from "../images/girl2.jpg";
import mail from "../images/mail.jpg";
import call from "../images/call.jpg";
import { borderColor } from "@mui/system";
import axios from "axios";
// import jwt from 'jsonwebtoken'

function Profile() {
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [change, setChange] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [tel, setTel] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }
  });

  function def(e) {
    e.preventDefault();
  }

  function handle1(event) {
    setFname(event.target.value);
  }

  function handle2(event) {
    setLname(event.target.value);
  }

  function handle3(event) {
    setName(event.target.value);
  }

  function handle4(event) {
    setAge(event.target.value);
  }

  function handle5(event) {
    setTel(event.target.value);
  }

  function edit(event) {
    event.preventDefault();

    const person = {
      fname: fname,
      lname: lname,
      name: name,
      age: age,
      tel: tel,
      email: email,
    };

    axios
      .put("/api/editProfile", person)
      .then((res) => {
        alert("User details updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios
      .get("/api/getProfile", { params: { email: email } })
      .then((res) => {
        setFname(res.data.fname);
        setLname(res.data.lname);
        setName(res.data.name);
        setAge(res.data.age);
        setTel(res.data.tel);
        setEmail(res.data.email);
        setFollowing(res.data.following);
        setFollower(res.data.follower);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function unfol(g) {
    axios
      .post("/api/unfollow", {
        email: email,
        follow: g,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        //alert(err);
        console.log(err);
      });

    axios
      .post("/api/remove", {
        email: g,
        follow: email,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        //alert(err);
        console.log(err);
      });
  }

  function remove(g) {
    axios
      .post("/api/remove", {
        email: email,
        follow: g,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        //alert(err);
        console.log(err);
      });

    axios
      .post("/api/unfollow", {
        email: g,
        follow: email,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        //alert(err);
        console.log(err);
      });
  }

  return (
    <div>
      <div
        class="modal fade"
        id="Modal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel"
                style={{
                  color: "black",
                  marginLeft: "190px",
                  fontWeight: "bold",
                }}
              >
                Followers
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style={{ color: "black" }}>
              {follower
                ? follower.map((g, i) => (
                    <table>
                      <tr>
                        <td>
                          <p>{g}</p>
                        </td>
                        <td style={{ marginRight: "2px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              remove(g);
                              def();
                            }}
                            class="btn btn-outline-dark"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </table>
                  ))
                : null}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#50a3a2", borderColor: "white" }}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style={{ backgroundColor: "#50a3a2", borderColor: "white" }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="Modal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel"
                style={{
                  color: "black",
                  marginLeft: "190px",
                  fontWeight: "bold",
                }}
              >
                Following
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style={{ color: "black" }}>
              {following
                ? following.map((g, i) => (
                    <table>
                      <tr>
                        <td>
                          <p>{g}</p>
                        </td>
                        <td style={{ marginRight: "2px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              unfol(g);
                              def();
                            }}
                            class="btn btn-outline-dark"
                          >
                            Unfollow
                          </button>
                        </td>
                      </tr>
                    </table>
                  ))
                : null}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#50a3a2", borderColor: "white" }}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style={{ backgroundColor: "#50a3a2", borderColor: "white" }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Navbar />
        <h1
          style={{
            textAlign: "center",
            padding: "30px",
            fontFamily: "fantasy",
            marginTop: "-10px",
          }}
        >
          <b>PROFILE</b>
        </h1>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            transform: "translate(-50%, -50%)",
            color: "#50a3a2",
          }}
          className="card"
        >
          <div className="container">
            <img className="photo" src={girl} />
            <form>
              <input
                className="input-reg"
                onChange={handle1}
                type="text"
                placeholder="First Name"
                value={"Fname: " + fname}
              />
              <input
                className="input-reg"
                onChange={handle2}
                type="text"
                placeholder="Last Name"
                value={"Lname: " + lname}
              />
              <input
                className="input-reg"
                onChange={handle3}
                type="text"
                placeholder="User Name"
                value={"Uname: " + name}
              />
              <input
                className="input-reg"
                onChange={handle4}
                type="number"
                placeholder="Age"
                value={age}
              />
              <input
                className="input-reg"
                onChange={handle5}
                type="tel"
                placeholder="Contact Number"
                value={"Tel: " + tel}
              />
              <br />
              <br />
            </form>
            <table align="center">
              <tr>
                <td>
                  <button
                    className="round"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal1"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#50a3a2",
                      color: "#50a3a2",
                      marginRight: "50px",
                    }}
                  >
                    <b>{follower.length}</b> Followers
                  </button>
                </td>
                <td>
                  <button
                    className="round"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal2"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#50a3a2",
                      color: "#50a3a2",
                    }}
                  >
                    <b>{following.length}</b> Following
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <button className="edit" onClick={edit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
