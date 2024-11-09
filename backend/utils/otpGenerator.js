const generateOTP = () => {
  // Declare a digits variable
  // which stores all digits

  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP = OTP + Math.floor(Math.random() * 10);
  }

  console.log(OTP, "otppppppp");
  return OTP;
};

module.exports = generateOTP;
