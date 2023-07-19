const { doc, getDoc } = require("firebase/firestore");
const { teachers, students } = require("../models/users");

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
    req.user = {
      userType: "student",
      isLogged: true,
      roll: data.roll,
    };
    return res.status(200).json({
      userType: "student",
      isLogged: true,
      roll: data.roll,
    });
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
    req.user = {
      userType: "teacher",
      isLogged: true,
      name: data.name,
    };
    return res.status(200).json({
      userType: "teacher",
      isLogged: true,
      name: data.name,
    });
  } else {
    res.status(401).send("User not allowed to login");
  }
};

module.exports.checkLogin = (req, res) => {
  if (req.user && req.user.isLogged) {
    return res.json({
      userType: req.user.userType,
      isLogged: true,
      username: req.user.username,
    });
  } else {
    return res.json({ isLogged: false, msg: "User not logged in yet" });
  }
};
