import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import apple from "../images/apple.jpg";
import "./styles.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

function Post() {
  const [text, setText] = useState("");
  const [textNew, setTextNew] = useState("");
  const [comment, setComment] = useState("");
  const [concern, setConcern] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email_sub, setEmailSub] = useState("");
  const [email_post, setEmailPost] = useState("");
  const [post, setPost] = useState([]);
  const [mySubGreddit, setMySubGreddit] = useState("");
  const [ban, setBan] = useState([]);

  function handle1(event) {
    setText(event.target.value);
  }

  function handle2(event) {
    setComment(event.target.value);
  }

  function handle3(event) {
    setConcern(event.target.value);
  }

  const navigate = useNavigate();
  const id = useParams();

  function check(event) {
    // const person = {
    //   name: id.id,
    //   text: text,
    //   email: email_sub,
    //   email_post: email,
    // };

    let word = text;
    //console.log(person);
    for (let i = 0; i < ban.length; i++) {
      var replac = new RegExp(ban[i], "ig");
      let word1 = word.replace(replac, "*".repeat(ban[i].length));
      word = word1;
    }

    axios
      .post("/api/post", {
        name: id.id,
        text: word,
        email: email_sub,
        email_post: email,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .post("/api/noPost", {
        no_posts: post.length + 1,
        email: email_sub,
        name: id.id,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  useEffect(() => {
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    const email_sub = localStorage.getItem("email_sub");
    setEmailSub(email_sub);

    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }

    axios
      .post("/api/getPost", {
        email: email_sub,
        name: id.id,
        myEmail: email,
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/getmySub", { email: email_sub, name: id.id })
      .then((res) => {
        setMySubGreddit(res.data);
        setBan(res.data.ban);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function def(e) {
    e.preventDefault();
  }

  function up(i) {
    axios
      .post("/api/up", {
        email: email,
        id: post[i]._id,
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

  function down(i) {
    axios
      .post("/api/down", {
        email: email,
        id: post[i]._id,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cmnt(i) {
    axios
      .post("/api/comment", {
        comment: comment,
        id: post[i]._id,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function rpt(i) {
    console.log(post[i].text);
    const person = {
      user: post[i].email_post,
      reporter: email,
      concern: concern,
      post_id: post[i]._id,
      name: id.id,
      email_sub: email_sub,
      text: post[i].text,
    };

    axios
      .post("/api/report", person)
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function save(i) {
    axios
      .post("/api/save", {
        email: email,
        id: post[i]._id,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fol(i) {
    axios
      .post("/api/following", {
        email: email,
        follow: post[i].email_post,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/follower", {
        email: email,
        follow: post[i].email_post,
      })
      .then((res) => {
        //setPost(res.data.up);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
                New Post
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
                  <label for="message-text" class="col-form-label">
                    Text
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    rows={4}
                    onChange={handle1}
                    value={text}
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
                onClick={() => {
                  check();
                  def();
                }}
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#50a3a2", borderColor: "white" }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
      <img
        src={apple}
        style={{
          width: "180px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "35%",
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
            <b>Description:</b>
          </h6>
          <p style={{ textAlign: "left", color: "#50a3a2" }}>
            {mySubGreddit.desc}
          </p>
        </div>
      </div>
      <Button
        variant="contained"
        data-bs-toggle="modal"
        data-bs-target="#Modal1"
        onClick={() => {
          //def();
        }}
        style={{
          backgroundColor: "white",
          borderColor: "#50a3a2",
          color: "#50a3a2",
          left: "45%",
          top: "35%",
          position: "absolute",
        }}
      >
        create post
      </Button>

      <div className="row">
        {post
          ? post.map((greddit, i) => (
              <div
                style={{
                  position: "relative",
                  left: "2%",
                  //top: "40%",
                  marginTop: "110px",
                  //transform: "translate(-80%, -10%)",
                  //color: "#50a3a2",
                }}
                className="card"
              >
                {/* <div className="col mb-sm-0"> */}
                {/* <div class="card"> */}
                <div>
                  <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                    <b>Text:</b>
                    {/* {console.log(greddit.text)} */}
                  </h6>
                  <p style={{ textAlign: "left", color: "#50a3a2" }}>
                    {greddit.text}
                  </p>
                  <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                    <b>Posted by:</b>
                  </h6>
                  <p style={{ textAlign: "left", color: "#50a3a2" }}>
                    {greddit.email_post}
                  </p>
                  <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                    <b>Posted in:</b>
                  </h6>
                  <p style={{ textAlign: "left", color: "#50a3a2" }}>
                    {greddit.name}
                  </p>
                  <table>
                    <i
                      onClick={() => {
                        up(i);
                        def();
                      }}
                      style={{
                        color: "black",
                        left: "10%",
                        position: "absolute",
                        cursor: "pointer",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                      class="fa-regular fa-thumbs-up"
                    ></i>
                    <span
                      style={{
                        color: "black",
                        marginLeft: "50px",
                        marginTop: "-10px",
                        position: "absolute",
                      }}
                    >
                      {greddit.upvote.length}
                    </span>
                    <i
                      onClick={() => {
                        down(i);
                        def();
                      }}
                      style={{
                        color: "black",
                        left: "25%",
                        position: "absolute",
                        cursor: "pointer",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                      class="fa-regular fa-thumbs-down"
                    ></i>
                    <span
                      style={{
                        color: "black",
                        marginLeft: "110px",
                        marginTop: "-10px",
                        position: "absolute",
                      }}
                    >
                      {greddit.downvote.length}
                    </span>
                    <i
                      onClick={() => {
                        save(i);
                        def();
                      }}
                      style={{
                        color: "black",
                        left: "43%",
                        position: "absolute",
                        cursor: "pointer",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                      class="fa-regular fa-bookmark"
                    ></i>
                    <i
                      onClick={() => {
                        fol(i);
                        def();
                      }}
                      style={{
                        color: "black",
                        left: "60%",
                        position: "absolute",
                        cursor: "pointer",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                      class="fa-solid fa-user-plus"
                    ></i>
                    <i
                      data-bs-toggle="modal"
                      data-bs-target={"#Modal2" + i}
                      // onClick={() => {
                      //   rpt(i);
                      //   def();
                      // }}
                      style={{
                        color: "black",
                        left: "80%",
                        position: "absolute",
                        cursor: "pointer",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                      class="fa-solid fa-triangle-exclamation"
                    ></i>
                    <div
                      //open={open}
                      class="modal fade"
                      id={"Modal2" + i}
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
                              Report
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
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Concern
                                </label>
                                <textarea
                                  class="form-control"
                                  id="message-text"
                                  rows={2}
                                  onChange={handle3}
                                  value={concern}
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                              style={{
                                backgroundColor: "#50a3a2",
                                borderColor: "white",
                              }}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={() => {
                                rpt(i);
                                def();
                              }}
                              data-bs-dismiss="modal"
                              style={{
                                backgroundColor: "#50a3a2",
                                borderColor: "white",
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </table>
                  {/* <form class="row g-3" style={{ marginTop: "10px" }}>
                      <div class="col-auto">
                        <label for="inputPassword2" class="visually-hidden">
                        Password
                      </label>
                        <input
                          type="text"
                          onChange={handle2}
                          class="form-control"
                          // id="inputPassword2"
                          placeholder="Comment here..."
                          value={comment}
                        />
                      </div>
                      <div class="col-auto">
                        <Button
                          variant="contained"
                          onClick={() => {
                            cmnt(i);
                            def();
                          }}
                          style={{ backgroundColor: "black" }}
                        >
                          COmment
                        </Button>
                      </div>
                    </form> */}
                  <form style={{ marginTop: "30px" }}>
                    <input
                      className="form-control"
                      // name="name"
                      onChange={handle2}
                      type="text"
                      placeholder="Comment Here..."
                      //autoComplete="off"
                      //defaultValue={cmnt}
                    />

                    {/* <label for="floatingInput">Add Comment Here</label> */}
                    <button
                      onClick={() => {
                        cmnt(i);
                        def();
                      }}
                      // type="submit"
                      className="btn btn-outline-dark home-btn"
                    >
                      Add
                    </button>
                  </form>
                  {post[i].comment
                    ? post[i].comment.map((sub, j) => (
                        <p style={{ color: "black" }}>{sub}</p>
                      ))
                    : null}
                </div>
              </div>
              // </div>
              //<p>{greddit.text}</p>
            ))
          : null}
      </div>
    </div>
  );
}
export default Post;
