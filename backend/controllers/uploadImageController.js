// // uploadImageController.js

// const AWS = require("aws-sdk");
// const fs = require("fs");

// // Configure AWS
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Function to upload image to S3 bucket
// async function uploadImage(req, res) {
//   try {
//     const { imagePath, fileName } = req.body; // Assuming the request body contains imagePath and fileName
//     const imageUrl = await uploadImageToS3(imagePath, new Date() + fileName);
//     res.status(200).json({ imageUrl });
//   } catch (err) {
//     console.error("Error uploading image to S3:", err);
//     res.status(500).json({ error: "Error uploading image to S3" });
//   }
// }

// // Function to upload image to S3 bucket
// function uploadImageToS3(imagePath, fileName) {
//   // Read the image file
//   const fileContent = fs.readFileSync(imagePath);

//   // Setting up S3 upload parameters
//   const params = {
//     Bucket: process.env.AWS_BUCKET,
//     Key: fileName, // File name you want to save as in S3
//     Body: fileContent,
//     ContentType: "image/jpeg",
//   };

//   // Return a Promise for better handling
//   return new Promise((resolve, reject) => {
//     // Uploading files to the bucket
//     s3.upload(params, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Location);
//       }
//     });
//   });
// }

// module.exports = {
//   uploadImage,
// };

// uploadImageController.js

// uploadImageController.js

const AWS = require("aws-sdk");
const fs = require("fs");

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload images to S3 bucket
async function uploadImages(req, res) {
  try {
    const images = req.body.images; // Extract images array from request body
    const uploadPromises = images.map(async (image) => {
      const imageUrl = await uploadImageToS3(
        image.imagePath,
        new Date() + image.fileName
      );
      // Optionally, you can delete the local file after uploading
      // fs.unlinkSync(image.imagePath);
      return imageUrl;
    });
    const imageUrls = await Promise.all(uploadPromises);
    res.status(200).json({ imageUrls });
  } catch (err) {
    console.error("Error uploading images to S3:", err);
    res.status(500).json({ error: "Error uploading images to S3" });
  }
}

// Function to upload image to S3 bucket
function uploadImageToS3(imagePath, fileName) {
  // Read the image file
  const fileContent = fs.readFileSync(imagePath);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  // Return a Promise for better handling
  return new Promise((resolve, reject) => {
    // Uploading file to the bucket
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

module.exports = {
  uploadImages,
};
