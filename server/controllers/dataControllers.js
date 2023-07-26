const {
  getDoc,
  doc,
  collection,
  getDocs,
  setDoc,
} = require("firebase/firestore");
const { students } = require("../models/users");
const { db } = require("./firebase");

module.exports.getStudentData = async (req, res) => {
  const detailRef = doc(students, req.body.roll);
  const snap1 = await getDoc(detailRef);
  var data = {};
  if (snap1.exists()) {
    const dat = snap1.data();
    delete dat["password"];
    data = { ...data, details: { ...dat } };
  }
  const markRef = collection(db, "students", req.body.roll, "marks");
  const snap2 = await getDocs(markRef);
  snap2.forEach((doc) => {
    const newobj = JSON.stringify({ ...doc.data() });
    const obj = JSON.parse(`{"${doc.id}": ${newobj}}`);
    data = { ...data, marks: { ...data.marks, ...obj } };
  });
  res.status(200).json(data);
};

module.exports.uploadStudentData = async (req, res) => {
  const details = req.body.details;
  for (let i = 0; i < details.length; i++) {
    const docRef = doc(db, "students", details[i].RollNo);
    await setDoc(docRef, details[i], { merge: true });
  }
  const keys = Object.keys(req.body);
  const marks = keys.filter((a) => a != "details");
  for (let i = 0; i < marks.length; i++) {
    for (let j = 0; j < req.body[marks[i]].length; j++) {
      const markRef = doc(
        db,
        "students",
        req.body[marks[i]][j]["RollNo"],
        "marks",
        `${marks[i]}`
      );
      delete req.body[marks[i]][j]["RollNo"];
      await setDoc(markRef, req.body[marks[i]][j]);
    }
  }
  res.status(200).send("success");
};

module.exports.test = async (req, res) => {
  const markRef = collection(students, "12BB19", "marks");
  const snapshot = await getDocs(markRef);
  var data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.send(data);
};
