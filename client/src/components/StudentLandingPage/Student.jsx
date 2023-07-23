import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Student.css'

function Student() {
  const { currentUser } = useAuth();
  const [student, setStudent] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
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
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    //student data is stored in 'student' state
    //Student Profile inside a div container
    //style it like a table of contents
    //it should be able to map with all the contents of all the tests like, class test1, unit test 1 ,etc.
    //return it properly with the use of 'map()' function
    <div>
      <div class="cont">
        <image class="photo" />
        <div class="detail">
          <div class="name">
            Name:
          </div>
          <br />
          <div class="rollno">
            Rollno:
          </div>
        </div>
      </div>
      <br />
      <div class="cont2">
        <h2>Test-1 : </h2>
        <table align="center">
          <tr>
            <th>S.No</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Student;
