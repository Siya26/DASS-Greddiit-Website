const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  tel: { type: Number, required: true },
  pass: { type: String, required: true },
  save_post: { type: Array, default: [] },
  follower: { type: Array, default: [] },
  following: { type: Array, default: [] },
});

const model = mongoose.model("user", userSchema);

// const person1 = new model({
//   fname: "Dia",
//   lname: "Pratap",
//   name: "dia_pp",
//   email: "dia@pp.com",
//   age: 18,
//   tel: 9876543231,
//   pass: "iloveyou",
// });

// const person2 = new model({
//   fname: "Rohit",
//   lname: "Reddy",
//   name: "rrr",
//   email: "rssr@sp.com",
//   age: 19,
//   tel: 9182243245,
//   pass: "imissyou",
// });

// const person3 = new model({
//   fname: "Adi",
//   lname: "Gupta",
//   name: "adgpta",
//   email: "adi@gpt.com",
//   age: 20,
//   tel: 9456053321,
//   pass: "ihateyou",
// });

// model.insertMany([person1, person2, person3], function(err){
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully added to the database");
//     }
// });

// model.find(function (err, users) {
//   if (err) {
//     console.log(err);
//   } 
//   else {
//     mongoose.connection.close();

//     users.forEach(function (user) {
//       console.log(user.name);
//     });
//   }
// });

module.exports = model;
