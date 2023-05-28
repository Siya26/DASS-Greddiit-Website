const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("./models/user.model");
const gredditSchema = require("./models/subGreddit.model");
const postSchema = require("./models/post.model");
const reportSchema = require("./models/report.model");
const bodyParser = require("body-parser");
const saltrounds = 10;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://siyaputtagunta:SP_st*r1@cluster0.meprs8w.mongodb.net/?retryWrites=true&w=majority"
  // { useNewUrlParser: true }
);
// .then(() => console.log("connected"))
// .catch((e) => console.log(e));

// const connection = mongoose.connection;
// connection.once("open", function () {
//   console.log("MongoDB database connected successfully");
// });

app.post("/api/register", (req, res) => {
  bcrypt.hash(req.body.pass, saltrounds, function (err, hash) {
    const person = new userSchema({
      fname: req.body.fname,
      lname: req.body.lname,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      tel: req.body.tel,
      pass: hash,
    });

    person
      .save()
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  });
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  userSchema
    .findOne({
      email: req.body.email,
      // pass: req.body.pass
    })
    .then((user) => {
      bcrypt.compare(req.body.pass, user.pass).then((done) => {
        console.log(done);
        if (done) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: "Incorrect password!" });
        }
      });
    });
  // console.log(user);
  // if (!user) {
  //   console.log("hello");
  //   return res.status(404).json({error: "Incorrect details!"});
  // }
  // else {
  //   console.log("hi");
  //   return res.status(200).json(user);
  // }

  // if(user) {
  //     const token = jwt.sign(
  //         {
  //             name: user.name,
  //             pass: user.pass,
  //         },
  //         'secre_st*r'
  //     )
  //     return res.json({ status: 'ok', user: token })
  // }
  // else {
  //     return res.json({ status: 'error', user: false })
  // }
});

app.put("/api/editProfile", (req, res) => {
  userSchema.findOneAndUpdate(
    { email: req.body.email },
    {
      fname: req.body.fname,
      lname: req.body.lname,
      name: req.body.name,
      age: req.body.age,
      tel: req.body.tel,
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          error: "Could not edit profile",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.get("/api/getProfile", (req, res) => {
  userSchema.findOne({ email: req.query.email }).then((person) => {
    if (!person) {
      return res.status(404).json({ error: "User not found!" });
    } else {
      console.log(person);
      return res.json(person);
    }
  });
});

app.post("/api/mysubgreddit", (req, res) => {
  console.log(req.body);
  const person = new gredditSchema({
    name: req.body.name,
    desc: req.body.desc,
    tags: req.body.tags,
    ban: req.body.ban,
    email: req.body.email,
    users: req.body.users,
  });
  console.log(person);
  person
    .save()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((err) => {
      res.send(err);
    });
  // .then((user) => {
  //   res.send(user);
  //   // res.status(200).json(user);
  // })
  // .catch((err) => {
  //   res.status(400).send(err);
  // });
});

// app.get("/mysubgreddit", (req, res) => {
//   console.log("F");
//   gredditSchema.find(function (err, prof) {
//     console.log(prof);
//     res.send(prof);
//   });
// });

app.post("/api/getmySubGreddit", (req, res) => {
  const email = req.body.email;
  gredditSchema.find({ email }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      //console.log(person);
      res.status(200).json(user);
    }
  });
});

app.post("/api/getSubGreddit", (req, res) => {
  // const email = req.body.email;
  gredditSchema.find({}).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      //console.log(person);
      res.status(200).json(user);
    }
  });
});

app.post("/api/delmySubGreddit", (req, res) => {
  gredditSchema.deleteOne(
    { name: req.body.name, email: req.body.email },
    function (err, person) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body.email);
        res.status(200).json(person);
      }
    }
  );
});

app.post("/api/join", (req, res) => {
  
  gredditSchema.findOneAndUpdate(
    { name: req.body.name, email: req.body.requestedEmail },
    {
      $push: { my: req.body.myEmail },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/getJoin", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  gredditSchema.findOne({ email: email, name: name }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      //console.log(person);
      res.status(200).json(user);
    }
  });
});

app.post("/api/reject", (req, res) => {
  gredditSchema.findOneAndUpdate(
    { name: req.body.name, email: req.body.email },
    {
      $pull: { my: req.body.myEmail },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/accept", (req, res) => {
  gredditSchema.findOneAndUpdate(
    { name: req.body.name, email: req.body.email },
    {
      $push: { users: req.body.myEmail },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

// app.post("/users", (req, res) => {
//   userSchema
//     .findOne({
//       email: req.body.myEmail,
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: "Incorrect details!" });
//       } else {
//         return res.status(200).json(user);
//       }
//     });
//   }
// )

app.post("/api/removeUsers", (req, res) => {
  gredditSchema.findOneAndUpdate(
    { name: req.body.name, email: req.body.requestedEmail },
    {
      $pull: { users: req.body.myEmail },
      $push: { left_users: req.body.myEmail },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/post", (req, res) => {
  //console.log(req.body.name)
  const person = new postSchema({
    name: req.body.name,
    text: req.body.text,
    email: req.body.email,
    email_post: req.body.email_post,
  });

  person.save(function (err, userObj) {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({ success: true, msg: "user created" });
  });
});

app.post("/api/getPost", (req, res) => {
  const email_sub = req.body.email;
  const name = req.body.name;
  const myEmail = req.body.myEmail;

  postSchema.find({ email: email_sub, name: name }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      gredditSchema.findOne({ email: email_sub, name: name }).then((per) => {
        if (email_sub === myEmail) {
          res.status(200).json(user);
        } else {
          const arr = user;
          for (let i = 0; i < arr.length; i++) {
            if (per.blocked_users.includes(arr[i].email_post)) {
              arr[i].email_post = "Blocked User";
            }
          }
          res.status(200).json(arr);
        }
      });
      // console.log(req.body);
      // res.status(200).json(user);
    }
  });
});

app.post("/api/noPost", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  gredditSchema.findOneAndUpdate(
    { email: email, name: name },
    {
      no_posts: req.body.no_posts,
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/getmySub", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  gredditSchema.findOne({ email: email, name: name }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      // console.log(req.body);
      res.status(200).json(user);
    }
  });
});

app.post("/api/up", (req, res) => {
  postSchema
    .findOne({ _id: req.body.id, upvote: req.body.email })
    .then((user) => {
      if (!user) {
        postSchema.findOneAndUpdate(
          { _id: req.body.id },
          {
            $push: { upvote: req.body.email },
          },
          { new: true, useFindAndModify: false },
          function (err, person) {
            if (err) {
              return res.status(404).json({
                err: "Email not found!",
              });
            } else {
              return res.status(200).json(person);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "Already liked!",
        });
      }
    });
});

app.post("/api/down", (req, res) => {
  postSchema
    .findOne({ _id: req.body.id, downvote: req.body.email })
    .then((user) => {
      if (!user) {
        postSchema.findOneAndUpdate(
          { _id: req.body.id },
          {
            $push: { downvote: req.body.email },
          },
          { new: true, useFindAndModify: false },
          function (err, person) {
            if (err) {
              return res.status(404).json({
                err: "Email not found!",
              });
            } else {
              return res.status(200).json(person);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "Already disliked!",
        });
      }
    });
});

app.post("/api/comment", (req, res) => {
  postSchema.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { comment: req.body.comment },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/save", (req, res) => {
  userSchema.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: { save_post: req.body.id },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/getSave", (req, res) => {
  console.log(req.body);
  userSchema.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      console.log(user);
      res.status(200).json(user);
    }
  });
});

app.post("/api/getSavePosts", (req, res) => {
  postSchema.find({ _id: req.body.id }).then((user) => {
    if (!user) {
      res.status(400).send("User not found!");
    } else {
      // console.log(req.body);
      res.status(200).json(user);
    }
  });
});

app.post("/api/report", (req, res) => {
  //console.log(req.body)
  const person = new reportSchema({
    user: req.body.user,
    name: req.body.name,
    concern: req.body.concern,
    post_id: req.body.post_id,
    reporter: req.body.reporter,
    email_sub: req.body.email_sub,
    text: req.body.text,
  });

  person
    .save()
    .then((person) => {
      res.status(200).json(person);
      console.log(req.body.text);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/api/getReports", (req, res) => {
  //console.log(req.body);
  reportSchema
    .find({ email_sub: req.body.email, name: req.body.name })
    .then((user) => {
      if (!user) {
        res.status(400).send("User not found!");
      } else {
        // console.log(user);
        res.status(200).json(user);
      }
    });
});

app.post("/api/following", (req, res) => {
  console.log(req.body);
  userSchema.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: { following: req.body.follow },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/follower", (req, res) => {
  userSchema.findOneAndUpdate(
    { email: req.body.follow },
    {
      $push: { follower: req.body.email },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/unfollow", (req, res) => {
  userSchema.findOneAndUpdate(
    { email: req.body.email, following: req.body.follow },
    {
      $pull: { following: req.body.follow },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/remove", (req, res) => {
  userSchema.findOneAndUpdate(
    { email: req.body.email, follower: req.body.follow },
    {
      $pull: { follower: req.body.follow },
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/ignore", (req, res) => {
  reportSchema.findOneAndUpdate(
    { _id: req.body.id },
    {
      ign: true,
    },
    { new: true, useFindAndModify: false },
    function (err, person) {
      if (err) {
        return res.status(404).json({
          err: "Email not found!",
        });
      } else {
        return res.status(200).json(person);
      }
    }
  );
});

app.post("/api/block", (req, res) => {
  gredditSchema
    .findOne({
      email: req.body.email,
      name: req.body.name,
      blocked_users: req.body.user,
    })
    .then((user) => {
      if (!user) {
        gredditSchema.findOneAndUpdate(
          { email: req.body.email, name: req.body.name },
          {
            $push: { blocked_users: req.body.user },
            $pull: { users: req.body.user },
          },
          { new: true, useFindAndModify: false },
          function (err, person) {
            if (err) {
              return res.status(404).json({
                err: "Email not found!",
              });
            } else {
              return res.status(200).json(person);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "Already blocked the user!",
        });
      }
    });
});

app.post("/api/delPos", (req, res) => {
  postSchema.deleteOne({ _id: req.body.post_id }, function (err, person) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.email);
      res.status(200).json(person);
    }
  });
});

app.post("/api/delRep", (req, res) => {
  reportSchema.deleteMany({ post_id: req.body.post_id }, function (err, person) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.email);
      res.status(200).json(person);
    }
  });
});

app.post("/api/delReport", (req, res) => {
  postSchema
    .find({ email: req.body.email, name: req.body.name })
    .then((user) => {
      if (!user) {
        reportSchema.deleteMany({ _id: req.body.id }).then((per) => {
          if (!per) {
            res.status(400).send("User not found!");
          } else {
            console.log(per);
            res.status(200).json(per);
          }
        });
      } else {
        return res.status(404).json({
          err: "Already disliked!",
        });
      }
    });
});

app.post("/api/delPost", (req, res) => {
  postSchema.deleteMany(
    { email: req.body.email, name: req.body.name },
    function (err, person) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body.email);
        res.status(200).json(person);
      }
    }
  );
});

app.listen(5000, function () {
  console.log("Server started on port 4000");
});
