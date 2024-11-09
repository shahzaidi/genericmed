import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TheContextApi } from "../contextApi/TheContext";
import {
  FaUser,
  FaAddressCard,
  FaShoppingBag,
  FaHeart,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import HomePage from "./HomePage";
import Footer from "./Footer";
import SideBar from "./SideBar";
import SidebarMobile from "./SidebarMobile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  getUserDetails,
  deleteSelectedUserAddress,
} from "../redux/actions/userActions";

const ProfilePage = () => {
  const { loginSignUpLoading, setLoginSignUpLoading } =
    useContext(TheContextApi);
  const [showMyAddress, setShowMyAddress] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading, user, userError } = useSelector(
    (state) => state?.getUserDetailsReducer
  );

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
  const handleToggleAddressForm = () => {
    setShowMyAddress(!showMyAddress);
  };

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    countryCode: "+1",
    contactNumber: "",
  });

  const countryCodes = [
    { code: "+1" },
    { code: "+1" },
    { code: "+44" },
    { code: "+33" },
    { code: "+49" },
    { code: "+91" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressDelete = (id) => {
    let confirm = window.confirm("Are you sure wand to delete address!");
    if (confirm === true) {
      dispatch(deleteSelectedUserAddress(id, setLoginSignUpLoading));
    }
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [loginSignUpLoading]);
  return (
    <div className="mypi">
      <HomePage />

      <div className="mypii">
        <SideBar />
        <SidebarMobile />

        <div className="profile-form-container">
          {userLoading ? (
            <Loading />
          ) : (
            <div className="profileandaddress">
              <div className="leftpro-side">
                <div className="profile-container">
                  <div className="profile-image-container">
                    <img src="/assets/profileimg.png" alt="Profile" />
                  </div>
                  <div className="profile-details-container">
                    <div className="profile-text-edit">
                      <Link to="/myprofileedit">
                        <FontAwesomeIcon icon={faPencilAlt} />

                        <span>Edit</span>
                      </Link>
                    </div>
                    <div className="profile-info">
                      <p>
                        Name: {user?.firstName} {user?.lastName}
                      </p>
                      <p>Email: {user?.email}</p>
                      <p>Phone No: {user?.mobileNumber}</p>
                      {/* <p>Date of Birth: 01/01/1990</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="address">
                <div className="address-heading">
                  <div className="hedee">
                    <h3>My Address</h3>
                  </div>
                  <p className="addadresss">
                    <Link to="/myaddress">
                      <FontAwesomeIcon icon={faEdit} />
                      Add New Address
                    </Link>
                  </p>
                </div>

                <div className="addresscontaineruser">
                  {user && user?.addresses?.length >= 1 ? (
                    user?.addresses?.map((address) => (
                      <div className="address-info">
                        <p>
                          Name: {address?.firstName} {address?.lastName}
                        </p>
                        <p>Country: {address?.country}</p>
                        <p>State: {address?.state}</p>
                        <p>City: {address?.city}</p>
                        <p>Zip Code: {address?.zipCode}</p>
                        <p>Street: {address?.street}</p>
                        <p>Phone: {address?.phone}</p>

                        <div className="address-actions">
                          <div className="addreedit">
                            <FontAwesomeIcon icon={faEdit} />
                            <span
                              onClick={() =>
                                navigate(`/myaddress/${address?._id}`)
                              }
                            >
                              Edit
                            </span>
                          </div>
                          <div className="removeedit">
                            <FontAwesomeIcon icon={faTrash} />
                            {loginSignUpLoading ? (
                              <Loading />
                            ) : (
                              <span
                                onClick={() =>
                                  handleAddressDelete(address?._id)
                                }
                              >
                                Remove
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="emptyadd">No address yet to show! </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
