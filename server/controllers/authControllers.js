const { doc, getDoc } = require("firebase/firestore");
const { teachers, students } = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.studentLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType;
  const docRef = doc(students, username);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && userType === "student") {
    const data = docSnap.data();
    if (data.roll !== username || data.password !== password) {
      return res.status(401).send("Username or password is wrong");
    }
    const signedKey = jwt.sign(
      {
        userType: "student",
        isLogged: true,
        roll: data.roll,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      token: signedKey,
      roll: data.roll,
      msg: "Student logged in",
    });
  } else {
    return res.status(401).send("User not available!");
  }
};

module.exports.teacherLogin = async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType;
  const docRef = doc(teachers, name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && userType === "teacher") {
    const data = docSnap.data();
    if (data.name !== name || data.password !== password) {
      return res.status(401).send("Password is wrong");
    }
    const signedKey = jwt.sign(
      {
        userType: "teacher",
        isLogged: true,
        name: data.name,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      token: signedKey,
    });
  } else {
    res.status(401).send("User not allowed to login");
  }
};

module.exports.checkLogin = (req, res) => {
  console.log(req.body);
};

module.exports.logout = () => {};
