import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./teacher.css";
import * as xlsx from "xlsx";

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
    if (click === 2) {
      axios
        .post("teacher/upload", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(() => {
          console.log("success");
        });
    }
  }

  return (
    <div className="container-fluid">
      <div className="form">
        <div className="ale"></div>
        <form onSubmit={handleSubmit} className="form-control">
          <div className="text-success p-3">
            <h2>Upload your File</h2>
          </div>
          <label className="inp-lab" htmlFor="marks"></label>

          <input
            className="icon-input"
            type="file"
            name="marksExcel"
            id="marks"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p>File: {(file && file.name) || "No file uploaded"}</p>
          <button
            type="submit"
            onClick={() => {
              setClick(() => {
                return click + 1;
              });
            }}
            className="btn btn-outline-success"
          >
            Submit document
          </button>
          {successMsg && (
            <p className="text-success">File Uploaded Successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Teacher;
