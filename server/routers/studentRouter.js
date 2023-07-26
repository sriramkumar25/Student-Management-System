const router = require("express").Router();
const { studentLogin } = require("../controllers/authControllers");
const bodyParser = require("body-parser");
const { getStudentData } = require("../controllers/dataControllers");
const { db } = require("../controllers/firebase");
const { getDoc, doc } = require("firebase/firestore");
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", studentLogin);
router.post("/data", getStudentData);

module.exports = router;
