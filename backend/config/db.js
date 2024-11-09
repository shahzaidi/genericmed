const mongoose = require("mongoose");

const dbConnect = async () => {
  const res = await mongoose.connect(process.env.MONGODBURI);

  console.log(`Database connected successfully to ${res.connection.host}`);
  // try {
  //   const res = await mongoose.connect(process.env.MONGODBURI);

  //   console.log(`Database connected successfully to ${res.connection.host}`);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

module.exports = dbConnect;
