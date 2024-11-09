const generateOTP = require("../utils/otpGenerator");
const sendEmail = require("../utils/sendEmail");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const config = require("../config/auth.js");
const mongoose = require("mongoose");

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const OTP = await compareOtp(email, otp, req, res);
  if (OTP === true) {
    try {
      // Check if the user exists in the database
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      user = {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobileNumber: user?.mobileNumber,
      };
      // Generate and sign token
      const token = generateToken(user._id);
      // Return user data and token
      // console.log(user, "user.....................////////////");
      res.status(200).json({
        // _id: user._id,
        // email: user.email,
        user,
        token,
        message: "Login successful",
      });
    } catch (error) {
      console.error(error.message, "error.........../////");
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, mobileNumber, email, otp } = req.body;

  if (!firstName || !lastName || !mobileNumber || !email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      error: "Oops! This email address has already been used!",
    });
  }
  const existingMobileNumber = await User.findOne({ mobileNumber });
  if (existingMobileNumber) {
    return res.status(400).json({
      error: "Oops! This mobile has already been used!",
    });
  }
  const OTP = await compareOtp(email, otp, req, res);
  if (OTP === true) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // if (mobileNumber.length !== 10) {
      //   return res.status(400).json({ message: "Invalid mobile number" });
      // }

      // Save the user with the OTP in the database
      user = new User({
        firstName,
        lastName,
        mobileNumber,
        email,
      });

      // Save the user
      user = await user.save();

      user = {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobileNumber: user?.mobileNumber,
      };

      // Call the loginUser function with email and res object
      const token = generateToken(user._id);
      // Return user data and token
      res.status(200).json({
        // _id: user._id,
        // email: user.email,
        user,
        token,
        message: "User Register successful",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});

const registerAdminUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, isAdmin } = req.body;
  try {
    if (!req.user.isSuperAdmin || !req.user.isAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "You are not super admin" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message:
          "Oops! This email address has already been used! Ask tech team administrator",
      });
    }

    if ((!firstName || !lastName || !email, !isAdmin)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save the user with the OTP in the database
    let user = new User({
      firstName,
      lastName,
      email,
      isAdmin,
    });

    // Save the user
    user = await user.save();

    res.status(200).json({
      success: true,
      message: "User Register successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming your auth middleware sets this
  const { firstName, lastName, mobileNumber, email, location, addresses } =
    req.body;

  try {
    // Find the user by ID and update
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        mobileNumber,
        email,
        location,
        addresses,
      },
      { new: true }
    ); // {new: true} returns the updated document

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Assuming your auth middleware sets this

  try {
    // Attempt to delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));
    const users = await User.find({}).limit(limit).skip(skip); // Fetch all users

    const customersCount = await User.find({}).countDocuments();
    res.status(200).json({ success: true, users, customersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const emailSend = asyncHandler(async (req, res, next) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email" });
    }

    let OTP = generateOTP();
    console.log(OTP, "otttttttt");
    let options = {
      subject: "ETest",
      text: `Your One Time Password is :- ${OTP} \n \n It's valid for next 10 Minutes. \n \n Thanks from GenericMed`,
      //   html: `<b><strong>${OTP}</b>`,
      email: email,
    };

    let emailRes = await sendEmail(options);

    let otp = await Otp.create({
      email,
      otp: OTP,
      isExpire: Date.now() + 2 * 60 * 1000,
    });

    if (emailRes) {
      res.status(200).json({
        success: true,
        message: `Otp send successfully to ${email}`,
      });
    } else {
      res.status(400).json({ success: false, message: `Something went wrong` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const compareOtp = asyncHandler(async (email, otp, req, res) => {
  try {
    console.log(otp, "otp...........................................///////");
    // let { email, otp } = req.body;

    if (otp.length < 6 || otp.length > 6) {
      return res.status(400).json({
        success: false,
        message: "Your Otp must be in 6 digit",
      });
    }

    const otpReceiver = await Otp.findOne({
      email,
      isExpire: { $gt: Date.now() },
      isVerified: false,
    }).sort({
      createdAt: -1,
    });

    if (otpReceiver) {
      if (otpReceiver.otp === otp) {
        otpReceiver.isVerified = true;
        await otpReceiver.save();
        return true;
      } else {
        return res.status(400).json({
          success: false,
          message: "Your Otp is expired or incorrect",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Your Otp has been expired or incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const getAllAdminUsers = asyncHandler(async (req, res) => {
  try {
    // Assuming you want to fetch the first admin user's profile
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));

    const allAdminsCount = await User.find({}).countDocuments();
    const adminUsers = await User.find({ isAdmin: true })
      .limit(limit)
      .skip(skip);

    if (!adminUsers) {
      return res
        .status(404)
        .json({ success: false, message: "Admin user profile not found" });
    }

    res.status(200).json({ success: true, adminUsers, allAdminsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getAdminUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = req.user.id;
    const adminUser = await User.findById(user).findOne({
      isAdmin: true,
    });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user profile not found" });
    }
    res.json(adminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAdminUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a parameter in the URL
    const { firstName, lastName, email, roles } = req.body;

    // Check if the user making the request is authorized to update an admin user
    if (!req.user.isSuperAdmin || !req.user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }

    // Find the user to be updated
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user data
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.roles = roles || user.roles;

    // Save the updated user
    user = await user.save();

    // Return updated user data
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

const deleteAdminUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "User is not an admin" });
    }

    // Perform the delete operation
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { options } = req.body; // Assuming this is an address object
  console.log(userId);
  if (
    !options?.firstName ||
    !options?.lastName ||
    !options?.country ||
    !options?.state ||
    !options?.city ||
    !options?.zipCode ||
    !options?.street ||
    !options?.phone
  ) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }
  // console.log(options, "aaaaa");

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: options } },
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getParticularAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { addressId, ...addressUpdate } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$": addressUpdate } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Address updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you have the user's ID from authentication
  const addressId = req.query.addressId; // Assuming the ID of the address to delete is sent in the request body

  console.log(
    userId,
    addressId,
    "id's.........................................////////"
  );
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(addressId)
  ) {
    return res.status(400).json({ message: "Invalid user or address ID" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId }, // Match the user and the specific address in the addresses array
      { $pull: { addresses: { _id: addressId } } }, // Remove the address with the specified ID
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or address not found",
      });
    }

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
const selectShippingAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { addressId } = req.params;
  console.log(addressId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    user.addresses.forEach((address) => {
      address.isDefault = address._id.toString() === addressId;
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address Selected successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getDefaultAddress = asyncHandler(async (req, res) => {
  try {
    // Assuming you want to fetch the user default address
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const defaultAddress = user.addresses.find((address) => address.isDefault);

    if (!defaultAddress) {
      return res.status(200).json({
        success: true,
        message: "Default address not found",
        defaultAddress: {},
      });
    }

    res.json({ success: true, defaultAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const setUserPermissions = async (req, res) => {
  // const { userId } = req.query;
  const { permissions } = req.body;
  const id = req.params.userId;
  try {
    // Check if user exists
    let user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user permissions
    user.permissions = permissions;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Assign permissions successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserPermissions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const adminUser = await User.findById(userId);
    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const permissions = adminUser?.permissions[0];
    res.status(200).json({ success: true, permissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  emailSend,
  compareOtp,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getAllAdminUsers,
  getAdminUserProfile,
  updateAdminUserProfile,
  deleteAdminUserProfile,
  registerAdminUser,
  addAddress,
  getParticularAddress,
  updateAddress,
  deleteAddress,
  selectShippingAddress,
  getDefaultAddress,
  setUserPermissions,
  getUserPermissions,
};
