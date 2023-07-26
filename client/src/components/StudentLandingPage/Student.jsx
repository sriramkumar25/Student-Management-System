import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Student.css";
import Row from "./Row";

function Student() {
  const { currentUser } = useAuth();
  const [student, setStudent] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || !currentUser.roll) {
      navigate("/login");
    }
    console.log(currentUser);
    axios
      .post(
        "student/data",
        { roll: currentUser.roll },

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setStudent(response.data);
        console.log(student);
      })
      .catch((err) => console.log(err));
  }, []);
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    //student data is stored in 'student' state
    //Student Profile inside a div container
    //style it like a table of contents
    //it should be able to map with all the contents of all the tests like, class test1, unit test 1 ,etc.
    //return it properly with the use of 'map()' function
    <div>
      <div>
        <div className="cont">
          <div className="photo" />
          <div className="detail">
            {
              <div className="name">
                Name: {student && toTitleCase(student.details.Name)}
              </div>
            }
            <br />
            <div className="rollno">
              Rollno: {student && student.details.RollNo}
            </div>
          </div>
        </div>
        <br />
        <div className="cont2">
          {student &&
            student.marks &&
            Object.keys(student.marks).map((key) => {
              return (
                <div key={crypto.randomUUID()}>
                  <h2 key={crypto.randomUUID()}>{toTitleCase(key)}</h2>
                  <table align="center" key={crypto.randomUUID()}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        {/* <th>Grade</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {student &&
                        Object.keys(student.marks[key]).map((a, i) => {
                          return (
                            <Row
                              key={crypto.randomUUID()}
                              sub={a}
                              idx={i}
                              obj={student.marks[key]}
                              caseChange={toTitleCase}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
      )
    </div>
  );
}

export default Student;
