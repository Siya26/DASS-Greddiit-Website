import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

function Save() {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email_sub, setEmailSub] = useState("");
  const [email_post, setEmailPost] = useState("");
  const [post, setPost] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [mySubGreddit, setMySubGreddit] = useState("");

  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {
    const emaili = localStorage.getItem("email");
    setEmail(emaili);

    const email_sub = localStorage.getItem("email_sub");
    setEmailSub(email_sub);

    if (localStorage.getItem("isLogin") === "false") {
      navigate("/");
    }
    // axios
    //   .post("/api/getPost", { email: email_sub, name: id.id })
    //   .then((res) => {
    //     setPost(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios
    //   .post("/api/getmySub", { email: email_sub, name: id.id })
    //   .then((res) => {
    //     setMySubGreddit(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .post("/api/getSave", { email: emaili })
      .then((res) => {
        setPost(res.data.save_post);
        console.log(res.data.save_post);

        axios
          .post("/api/getSavePosts", {
            id: res.data.save_post,
          })
          .then((res) => {
            setSavedPost(res.data);
            console.log(res.data.save_post);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function def(e) {
    e.preventDefault();
  }

  function remove(i) {
    axios
      .post("/api/delPos", {
        post_id: savedPost[i]._id,
      })
      .then((res) => {
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
      <h1>Saved Posts</h1>
      <div className="row">
        {savedPost
          ? savedPost.map((greddit, i) => (
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
                  <h6 style={{ textAlign: "left", color: "#50a3a2" }}>
                    <b>Comments:</b>
                  </h6>
                  {savedPost[i].comment
                    ? savedPost[i].comment.map((sub, j) => (
                        <p style={{ textAlign: "left", color: "#50a3a2" }}>
                          {sub}
                        </p>
                      ))
                    : null}

                  <Button
                    variant="contained"
                    onClick={() => {
                      remove(i);
                      def();
                    }}
                    style={{
                      backgroundColor: "#50a3a2",
                      borderColor: "#50a3a2",
                      color: "white",
                      // right: "50%",
                    }}
                  >remove</Button>
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
export default Save;
