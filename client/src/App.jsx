import React from "react";
import Login from "./components/login/Login";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Teacher from "./components/TeacherLandingPage/Teacher";
import { AuthProvider } from "./contexts/AuthContext";
import Student from "./components/StudentLandingPage/Student";
import Navbar from "./components/Navbar/Navbar";

axios.defaults.baseURL = "https://student-management-system-inky.vercel.app/";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
