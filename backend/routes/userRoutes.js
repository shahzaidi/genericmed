const express = require("express");
const { protect, admin, superAdmin } = require("../middlewares/authMiddleware");

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  emailSend,
  getAllAdminUsers,
  getAdminUserProfile,
  updateAdminUserProfile,
  deleteAdminUserProfile,
  registerAdminUser,
  compareOtp,
  addAddress,
  getParticularAddress,
  updateAddress,
  deleteAddress,
  selectShippingAddress,
  getDefaultAddress,
  setUserPermissions,
  getUserPermissions,
} = require("../controllers/userController");
const router = express.Router();

// Test Send Email route
router.route("/send/otp/email").post(emailSend);

//verify otp route
router.route("/compareOtp/registerUser").post(compareOtp);

//register user Route
router.route("/user/register").post(registerUser);

//register Admin user Route
router
  .route("/user/register/admin")
  .post(protect, admin, superAdmin, registerAdminUser);

// Login Route
router.route("/user/login").post(loginUser);

// Get users profile Route
router.route("/user/get").get(protect, getUser);

//update user profile Route
router.route("/user/update").put(protect, updateUser);

//delete user Profile Route
router.route("/user/delete/:id").delete(protect, admin, superAdmin, deleteUser);

//Get all users route
router.route("/users/get").get(protect, admin, getAllUsers);

// //Get a specific user by ID (Admin)
router.route("/admin/profile/get").get(protect, admin, getAdminUserProfile);

// //Update user status or role (Admin)
router
  .route("/admin/profile/update")
  .put(protect, admin, superAdmin, updateAdminUserProfile);

// //Delete a user (Admin)
router
  .route("/admin/profile/delete")
  .delete(protect, admin, superAdmin, deleteAdminUserProfile);

// //List all users (Admin)
router
  .route("/admin/profiles/getAll")
  .get(protect, admin, superAdmin, getAllAdminUsers);

// Assuming you have middleware to check authentication
router.route("/user/address/add").post(protect, addAddress);
router
  .route("/user/address/getParticularAddress")
  .get(protect, getParticularAddress);
router.route("/user/address/update").put(protect, updateAddress);
router.route("/user/address/delete").delete(protect, deleteAddress);
// Route to update default address
router
  .route("/users/addresses/setShipAddress/:addressId")
  .put(protect, selectShippingAddress);
// Route to get default address
router
  .route("/users/addresses/getDefaultAddress")
  .get(protect, getDefaultAddress);
// Create or update user permissions
router
  .route("/user/assignPermissions/:userId")
  .put(protect, admin, superAdmin, setUserPermissions);
// Get user permissions
router
  .route("/user/getPermissions/:userId")
  .get(protect, admin, superAdmin, getUserPermissions);

module.exports = router;
