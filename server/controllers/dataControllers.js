const { getDoc, doc, collection } = require("firebase/firestore");
const { students } = require("../models/users");
const xlsx = require("xlsx");
const FileReader = require("filereader");

module.exports.getStudentData = async (req, res) => {
  const detailRef = doc(students, req.body.roll);
  const snap1 = await getDoc(detailRef);
};

module.exports.uploadStudentData = (req, res) => {
  console.log("inside upload");
  console.log(req.body);
};

module.exports.test = async (req, res) => {
  const markRef = collection(students, "12BB19", marks);
  const snapshot = await markRef.get();
  const data = {};
  snapshot.forEach((doc) => {
    data = { ...data };
  });
  res.json(docSnap.data());
};
