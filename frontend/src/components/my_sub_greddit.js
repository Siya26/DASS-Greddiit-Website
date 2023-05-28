import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MySubGreddit() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [ban, setBan] = useState([]);
  const [email, setEmail] = useState("");
  const [mySubGreddit, setMySubGreddit] = useState([]);
  const [open, setOpen] = useState(false);

  function handle1(event) {
    setName(event.target.value);
  }

  function handle2(event) {
    setDesc(event.target.value);
  }

  function handle3(event) {
    setTags(event.target.value.split(","));
  }

  function handle4(event) {
    setBan(event.target.value.split(","));
  }

  function check(event) {
    //event.preventDefault();
    const person = {
      name: name,
      desc: desc,
      tags: tags,
      ban: ban,
      email: email,
      users: [email],
    };

    // console.log(person);
    axios
      .post("/api/mysubgreddit", person)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }
    
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    axios
      .post("/api/getmySubGreddit", { email: emaili })
      .then((res) => {
        setMySubGreddit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function delbut(event, i) {
    axios
      .post("/api/delReport", {
        email: mySubGreddit[i].email,
        name: mySubGreddit[i].name,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/delPost", {
        email: mySubGreddit[i].email,
        name: mySubGreddit[i].name,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/delmySubGreddit", {
        name: mySubGreddit[i].name,
        email: mySubGreddit[i].email,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openbut(event, i) {
    const name = mySubGreddit[i].name;
    navigate("/sub-greddiit/" + name);
  }

  return (
    <div>
      <div
        //open={open}
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
                  marginLeft: "auto",
                  fontWeight: "bold",
                }}
              >
                New Sub Greddit
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style={{ color: "black" }}>
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    onChange={handle1}
                    value={name}
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    rows={4}
                    onChange={handle2}
                    value={desc}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Tags
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    rows={2}
                    onChange={handle3}
                    value={tags}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Banned Keywords
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    rows={3}
                    onChange={handle4}
                    value={ban}
                  ></textarea>
                </div>
              </form>
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
                onClick={check}
                data-bs-dismiss="modal"
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
        <button
          //onClick={setOpen(true)}
          className="round"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#Modal1"
          style={{
            backgroundColor: "white",
            borderColor: "#50a3a2",
            color: "#50a3a2",
            left: "2%",
            top: "10%",
            position: "absolute",
          }}
        >
          Create
        </button>
        <br />
        <div className="row">
          {mySubGreddit
            ? mySubGreddit.map((greddit, i) => (
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
                  {/* <div className="col mb-sm-0"> */}
                  {/* <div class="card"> */}
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
                    <button
                      class="btn btn-primary"
                      className="btn1"
                      onClick={(event) => delbut(event, i)}
                    >
                      Delete
                    </button>
                    <button
                      class="btn btn-primary"
                      className="btn1"
                      onClick={(event) => openbut(event, i)}
                    >
                      Open
                    </button>
                  </div>
                </div>
                // </div>
                // </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default MySubGreddit;
