import React, { useState } from "react";
import Register from "./register";
import Login from "./login";
import Appbar from "./appbar";
import { useNavigate } from "react-router-dom";
import { elementAcceptingRef } from "@mui/utils";
import { useEffect } from "react";

function Home() {
  const [isDefault, setIsDefault] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/profile");
    }
  });

  function handleIsDefault() {
    setIsDefault(false);
  }

  function Loginfun() {
    setIsDefault(true);
  }

  return (
    <div>
      <Appbar />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="card"
      >
        <div className="container">
          <table>
            <tr>
              <td>
                <button
                  className="logbut"
                  type="submit"
                  onClick={Loginfun}
                  style={{
                    backgroundColor: isDefault ? "#50a3a2" : "white",
                    color: isDefault ? "white" : "#50a3a2",
                  }}
                >
                  Login
                </button>
              </td>
              <td>
                <button
                  className="signbut"
                  type="submit"
                  onClick={handleIsDefault}
                  style={{
                    backgroundColor: isDefault ? "white" : "#50a3a2",
                    color: isDefault ? "#50a3a2" : "white",
                  }}
                >
                  Sign Up!
                </button>
              </td>
            </tr>
          </table>
          {isDefault ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default Home;
