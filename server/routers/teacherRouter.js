const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { teacherLogin } = require("../controllers/authControllers");
const { uploadStudentData } = require("../controllers/dataControllers");

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/login", teacherLogin);

router.post("/upload", (req, res) => {
  console.log("request received in upload route");
  console.log(req.body);
  return res.status(200).send("okay");
});

module.exports = router;
