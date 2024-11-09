// // routes/uploadRoutes.js

// const express = require("express");
// const { uploadImage } = require("../controllers/uploadImageController");

// const router = express.Router();

// router.route("/upload").post(uploadImage);

// module.exports = router;
// // /Users/pawankumar/Desktop/Screenshot 2024-0

// routes/uploadRoutes.js

// const express = require("express");
// const { uploadImages } = require("../controllers/uploadImageController");
// const multer = require("multer");

// const router = express.Router();

// // Configure Multer to handle multiple file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post("/upload", upload.array("images", 10), uploadImages);

// module.exports = router;
const express = require("express");
const { uploadImages } = require("../controllers/uploadImageController");
const {
  uploadSingleImage,
  upload,
  uploadMultipleImages,
} = require("../controllers/imageController");

const router = express.Router();

router.post("/upload", uploadImages);

router.post("/upload/single/image", upload.single("image"), uploadSingleImage);

router.post(
  "/upload/multiple/image",
  upload.array("images", 50),
  uploadMultipleImages
);

module.exports = router;
