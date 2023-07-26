import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();
  const value = {
    currentUser,
    userType,
    setUserType,
    login,
    parseExcel,
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      console.log(token.token);
      axios
        .post(
          "/login",
          { token: token.token },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          console.log("successfull");
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function login(input, cb) {
    var msg = "success";
    console.log(userType);
    axios
      .post(
        `${userType}/login`,
        { ...input, userType },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data);
        localStorage.setItem("token", JSON.stringify(response.data));
        cb(msg);
      })
      .catch((error) => {
        msg = "Failed to Login!";
        console.log(msg);
        cb(msg);
      });
  }

  function parseExcel(file, cb) {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = xlsx.read(bufferArray, { type: "buffer" });
        const sheetNames = workbook.SheetNames;
        var data = {};
        sheetNames.forEach((sheet) => {
          const ws = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
          if (sheet.toLowerCase() === "details") {
            data = { ...data, details: { ...ws } };
          } else {
            const newobj = JSON.stringify({ ...ws });
            const obj = JSON.parse(`{"${sheet}": ${newobj}}`);
            data = { ...data, ...obj };
          }
        });
        resolve(data);
      };
    });

    promise.then((data) => {
      cb(data);
    });
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
