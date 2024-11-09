import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEdit,
  faTrash,
  faPlus,
  faPencilAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { TheContextApi } from "../contextApi/TheContext";
import Loading from "./Loading";

import { applyCouponAction } from "../redux/actions/couponActions";
import { getUserDetails } from "../redux/actions/userActions";
import {
  getSelectedSippingAddressForLoginUser,
  selectSippingAddressForLoginUser,
} from "../redux/actions/shippinAddress";
import { getCartItems } from "../redux/actions/cartActions";
import {
  guestUserOrderAddressInitialValues,
  guestUserOrderAddressValidationSchema,
} from "../common/Validation";
import { useFormik } from "formik";
import HomePageMobile from "./HomepageMobile";

const ShippingAddressForm = () => {
  let shippingDetails2 = {};
  let variants = [];
  const [couponCode, setCouponCode] = useState("");
  const [formikError, setFormikError] = useState(false);
  const {
    authUser,
    subTotal2,
    addressState,
    setAddressState,
    cartPageDone,
    setCartPageDone,
    checkOutPageDone,
    setCheckOutPageDone,
  } = useContext(TheContextApi);
  const { userLoading, user, userError } = useSelector(
    (state) => state?.getUserDetailsReducer
  );

  let { couponLoading, couponObject, couponError } = useSelector(
    (state) => state.couponReducer
  );

  const dispatch = useDispatch();

  const { cartItemLoading, cartArray, cartError } = useSelector(
    (state) => state.getCartItemsReducer
  );

  const {
    shippingAddressLoading,
    selectedShippingAddress,
    shippingAddressError,
  } = useSelector(
    (state) => state.getSelectedSippingAddressForLoginUserReducer
  );

  console.log(
    Object.keys(selectedShippingAddress).length,
    formikError,
    cartArray.length,
    "abcdefghijklmnopqrstuvwxyz"
  );

  const ShippingIcon = () => (
    <div className="step-icon shipping">
      <img src="/assets/ShipPage.png" alt="Shipping Icon" />
    </div>
  );
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const StepIcons = ({ currentStep }) => {
    return (
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
  };

  const [currentStep, setCurrentStep] = useState(1);

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    countryCode: "+1",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleContinue = () => {
    if (Array.isArray(cartArray)) {
      variants = cartArray.reduce((acc, variant) => {
        let { _id, createdAt, updatedAt, ...rest } = variant;
        acc.push(rest);
        return acc;
      }, []);
    }

    variants = variants.map((product) => ({
      ...product,
      variants: product.variants.map((variant) => {
        const { _id, ...rest } = variant;
        return rest;
      }),
    }));

    if (Object.keys(couponObject).length !== 0) {
      navigate("/paymentreview", {
        state: {
          shippingDetails2: formik?.values,

          couponObject,
          variants,
          orderTotal: subTotal,
          finalAmount: couponObject?.finalTotal
            ? couponObject?.finalTotal
            : subTotal,
          discountAmount: couponObject?.discountAmount
            ? couponObject?.discountAmount
            : 0,
        },
      });
      setCheckOutPageDone(true);
    } else {
      navigate("/paymentreview", {
        state: {
          shippingDetails2: formik?.values,

          variants,
          orderTotal: subTotal,
          finalAmount: couponObject?.finalTotal
            ? couponObject?.finalTotal
            : subTotal,
          discountAmount: couponObject?.discountAmount
            ? couponObject?.discountAmount
            : 0,
        },
      });
      setCheckOutPageDone(true);
    }
    setCartPageDone(!cartPageDone);
  };

  console.log(couponObject, "couponObject");
  const [productss, setProductss] = useState([
    {
      id: 1,
      image: "/assets/Cart1.png",
      title: "CalmEase Capsules",
      info: "Esential Nutrients for Daily Vitality",
      packsize: "abc",
      price: 50,
      quantity: 1,
    },
    {
      id: 2,
      image: "/assets/Cart2.png",
      title: "VitalVibes Multivitamins njsbdxshcbhbchcbh",
      info: "Fuel your day with essential nutrients",
      packsize: "abc",
      price: 40,
      quantity: 2,
    },
    {
      id: 3,
      image: "/assets/Cart3.png",
      title: "PainRelief Max Tablets",
      info: "PainRelief Max Tablets",
      packsize: "abc",
      price: 30,
      quantity: 3,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: Math.max(1, newQuantity) }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const calculateProductTotal = (product) => {
    return product.price * product.quantity;
  };

  // const calculateSubtotal = () => {
  //   return products.reduce(
  //     (subtotal, product) => subtotal + calculateProductTotal(product),
  //     0
  //   );
  // };

  const [subTotal, setSubTotal] = useState(0);
  // const [appliedCoupon, setAppliedCoupon] = useState(null);

  // const calculateOfferDiscount = () => {
  //   return products.reduce((offerDiscount, product) => {
  //     return (
  //       offerDiscount +
  //       (product.price - product.price * (1 - product.quantity / 10))
  //     );
  //   }, 0);
  // };
  // const calculateCouponDiscount = () => {
  //   if (appliedCoupon) {
  //     return (calculateSubtotal() * appliedCoupon.discount) / 100;
  //   }
  //   return 0;
  // };

  const countryCodes = [
    { code: "+1" },
    { code: "+1" },
    { code: "+44" },
    { code: "+33" },
    { code: "+49" },
    { code: "+91" },
  ];

  useEffect(() => {
    if (cartArray.length > 0) {
      const total = cartArray.reduce((acc, product) => {
        const productTotal = product.variants.reduce((productAcc, variant) => {
          return (productAcc += variant?.variantTotal);
        }, 0);
        return acc + productTotal;
      }, 0);
      setSubTotal(total);
    }
  }, [cartArray]);

  useEffect(() => {
    if (authUser) {
      dispatch(getUserDetails());
      dispatch(getSelectedSippingAddressForLoginUser());
    }

    dispatch(getCartItems());
  }, [authUser, dispatch, addressState]);

  // useEffect(() => {
  //   if (cartArray) {
  //     variants = cartArray.map((product, index) =>
  //       product?.variants
  //         .map((item1) => item1)
  //         .flat()
  //         .map((item, i) => {
  //           return item;
  //         })
  //     );
  //   }
  // }, [cartArray]);

  // useEffect(() => {
  //   if (cartArray) {
  //     variants = cartArray.flatMap((product) => product?.variants ?? []);
  //   }
  // }, [cartArray]);

  const guestUserOrderAddressSubmit = () => {
    if (
      Object.keys(formik.errors).length === 0
      // &&
      // Object.keys(otpErrors).length === 0
    ) {
      setFormikError(true);
      formik?.values;
    }
  };

  const formik = useFormik({
    initialValues: guestUserOrderAddressInitialValues,
    onSubmit: guestUserOrderAddressSubmit,
    validationSchema: guestUserOrderAddressValidationSchema,
  });
  console.log(formikError, selectedShippingAddress, formik?.values, "aspsds");
  return (
    <div className="chk">
      <HomePage />
      <HomePageMobile />
      <div className="oj">
        <StepIcons currentStep={currentStep} />
        {authUser && (
          <>
            <legend className="myaddsumm">My Address</legend>

            <div className="address-summary">
              <div className="addresscontainerweb">
                {user && user?.addresses?.length >= 1 ? (
                  user?.addresses?.map((address) => (
                    <div className="address-info">
                      <p>
                        Name: {address?.firstName}
                        {address?.lastName}
                      </p>
                      <p>Phone: {address?.phone}</p>
                      <p>Country: {address?.country}</p>
                      <p>State: {address?.state} </p>
                      <p>City: {address?.city}</p>
                      <p>Zip Code: {address?.zipCode}</p>
                      <p>Street: {address?.street}</p>

                      <div className="address-actions">
                        <div className="editcheck">
                          <FontAwesomeIcon icon={faEdit} />
                          <span
                            onClick={() =>
                              navigate(`/myaddress/${address?._id}`)
                            }
                          >
                            Edit
                          </span>
                        </div>
                        <div className="deliveryher">
                          <FontAwesomeIcon icon={faTruck} />
                          <span
                            onClick={() =>
                              dispatch(
                                selectSippingAddressForLoginUser(
                                  address?._id,
                                  addressState,
                                  setAddressState
                                )
                              )
                            }
                          >
                            {selectedShippingAddress &&
                            selectedShippingAddress?._id === address?._id
                              ? "Selected"
                              : "Delivery Here"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <Link to="/myaddress" className="nhs">
                      {" "}
                      <button className="adddress">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} />
                        Add New Address
                      </button>
                    </Link>
                    <div className="emptyadd">No address yet to show! </div>
                  </div>
                )}

                {/* <div className="address-info">
              <p>New York</p>
              <p>John Doe</p>
              <p>
                Marcus Aloe, Shaded Streets, front of denim garden, lane04, New
                York. NY1004,USA{" "}
              </p>
              <p>+1 254 455 5666</p>

              <div className="address-actions">
                <div className="editcheck">
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </div>
                <div className="deliveryher">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Delivery Here</span>
                </div>
              </div>
            </div> */}

                {/* <div className="address-info">
              <p>New York</p>
              <p>John Doe</p>
              <p>
                Marcus Aloe, Shaded Streets, front of denim garden, lane04, New
                York. NY1004,USA{" "}
              </p>
              <p>+1 254 455 5666</p>

              <div className="address-actions">
                <div className="editcheck">
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </div>
                <div className="deliveryher">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Delivery Here</span>
                </div>
              </div>
            </div> */}

                {/* <div className="address-info">
              <p>New York</p>
              <p>John Doe</p>
              <p>
                Marcus Aloe, Shaded Streets, front of denim garden, lane04, New
                York. NY1004,USA{" "}
              </p>
              <p>+1 254 455 5666</p>

              <div className="address-actions">
                <div className="editcheck">
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </div>
                <div className="deliveryher">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Delivery Here</span>
                </div>
              </div>
            </div> */}
              </div>
            </div>
          </>
        )}
        {!authUser && (
          <form onSubmit={(e) => e.preventDefault()} className="shipping-form">
            <fieldset>
              <legend>Shipping Address</legend>

              <div className="contname">
                <div className="shippi-input">
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
                    <p className="errorsig">{formik?.errors?.firstName}</p>
                  ) : null}
                </div>
                <div className="shifdfppi-input">
                  <label>
                    <span>Last Name</span>
                    <input
                      type="ladrt"
                      name="lastName"
                      value={formik?.values?.lastName}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.lastName && formik?.errors?.lastName ? (
                    <p className="errorsig">{formik?.errors?.lastName}</p>
                  ) : null}
                </div>
                <div className="shipping-input">
                  <label>
                    <span>Contact Number:</span>
                    <div className="contact-number-input">
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
                        value={formik?.values?.phone}
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik?.touched?.phone && formik?.errors?.phone ? (
                      <p className="errorsig">{formik?.errors?.phone}</p>
                    ) : null}
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
                  {formik?.touched?.email && formik?.errors?.email ? (
                    <p className="errorsig">{formik?.errors?.email}</p>
                  ) : null}
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
                  {formik?.touched?.street && formik?.errors?.street ? (
                    <p className="errorsig">{formik?.errors?.street}</p>
                  ) : null}
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
                  {formik?.touched?.zipCode && formik?.errors?.zipCode ? (
                    <p className="errorsig">{formik?.errors?.zipCode}</p>
                  ) : null}
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
                  {formik?.touched?.city && formik?.errors?.city ? (
                    <p className="errorsig">{formik?.errors?.city}</p>
                  ) : null}
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
                  {formik?.touched?.state && formik?.errors?.state ? (
                    <p className="errorsig">{formik?.errors?.state}</p>
                  ) : null}
                </div>
                <div className="st">
                  <label>
                    <span>Country</span>
                    <input
                      type="countrybes"
                      name="country"
                      value={formik?.values?.country}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.country && formik?.errors?.country ? (
                    <p className="errorsig">{formik?.errors?.country}</p>
                  ) : null}
                </div>
              </div>
            </fieldset>
            {!formikError === true && (
              <button onClick={formik?.handleSubmit} className="addsvechk">
                Save
              </button>
            )}
          </form>
        )}
        <div className="order-summary">
          <legend className="summ">Order Summary</legend>
          <div className="alldiv">
            <fieldset>
              <table className="orderscroller">
                <tbody>
                  {cartItemLoading ? (
                    <Loading />
                  ) : cartError ? (
                    <p>{cartError}</p>
                  ) : cartArray.length <= 0 ? (
                    <div className="orderempty">
                      <p>No Item in Cart to show!</p>
                    </div>
                  ) : (
                    cartArray.map((product, index) =>
                      product?.variants
                        .map((item1) => item1)
                        .flat()
                        .map((item, i) => (
                          <tr key={product.id} className="trr">
                            <td className="ristb">
                              <div className="product-information">
                                <img
                                  src={productss[i]?.image}
                                  alt={productss[i]?.name}
                                />

                                <div className="mobflx">
                                  <div className="tietbutton">
                                    <h2>{product?.productName}</h2>
                                    {/* <p>{product.info}</p> */}

                                    <div className="quantt">
                                      {/* <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>-</button>
                        {product.quantity}
                        <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button> */}
                                      <span>Quantity:</span>{" "}
                                      <p>{item?.quantity}</p>
                                    </div>
                                    {/* <button onClick={() => handleRemoveProduct(product.id)}className='removeproduct'>REMOVE</button> */}
                                  </div>
                                  <td className="pck">
                                    {" "}
                                    <h2>{item?.name}</h2>
                                  </td>
                                  <td className="hg">${item?.variantTotal}</td>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                    )
                  )}
                </tbody>
              </table>
            </fieldset>
          </div>
        </div>
        <div className="couponschck">
          <input
            type="cou"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={() => {
              authUser
                ? dispatch(applyCouponAction(couponCode, subTotal))
                : navigate("/signup"),
                setCouponCode("");
            }}
            className="appy"
          >
            {couponLoading ? <Loading /> : "Apply Coupon"}
          </button>
        </div>
        <div className="righttotalorder">
          <div className="tp">
            <label>Subtotal</label>
            {/* <span>${calculateSubtotal()}</span> */}
            {/* <span>${subTotal}</span> */}
            <span>${subTotal}</span>
          </div>
          {/* <div className="of_d">
              <label>Offer </label>
              <span>-${calculateOfferDiscount()}</span>
            </div> */}
          {couponObject?.discountAmount ? (
            <div className="cd">
              <label>Coupon </label>
              <span>-${couponObject?.discountAmount}</span>
            </div>
          ) : (
            ""
          )}
          <div className="cd">
            <label>Total Price :</label>
            {/* <span className="carttot">
              $
              {calculateSubtotal() -
                calculateOfferDiscount() -
                calculateCouponDiscount()}
            </span> */}
            <span className="cartot">
              ${couponObject?.finalTotal ? couponObject?.finalTotal : subTotal}
            </span>
          </div>
        </div>
        {(Object.keys(selectedShippingAddress).length !== 0 ||
          formikError === true) && (
          <button
            className="contineue"
            // disabled={
            //   Object.keys(selectedShippingAddress).length !== 0 ||
            //   !formikError === true ||
            //   !cartArray.length <= 0
            // }
            onClick={handleContinue}
          >
            Continue
          </button>
        )}
      </div>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export default ShippingAddressForm;
