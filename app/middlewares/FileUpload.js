const multer = require("multer");
const path = require("path");

// module.exports = function () {
  var UPLOADS_FOLDER = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, filename + fileExt);
  },
});

  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only jpg, png and jpeg is supported"));
      }
    },
  });
// };

module.exports = upload;
