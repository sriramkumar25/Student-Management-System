import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState();

  const { userType, setUserType, login, currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser && currentUser.isLogged) {
      navigate(`/${userType}`);
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    login(input, (msg) => {
      if (msg === "success") {
        setErrMsg("");
        return navigate(`/${userType}`);
      } else {
        setErrMsg(msg);
      }
    });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="form">
          <button
            className={
              userType === "teacher"
                ? "btn btn-primary teacher-btn"
                : "btn btn-outline-primary teacher-btn"
            }
            onClick={() => setUserType("teacher")}
          >
            {" "}
            Teacher{" "}
          </button>
          <button
            className={
              userType === "teacher"
                ? "btn btn-outline-primary student-btn"
                : "btn btn-primary student-btn"
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
            {errMsg && <p className="text-danger">{errMsg}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
