import React from "react";
import Login from "./components/login/Login";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Teacher from "./components/TeacherLandingPage/Teacher";
import { AuthProvider } from "./contexts/AuthContext";
import Student from "./components/StudentLandingPage/Student";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
