import multer from "multer";
import fs from "fs";

export let extentions = {
  image: ["image/jpg", "image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4", "video/webm", "video/ogg"],
  pdf: ["application/pdf"],
};

export let multer_local = (
  { customPath, allowextintension, maxSize } = {
    customPath: "general",
    maxSize: 5,
  },
) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let filesPath = `upload/${customPath}`;
      if (!fs.existsSync(filesPath)) {
        fs.mkdirSync(filesPath, { recursive: true });
      }
      cb(null, `upload/${customPath}`);
    },
    filename: function (req, file, cb) {
      let prefix = Date.now();
      let fileName = `${prefix}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  // let fileFilter = function (req, file, cb) {
  //   if (!allowextintension.includes(file.mimetype)) {
  //     cb("file type not allowed", false);
  //   }
  //   cb(null, true);
  // };

  return multer({
    storage,

    limits: { fileSize: maxSize * 1024 * 1024 },
  });
};
