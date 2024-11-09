import React, { useState, useContext, useEffect } from "react";
import {
  FaUser,
  FaAddressCard,
  FaShoppingBag,
  FaHeart,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import HomePage from "./HomePage";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  userAddressValidationSchema,
  userAddressInitialValues,
} from "../common/Validation";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAddressAction,
  getUserAddressById,
  updateUserAddressAction,
} from "../redux/actions/userActions";
import Loading from "./Loading";
import { TheContextApi } from "../contextApi/TheContext";

const MyAddress = () => {
  const { userCLoading, setUserCLoading } = useContext(TheContextApi);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { addressLoading, address, addressError } = useSelector(
    (state) => state.getUserAddressReducer
  );

  const countryCodes = [
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

  const handleSave = () => {
    console.log("Data to be saved:", shippingDetails);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserAddressById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(address).length >= 1 && id) {
      formik?.setFieldValue("firstName", address?.firstName);
      formik?.setFieldValue("lastName", address?.lastName);
      formik?.setFieldValue("street", address?.street);
      formik?.setFieldValue("country", address?.country);
      formik?.setFieldValue("state", address?.state);
      formik?.setFieldValue("city", address?.city);
      formik?.setFieldValue("phone", address?.phone);
      formik?.setFieldValue("zipCode", address?.zipCode);
    }
  }, [address]);

  const handleAddress = () => {
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createUserAddressAction(formik?.values, setUserCLoading));
      navigate("/my-profile");
      formik?.setFieldValue("firstName", "");
      formik?.setFieldValue("lastName", "");
      formik?.setFieldValue("city", "");
      formik?.setFieldValue("state", "");
      formik?.setFieldValue("country", "");
      formik?.setFieldValue("zipCode", "");
      formik?.setFieldValue("phone", "");
      formik?.setFieldValue("street", "");
    }
  };

  const handleUpdateAddress = () => {
    if (Object.keys(formik.errors).length === 0) {
      dispatch(updateUserAddressAction(id, formik?.values, setUserCLoading));
      navigate("/my-profile");
      formik?.setFieldValue("firstName", "");
      formik?.setFieldValue("lastName", "");
      formik?.setFieldValue("city", "");
      formik?.setFieldValue("state", "");
      formik?.setFieldValue("country", "");
      formik?.setFieldValue("zipCode", "");
      formik?.setFieldValue("phone", "");
      formik?.setFieldValue("street", "");
    }
  };

  const formik = useFormik({
    initialValues: userAddressInitialValues,
    onSubmit: id ? handleUpdateAddress : handleAddress,
    validationSchema: userAddressValidationSchema,
  });

  return (
    <div className="mypi">
      <HomePage />
      <div className="mypii">
        <SideBar />

        <div className="shippling-form">
          <fieldset>
            <div className="contname">
              <div className="shippifirst-input">
                <label>
                  <span>First Name</span>
                  <input
                    type="full"
                    name="firstName"
                    value={formik?.values?.firstName}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.firstName && formik?.errors?.firstName ? (
                  <p className="errorsigaddress">{formik?.errors?.firstName}</p>
                ) : null}
              </div>

              <div className="shifdfppi-input">
                <label>
                  <span>Last Name</span>
                  <input
                    type="ladrt"
                    name="lastName"
                    id="mylastname"
                    value={formik?.values?.lastName}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.lastName && formik?.errors?.lastName ? (
                  <p className="errorsigaddress">{formik?.errors?.lastName}</p>
                ) : null}
              </div>
              <div className="shipping-input">
                <label>
                  <span>Contact Number:</span>
                  <div className="contact-number-inputtt">
                    <select
                      name="countryCode"
                      className="cod"
                      value={shippingDetails.countryCode}
                      onChange={handleChange}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {` (${country.code})`}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      id='myphone'
                      value={formik?.values?.phone}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.touched?.phone && formik?.errors?.phone ? (
                    <p className="errorsigaddressfor">
                      {formik?.errors?.phone}
                    </p>
                  ) : null}
                </label>
              </div>
            </div>

            <div className="addzip">
              <div className="sng-input">
                <label>
                  <span>Street</span>
                  <input
                    type="addg"
                    name="street"
                    id="mystreet"
                    value={formik?.values?.street}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.street && formik?.errors?.street ? (
                  <p className="errorsigaddress">{formik?.errors?.street}</p>
                ) : null}
              </div>
              <div className="shi-input">
                <label>
                  <span>Zip Code</span>
                  <input
                    type="zip"
                    name="zipCode"
                    className="myzip"
                    value={formik?.values?.zipCode}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.zipCode && formik?.errors?.zipCode ? (
                  <p className="errorsigaddress">{formik?.errors?.zipCode}</p>
                ) : null}
              </div>
            </div>

            <div className="cstate">
              <div className="shippingtadty">
                <label>
                  <span>City</span>
                  <input
                    type="saty"
                    name="city"
                    id="mycity"
                    value={formik?.values?.city}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.city && formik?.errors?.city ? (
                  <p className="errorsigaddress">{formik?.errors?.city}</p>
                ) : null}
              </div>

              <div className="pi-input">
                <label>
                  <span>State</span>
                  <input
                    type="status"
                    name="state"
                    id="stud"
                    value={formik?.values?.state}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.state && formik?.errors?.state ? (
                  <p className="errorsigaddress">{formik?.errors?.state}</p>
                ) : null}
              </div>
              <div className="st">
                <label>
                  <span>Country</span>
                  <input
                    type="countrybes"
                    name="country"
                    id="mytcountry"
                    value={formik?.values?.country}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.country && formik?.errors?.country ? (
                  <p className="errorsigaddress">{formik?.errors?.country}</p>
                ) : null}
              </div>
            </div>
          </fieldset>
          {id ? (
            <button onClick={formik?.handleSubmit} className="addsve">
              {userCLoading ? <Loading /> : "Update"}
            </button>
          ) : (
            <button onClick={formik?.handleSubmit} className="addsve">
              {userCLoading ? <Loading /> : "Save"}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAddress;
