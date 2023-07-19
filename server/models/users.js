const { collection } = require("firebase/firestore");
const { db } = require("../controllers/firebase");
const students = collection(db, "students");

const teachers = collection(db, "teachers");

module.exports = { students, teachers };
