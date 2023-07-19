import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Teacher() {
  const [file, setFile] = useState();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const formData = new FormData();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    formData.append("file", file);
    axios.post("/upload", formData);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="marks">Choose Excel file for marks: </label>
      <input
        type="file"
        name="marksExcel"
        id="marks"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Submit form</button>
    </form>
  );
}

export default Teacher;
