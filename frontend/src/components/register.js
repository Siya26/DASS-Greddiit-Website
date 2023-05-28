import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");

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
    setEmail(event.target.value);
  }

  function handle5(event) {
    setAge(event.target.value);
  }

  function handle6(event) {
    setTel(event.target.value);
  }

  function handle7(event) {
    setPass(event.target.value);
  }

  const reset = () => {
    setFname("");
    setLname("");
    setName("");
    setEmail("");
    setAge("");
    setTel("");
    setPass("");
  };

  function check() {
    //alert("hello");
    if (
      fname !== "" &&
      lname !== "" &&
      name !== "" &&
      email !== "" &&
      age !== "" &&
      tel !== "" &&
      pass !== ""
    ) {
      const person = {
        fname: fname,
        lname: lname,
        name: name,
        email: email,
        age: age,
        tel: tel,
        pass: pass,
      };
      console.log("aefdv")
      axios
        .post("/api/register",person)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      reset();
      navigate("/");
    }
  }

  return (
    <div>
      <form >
        <input
          className="input-reg"
          onChange={handle1}
          type="text"
          placeholder="First Name"
          value={fname}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle2}
          type="text"
          placeholder="Last Name"
          value={lname}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle3}
          type="text"
          placeholder="User Name"
          value={name}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle4}
          type="email"
          placeholder="Email"
          value={email}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle5}
          type="number"
          placeholder="Age"
          value={age}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle6}
          type="tel"
          placeholder="Contact Number"
          value={tel}
        />
        <br />
        <input
          className="input-reg"
          onChange={handle7}
          type="password"
          placeholder="Password"
          value={pass}
        />
        <br />
        <button className="input-submit" onClick={check} type="submit">
          Submit
        </button>
        {/* {console.log("adsc")} */}
      </form>
    </div>
  );
}

export default Register;
