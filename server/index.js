const express = require("express");
const app = express();
const cors = require("cors");
const teacherRouter = require("./routers/teacherRouter");
const studentRouter = require("./routers/studentRouter");
const { checkLogin } = require("./controllers/authControllers");
const { test } = require("./controllers/dataControllers");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "https://sbioa-student.vercel.app",
  })
);

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.post("/login", checkLogin);

app.get("/test", test);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("everything okay");
});

app.listen(PORT, function (req, res) {
  console.log(`Server is running on port ${PORT}`);
});
