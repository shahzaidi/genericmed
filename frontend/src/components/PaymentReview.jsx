import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedSippingAddressForLoginUser } from "../redux/actions/shippinAddress";
import { TheContextApi } from "../contextApi/TheContext";
import { createOrderAction } from "../redux/actions/orderActions";
import { useFormik } from "formik";
import {
  guestUserOrderAddressInitialValues,
  guestUserOrderAddressValidationSchema,
} from "../common/Validation";
import HomePageMobile from "./HomepageMobile";

const PaymentReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const {
    authUser,
    subTotal2,
    orderNumber,
    setOrderNumber,
    checkOutPageDone,
    setCheckOutPageDone,
    setPaymentReviewOutPageDone,
  } = useContext(TheContextApi);
  const [editShippingAddress, setEditShippingAddress] = useState(false);
  const [isPaymentMethod, setIsPaymentMethod] = useState(null);
  const handlePaymentChange = (paymentMethod) => {
    setIsPaymentMethod(
      paymentMethod === isPaymentMethod ? null : paymentMethod
    );
    // console.log(isCategoryChecked, "categaroy value");
  };

  console.log(state, isPaymentMethod, "stateState...........////////");

  const dispatch = useDispatch();

  // if (!state || !state.shippingDetails) {
  //   return <div>No shipping details found.</div>;
  // }

  const {
    shippingAddressLoading,
    selectedShippingAddress,
    shippingAddressError,
  } = useSelector(
    (state) => state.getSelectedSippingAddressForLoginUserReducer
  );

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    street: "",
    email: "",
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const {
  //   firstName,
  //   lastName,
  //   street,
  //   city,
  //   state: shippingState,
  //   country,
  //   zipCode,
  //   countryCode,
  //   phone,
  // } = state.shippingDetails;

  console.log(
    selectedShippingAddress,
    "dddddddddhghghghghghghgasdasdasdas",
    state
  );

  const ShippingIcon = () => (
    <div className="step-icon shipping">
      <img src="/assets/ShipPage.png" alt="Shipping Icon" />
    </div>
  );

  const CartIcon = () => (
    <div className="step-icon cart">
      <img src="/assets/cart.png" alt="Cart Icon" />
    </div>
  );

  const OrderConfirmationIcon = () => (
    <div className="step-icon order-confirmation">
      <img src="/assets/CardP.png" alt="Order Confirmation Icon" />
    </div>
  );

  const [currentStep, setCurrentStep] = useState(1);

  const StepIcons = ({ currentStep }) => (
    <div className="step-icons-container">
      <CartIcon />
      <div
        className={`stepp-line ${currentStep >= 2 ? "current-step" : ""}`}
      ></div>
      <ShippingIcon />
      <div
        className={`step-line ${currentStep >= 3 ? "current-step" : ""}`}
      ></div>
      <OrderConfirmationIcon />
    </div>
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    // "Bank Transfer",
    // "PayPal",
    { id: "bankTransfer", name: "Bank Transfer", icon: "bank.png" },
    { id: "paypal", name: "PayPal", icon: "Paypal.png" },
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  useEffect(() => {
    // dispatch(getUserDetails());
    if (authUser) {
      dispatch(getSelectedSippingAddressForLoginUser());
    }
  }, [authUser]);

  useEffect(() => {
    if (state.shippingDetails2) {
      formik?.setFieldValue("firstName", state?.shippingDetails2?.firstName);
      formik?.setFieldValue("lastName", state?.shippingDetails2?.lastName);
      formik?.setFieldValue("email", state?.shippingDetails2?.email);
      formik?.setFieldValue("country", state?.shippingDetails2?.country);
      formik?.setFieldValue("state", state?.shippingDetails2?.state);
      formik?.setFieldValue("city", state?.shippingDetails2?.city);
      formik?.setFieldValue("street", state?.shippingDetails2?.street);
      formik?.setFieldValue("phone", state?.shippingDetails2?.phone);
      formik?.setFieldValue("zipCode", state?.shippingDetails2?.zipCode);
      // setShippingDetails({
      //   firstName: state?.shippingDetails?.firstName,
      //   lastName: state?.shippingDetails?.lastName,
      //   street: state?.shippingDetails?.street,
      //   city: state?.shippingDetails?.city,
      //   state: state?.shippingDetails?.state,
      //   country: state?.shippingDetails?.country,
      //   zipCode: state?.shippingDetails?.zipCode,
      //   countryCode: state?.shippingDetails?.countryCode,
      //   phone: state?.shippingDetails?.phone,
      // });
    }
  }, [state.shippingDetails2]);

  const createOrder = () => {
    setCheckOutPageDone(true);
    if (Object.keys(selectedShippingAddress).length !== 0) {
      dispatch(
        createOrderAction(
          selectedShippingAddress,
          state?.variants,
          state?.orderTotal,
          state?.discountAmount,
          state?.finalAmount,
          isPaymentMethod,
          checkOutPageDone,
          setCheckOutPageDone,
          navigate,
          setPaymentReviewOutPageDone
        )
      );
    } else {
      dispatch(
        createOrderAction(
          formik?.values,
          state?.variants,
          state?.orderTotal,
          state?.discountAmount,
          state?.finalAmount,
          isPaymentMethod,
          checkOutPageDone,
          setCheckOutPageDone,
          navigate,
          setPaymentReviewOutPageDone
        )
      );
    }
  };

  const guestUserOrderAddressSubmit = () => {
    if (
      Object.keys(formik.errors).length === 0
      // &&
      // Object.keys(otpErrors).length === 0
    ) {
      setEditShippingAddress(false);
    }
  };

  const formik = useFormik({
    initialValues: guestUserOrderAddressInitialValues,
    onSubmit: guestUserOrderAddressSubmit,
    validationSchema: guestUserOrderAddressValidationSchema,
  });
  return (
    <div className="detgd">
      <HomePage />
      <HomePageMobile />
      <div className="pycont">
        <StepIcons currentStep={currentStep} />
        {
          Object.keys(selectedShippingAddress).length !== 0 ||
          (!editShippingAddress && formik?.values?.email !== "") ? (
            <div className={`delv ${isEditing ? "active" : ""}`}>
              <legend className="leen">Delivery Address</legend>
              {!authUser && formik?.values?.email !== "" && (
                // <Link to="/checkout" className="nhs">

                <button
                  onClick={() => {
                    setEditShippingAddress(true);
                    console.log(editShippingAddress, "edit");
                  }}
                  className="editin"
                >
                  {" "}
                  <img src="/assets/pen.png" className="pen" alt="Edit Icon" />
                  Edit
                </button>
                // </Link>
              )}
              <div className="namesadress" contentEditable={isEditing}>
                <p>
                  Name:{" "}
                  {authUser ? (
                    <>
                      {selectedShippingAddress?.firstName}{" "}
                      {selectedShippingAddress?.lastName}{" "}
                    </>
                  ) : (
                    <>
                      {formik?.values?.firstName} {formik?.values?.lastName}{" "}
                    </>
                  )}
                </p>
                <p>
                  Phone:{" "}
                  {authUser
                    ? selectedShippingAddress?.phone
                    : formik?.values?.phone}
                </p>
                <p>
                  Country:{" "}
                  {authUser
                    ? selectedShippingAddress?.country
                    : formik?.values?.country}
                </p>
                <p>
                  State:{" "}
                  {authUser
                    ? selectedShippingAddress?.state
                    : formik?.values?.state}{" "}
                </p>
                <p>
                  City:{" "}
                  {authUser
                    ? selectedShippingAddress?.city
                    : formik?.values?.city}
                </p>
                <p>
                  Zip Code:{" "}
                  {authUser
                    ? selectedShippingAddress?.zipCode
                    : formik?.values?.zipCode}
                </p>
                <p>
                  Street:{" "}
                  {authUser
                    ? selectedShippingAddress?.street
                    : formik?.values?.street}
                </p>
              </div>
            </div>
          ) : (
            // editShippingAddress ?
            <div className={`delv ${isEditing ? "active" : ""}`}>
              {formik?.values?.firstName === "" && (
                <legend className="leen">Fill Delivery Address</legend>
              )}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="shipping-formcheck"
              >
                <fieldset>
                  <div className="contname">
                    <div className="shippi-inputck">
                      <label>
                        <span>First Name</span>
                        <input
                          type="full"
                          name="firstName"
                          value={formik?.values?.firstName}
                          onChange={formik.handleChange}
                          className="chknm"
                        />
                      </label>
                      {formik?.touched?.firstName &&
                      formik?.errors?.firstName ? (
                        <p className="errorsig">{formik?.errors?.firstName}</p>
                      ) : null}
                    </div>
                    <div className="shifdfppi-input">
                      <label>
                        <span>Last Name</span>
                        <input
                          type="ladrt"
                          name="lastName"
                          className="lastnm"
                          value={formik?.values?.lastName}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>

                    <div className="shipping-input">
                      <label>
                        <span>Contact Number:</span>
                        <div className="contact-number-input">
                          <select
                            name="countryCode"
                            className="codcheck"
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
                            id="myphone"
                            name="phone"
                            value={formik?.values?.phone}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="addzip">
                    <div className="shipping-input">
                      <label>
                        <span>Email:</span>
                        <input
                          type="email"
                          name="email"
                          className="gmilchk"
                          value={formik?.values?.email}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>
                    <div className="sng-input">
                      <label>
                        <span>Street</span>
                        <input
                          type="addg"
                          name="street"
                          value={formik?.values?.street}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>
                    <div className="shi-input">
                      <label>
                        <span>Zip Code</span>
                        <input
                          type="zip"
                          name="zipCode"
                          value={formik?.values?.zipCode}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="cstate">
                    <div className="shippingt">
                      <label>
                        <span>City</span>
                        <input
                          type="saty"
                          name="city"
                          value={formik?.values?.city}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>

                    <div className="pi-input">
                      <label>
                        <span>State</span>
                        <input
                          type="status"
                          name="state"
                          value={formik?.values?.state}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>
                    <div className="st">
                      <label>
                        <span>Country</span>
                        <input
                          type="countrybes"
                          name="country"
                          id="mycountry"
                          value={formik?.values?.country}
                          onChange={formik.handleChange}
                        />
                      </label>
                    </div>
                  </div>
                  <button onClick={formik?.handleSubmit} className="addupdate">
                    Update
                  </button>
                </fieldset>
              </form>
            </div>
          )
          // : (
          //   <div className={`delv ${isEditing ? "active" : ""}`}>
          //     {formik?.values?.firstName === "" && (
          //       <legend className="leen">Fill Delivery Address</legend>
          //     )}
          //     <form
          //       onSubmit={(e) => e.preventDefault()}
          //       className="shipping-formcheck"
          //     >
          //       <fieldset>
          //         <div className="contname">
          //           <div className="shippi-inputck">
          //             <label>
          //               <span>First Name</span>
          //               <input
          //                 type="full"
          //                 name="firstName"
          //                 value={shippingDetails.firstName}
          //                 onChange={handleChange}
          //                 className="chknm"
          //               />
          //             </label>
          //           </div>
          //           <div className="shifdfppi-input">
          //             <label>
          //               <span>Last Name</span>
          //               <input
          //                 type="ladrt"
          //                 name="lastName"
          //                 className="lastnm"
          //                 value={shippingDetails.lastName}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>

          //           <div className="shipping-input">
          //             <label>
          //               <span>Contact Number:</span>
          //               <div className="contact-number-input">
          //                 <select
          //                   name="countryCode"
          //                   className="codcheck"
          //                   value={shippingDetails.countryCode}
          //                   onChange={handleChange}
          //                 >
          //                   {countryCodes.map((country) => (
          //                     <option key={country.code} value={country.code}>
          //                       {` (${country.code})`}
          //                     </option>
          //                   ))}
          //                 </select>
          //                 <input
          //                   type="tel"
          //                   name="phone"
          //                   value={shippingDetails.phone}
          //                   onChange={handleChange}
          //                 />
          //               </div>
          //             </label>
          //           </div>
          //         </div>

          //         <div className="addzip">
          //           <div className="shipping-input">
          //             <label>
          //               <span>Email:</span>
          //               <input
          //                 type="email"
          //                 name="email"
          //                 className="gmilchk"
          //                 value={shippingDetails.email}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>
          //           <div className="sng-input">
          //             <label>
          //               <span>Street</span>
          //               <input
          //                 type="addg"
          //                 name="street"
          //                 value={shippingDetails.street}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>
          //           <div className="shi-input">
          //             <label>
          //               <span>Zip Code</span>
          //               <input
          //                 type="zip"
          //                 name="zipCode"
          //                 value={shippingDetails.zipCode}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>
          //         </div>

          //         <div className="cstate">
          //           <div className="shippingt">
          //             <label>
          //               <span>City</span>
          //               <input
          //                 type="saty"
          //                 name="city"
          //                 value={shippingDetails.city}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>

          //           <div className="pi-input">
          //             <label>
          //               <span>State</span>
          //               <input
          //                 type="status"
          //                 name="state"
          //                 value={shippingDetails.state}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>
          //           <div className="st">
          //             <label>
          //               <span>Country</span>
          //               <input
          //                 type="countrybes"
          //                 name="country"
          //                 value={shippingDetails.country}
          //                 onChange={handleChange}
          //               />
          //             </label>
          //           </div>
          //         </div>
          //         <button className="addupdate">Save</button>
          //       </fieldset>
          //     </form>
          //    </div>
          // )
        }
        {formik?.values?.firstName === "" &&
        (!selectedShippingAddress || selectedShippingAddress === undefined) ? (
          ""
        ) : (
          <div className="payment-method">
            <legend className="payment"> Payment Method</legend>
            <div className="payment-methoddet">
              {paymentMethods.map((method, i) => (
                <div key={method?.id} className="payment-option">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method?.name}
                      checked={method?.name === isPaymentMethod}
                      onClick={(e) => handlePaymentChange(method?.name)}
                    />
                    <img
                      src={`/assets/${method.icon}`}
                      alt={`${method.name} Icon`}
                    />
                    <span>{method.name}</span>
                  </label>
                </div>
              ))}
              {/* <Link to="/Thankyou" className="continuethnk"> */}
              <button
                // disabled={
                //   formik.values.email !== "" || !selectedShippingAddress
                // }
                onClick={() => createOrder()}
                className="paycontinue"
              >
                Place Order
              </button>
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export default PaymentReview;
