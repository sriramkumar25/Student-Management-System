import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./teacher.css";

function Teacher() {
  const [file, setFile] = useState();
  const { currentUser, parseExcel } = useAuth();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [click, setClick] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    parseExcel(file, (a) => {
      console.log("value inside parse", a);
      setData(a);
    });
    console.log("clicks: ", click);
    if (click === 2) {
      axios
        .post("teacher/upload", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(() => {
          setSuccessMsg("Success");
        });
    }
  }

  return (
    <div className="container-fluid">
      <div className="form">
        <div className="ale"></div>
        <form onSubmit={handleSubmit} className="form-control">
          <div className="text-success p-3">
            <h2>Upload your File(Please click the Submit button Twice)</h2>
            <h2>
              Clicks: {click}
              {click === 1 && (
                <span className="text-warning">{"   "}Click again!</span>
              )}
            </h2>
          </div>
          <label className="inp-lab" htmlFor="marks"></label>

          <input
            className="icon-input"
            type="file"
            name="marksExcel"
            id="marks"
            accept=".xlsx"
            onChange={(e) => {
              setClick(0);
              setFile(e.target.files[0]);
            }}
          />
          <p>File: {(file && file.name) || "No file uploaded"}</p>
          <button
            type="submit"
            onClick={() => {
              setClick(click + 1);
            }}
            className="btn btn-outline-success"
          >
            Submit document
          </button>
          {successMsg && (
            <p className="text-warning">File Uploaded Successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Teacher;
