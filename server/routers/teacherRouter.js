const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { teacherLogin } = require("../controllers/authControllers");
const { uploadStudentData } = require("../controllers/dataControllers");

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/login", teacherLogin);

router.post("/upload", uploadStudentData);

module.exports = router;
