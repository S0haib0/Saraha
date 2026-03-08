import multer from "multer";
export let multer_local = () => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
      cb(null);
    },
  });
  return multer({ storage });
};
