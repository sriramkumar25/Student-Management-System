const { getDoc, doc, collection } = require("firebase/firestore");
const { students } = require("../models/users");

module.exports.getStudentData = async (req, res) => {
  const docRef = doc(students, req.body.roll);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return res.json({ msg: "Student not found" });
  }
  const data = docSnap.data();
  delete data["password"];
  res.json(data);
};

module.exports.uploadStudentData = (req, res) => {};

module.exports.test = async (req, res) => {
  const markRef = collection(students, "12BB19", marks);
  const snapshot = await markRef.get();
  const data = {};
  snapshot.forEach((doc) => {
    data = { ...data };
  });
  res.json(docSnap.data());
};
