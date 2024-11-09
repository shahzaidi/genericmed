import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaAddressCard, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import HomePage from "./HomePage";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfileAction,
} from "../redux/actions/userActions";
import SideBar from "./SideBar";
import { useFormik } from "formik";
import {
  updateProfileValidationSchema,
  updateProfileInitialValues,
} from "../common/Validation";
import Loading from "./Loading";
import { TheContextApi } from "../contextApi/TheContext";

const MyProfileEdit = () => {
  const { userCLoading, setUserCLoading } = useContext(TheContextApi);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading, user, userError } = useSelector(
    (state) => state?.getUserDetailsReducer
  );
  const handleChange = (date) => {
    setDOB(date);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleEditImage = () => {
    document.getElementById("profile-image").click();
  };

  const handleSave = () => {
    console.log("Data to be saved:", {
      fullName,
      email,
      contactNumber,
      profileImage,
    });
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(user).length >= 1) {
      formik?.setFieldValue("firstName", user?.firstName);
      formik?.setFieldValue("lastName", user?.lastName);
      formik?.setFieldValue("email", user?.email);
      formik?.setFieldValue("mobileNumber", user?.mobileNumber);
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setContactNumber(user?.mobileNumber);
    }
  }, [user]);

  const handleProfile = () => {
    if (Object.keys(formik.errors).length === 0) {
      dispatch(updateUserProfileAction(formik?.values, setUserCLoading));
      navigate("/my-profile");
      formik?.setFieldValue("firstName", "");
      formik?.setFieldValue("lastName", "");
      formik?.setFieldValue("email", "");
      formik?.setFieldValue("mobileNumber", "");
    }
  };

  const formik = useFormik({
    initialValues: updateProfileInitialValues,
    onSubmit: handleProfile,
    validationSchema: updateProfileValidationSchema,
  });

  return (
    <div className="mypi">
      {/* {userLoading ? <Loading /> : setFirstName(user?.firstName)} */}
      <HomePage />
      <div className="mypii">
        <SideBar />

        {/* hfhdfhdsfhds */}

        <div className="profile-formss-container">
          <div className="left-side">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              src="./asets/profileimg.png"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div className="image-container">
              {profileImage ? (
                <>
                  <img src={URL.createObjectURL(profileImage)} alt="Profile" />
                  <div className="propens" onClick={handleEditImage}>
                    <img src="/assets/penn.png" alt="" srcSet="" />
                  </div>
                </>
              ) : (
                <div className="edit-icon" onClick={handleEditImage}>
                  <img src="/assets/profileimg.png" alt="Default Profile" />
                  <div className="propens">
                    <img src="/assets/penn.png" alt="" srcSet="" />
                  </div>
                </div>
              )}
            </div>
            <div className="right-side">
              <div className="name-input-container">
                <div className="firstprofile">
                  <label htmlFor="first-name">First Name:</label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={formik?.values?.firstName}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik?.touched?.firstName && formik?.errors?.firstName ? (
                  <p className="errorsig">{formik?.errors?.firstName}</p>
                ) : null}

                <div className="lastprofile">
                  <label htmlFor="last-name">Last Name:</label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={formik?.values?.lastName}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik?.touched?.lastName && formik?.errors?.lastName ? (
                  <p className="errorsig">{formik?.errors?.lastName}</p>
                ) : null}
              </div>

              <div className="emailprofile">
                <label htmlFor="email">Email:</label>
                <input
                  type="proemail"
                  id="emailproinfo"
                  name="email"
                  value={formik?.values?.email}
                  onChange={formik.handleChange}
                  disabled
                />
              </div>
              {formik?.touched?.email && formik?.errors?.email ? (
                <p className="errorsig">{formik?.errors?.email}</p>
              ) : null}

              <div className="contactprofi">
                <label htmlFor="contact-number">Contact Number:</label>
                <div className="contact-number-input">
                  <select
                    id="country-code"
                    onChange={(e) => console.log("Selected:", e.target.value)}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="terrl"
                    id="contact-number"
                    name="mobileNumber"
                    value={formik?.values?.mobileNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik?.touched?.mobileNumber &&
                formik?.errors?.mobileNumber ? (
                  <p className="errorsig">{formik?.errors?.mobileNumber}</p>
                ) : null}

                {/* <div className="datbirthpro">
                  <label htmlFor="dob">Date of Birth:</label>

                  <DatePicker
                    id="dob"
                    selected={dob}
                    onChange={handleChange}
                    dateFormat="MM/dd/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    placeholderText="MM/DD/YYYY"
                  />
                </div> */}
              </div>

              <button onClick={formik?.handleSubmit} className="accountsve">
                {userCLoading ? <Loading /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;
