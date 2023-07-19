import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { userType, setUserType, login, currentUser } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    login(input, () => navigate(`/${userType}`));
  }

  return (
    <>
      <div className="container-fluid">
        <div className="form">
          <button
            className={
              userType === "teacher"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setUserType("teacher")}
          >
            {" "}
            Teacher{" "}
          </button>
          <button
            className={
              userType === "teacher"
                ? "btn btn-outline-primary"
                : "btn btn-primary"
            }
            onClick={() => setUserType("student")}
          >
            {" "}
            Student{" "}
          </button>

          <form className="form-control" onSubmit={handleSubmit}>
            <label className="text-successs" htmlFor="rollNo">
              Username:{" "}
            </label>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                name="username"
                id="rollNo"
                value={input.roll}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
              />
            </div>

            <label className="text-successs" htmlFor="password">
              Password:{" "}
            </label>
            <div className="input-group flex-nowrap">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                aria-labelledby="passwordHelpBlock"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-outline-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
