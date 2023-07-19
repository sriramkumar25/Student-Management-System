const router = require("express").Router();
const { studentLogin } = require("../controllers/authControllers");
const bodyParser = require("body-parser");
const { getStudentData } = require("../controllers/dataControllers");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", studentLogin);

router.get("/data", getStudentData);

module.exports = router;
