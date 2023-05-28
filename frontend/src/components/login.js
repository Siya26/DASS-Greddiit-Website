import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setName] = useState("");
  const [pass, setPass] = useState("");


  function handleName(event) {
    setName(event.target.value);
  }

  function handlePass(event) {
    setPass(event.target.value);
  }

  const reset = () => {
    setName("");
    setPass("");
  };

  function check(event) {
    
    event.preventDefault();
    if (email !== "" && pass !== "") {
      const person = {
        email: email,
        pass: pass,
      };
      
      axios
        .post("/api/login", person)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem("email", person.email);
          navigate('/profile');
        })
        .catch((err) => {
          alert("Please fill details correctly");
          console.log(err);
        });

      reset();
    }
  }

  return (
    <div>
      <form>
        <input
          className="input-user"
          onChange={handleName}
          type="text"
          placeholder="Email"
          value={email}
          required
          autoFocus
        />
        <br />
        <input
          className="input-pass"
          onChange={handlePass}
          type="password"
          placeholder="Password"
          name="password"
          value={pass}
        />
        <br />
        <button
          className="input-submit"
          onClick={check}
          type="submit"
          disabled={email === "" || pass === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
