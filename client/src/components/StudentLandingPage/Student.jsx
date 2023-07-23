import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <>I am a student thaayoli</>
  );
}

export default Student;
