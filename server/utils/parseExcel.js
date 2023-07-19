const multer = require("multer");
const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "sample-file.xlsx");
  },
});
const xlsx = require("xlsx");

const parseExcel = () => {
  const parsedData = xlsx.readFile("../uploads/sample-file.xlsx");
};
