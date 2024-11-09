const AWS = require("aws-sdk");
const multer = require("multer");

// AWS Config

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const S3 = new AWS.S3(awsConfig);

// Multer Config

let upload = multer({
  limits: 1024 * 1024 * 5,
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      done(null, true);
    } else {
      done("Multer error - File type is not supported", false);
    }
  },
});

// Upload to S3 bucket

const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${Date.now().toString()}/${fileData.originalname}`,
      Body: fileData.buffer,
      ContentType: "image/jpeg",
      // ACL: "public-read", // Set ACL to public-read
    };

    S3.upload(params, (error, data) => {
      if (error) {
        console.log(error, "errorMessage");
        return reject(error);
      }

      console.log(data, "dataMessage");

      return resolve(data);
    });
  });
};

const uploadMultipleImages = (req, res) => {
  // console.log(req.files, "filess./././././//////");

  let imageUrls = []; // Array to store image URLs

  // Map over each file and upload to S3
  Promise.all(req.files.map(uploadToS3))
    .then((results) => {
      // Extract URLs from uploadToS3 results
      imageUrls = results.map((result) => result.Key);

      // Send response with all image URLs
      return res.status(200).json({
        success: true,
        message: "Uploaded successfully",
        imageUrls,
      });
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error.message });
    });
};

const uploadSingleImage = (req, res) => {
  // console.log(req.file, "file./././././//////");

  if (req.file) {
    uploadToS3(req.file)
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: "Uploaded successfully",
          imageUrl: result?.Location,
        });
      })
      .catch((error) => {
        return res.status(500).json({ success: false, message: error });
      });
  }
};

module.exports = {
  uploadSingleImage,
  upload,
  uploadMultipleImages,
};
