const express = require("express");
const app = express();
const cors = require("cors");
const teacherRouter = require("./routers/teacherRouter");
const studentRouter = require("./routers/studentRouter");
const { checkLogin } = require("./controllers/authControllers");
const { test } = require("./controllers/dataControllers");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.get("/login", checkLogin);

app.get("/test", test);

const PORT = process.env.PORT;

app.listen(PORT, function (req, res) {
  console.log(`Server is running on port ${PORT}`);
});
