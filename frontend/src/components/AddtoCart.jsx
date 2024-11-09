import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductItemInCart,
  deleteProductIteFromCart,
  getCartItems,
  updateProductItemQuantityInCart,
} from "../redux/actions/cartActions";
import { TheContextApi } from "../contextApi/TheContext";
import Loading from "./Loading";
import { applyCouponAction } from "../redux/actions/couponActions";
import AddToCartMobile from "./AddtoCartMobile";
import HomePageMobile from "./HomepageMobile";

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

const AddToCartPage = () => {
  const [productss, setProductss] = useState([
    {
      image: "/assets/Cart1.png",
      name: "CalmEase Capsules",
      info: "Esential Nutrients for Daily Vitality",
      price: 50,
      quantity: 1,
    },
    {
      image: "/assets/Cart2.png",
      name: "VitalVibes Multivitamins",
      info: "Fuel your day with essential nutrients",
      price: 40,
      quantity: 1,
    },
    {
      image: "/assets/Cart3.png",
      name: "PainRelief Max Tablets",
      info: "Fast-acting pain relief tablets",
      price: 30,
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [variantId, setVariantId] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const {
    authUser,
    cartLoading,
    setCartLoading,
    cartItemCount,
    setCartItemCount,
    setCouponObject,
    setSubTotal2,
    setCartPageDone,
  } = useContext(TheContextApi);
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItemLoading, cartArray, cartError } = useSelector(
    (state) => state.getCartItemsReducer
  );

  let { couponLoading, couponObject, couponError } = useSelector(
    (state) => state.couponReducer
  );

  // couponLoading ? couponLoading : (couponLoading = false),
  //   couponObject ? couponObject : (couponObject = {}),
  //   couponError ? couponError : (couponError = "");

  const handleQuantityChange = (id, item, index, quantity) => {
    // console.log(
    //   id,
    //   item,
    //   index,
    //   quantity,
    //   Number(item?.price * quantity),
    //   "itiq"
    // );
    // console.log(Number(item?.price * quantity));
    setVariantId(item?._id);

    let variants = [
      {
        name: item?.name,
        price: item?.price,
        quantity,
        variantTotal: Number(item?.price * quantity),
      },
    ];
    console.log(
      id,
      item,
      index,
      quantity,
      variants,
      Number(item?.price * quantity),
      "itiq"
    );

    if (quantity < 1) {
      dispatch(deleteProductIteFromCart(id, item?._id, setCartLoading));
    } else {
      dispatch(updateProductItemQuantityInCart(id, variants, setCartLoading));
    }
  };

  // const handleQuantityChange = (index, newQuantity) => {
  //   newQuantity = Math.max(1, newQuantity);

  //   const updatedProducts = [...products];
  //   updatedProducts[index].quantity = newQuantity;
  //   setProducts(updatedProducts);
  // };
  const calculateProductTotal = (product) => {
    return product?.price * product?.quantity;
  };

  const calculateOfferDiscount = () => {
    return productss.reduce((offerDiscount, product) => {
      return (
        offerDiscount +
        (product.price - product.price * (1 - product.quantity / 10))
      );
    }, 0);
  };

  const calculateCouponDiscount = () => {
    if (appliedCoupon) {
      return (calculateSubtotal() * appliedCoupon.discount) / 100;
    }
    return 0;
  };

  const calculateSubtotal = () => {
    return productss.reduce((subtotal, product) => {
      return subtotal + calculateProductTotal(product);
    }, 0);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "YOUR_COUPON_CODE") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      console.log("Coupon applied successfully!");
    } else {
      setAppliedCoupon(null);
      console.log("Invalid coupon code");
    }
  };

  const calculateSubTotal = (item) => {
    let itemSub = item?.price * item?.quantity;
    setItemTotal(...itemTotal);
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [variantId, cartLoading]);

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

  let a = () => {
    let b = cartArray.map(
      (product, index) =>
        product?.variants.map((item1, i) => item1).flat().length
    );

    let d = b.filter((c) => c !== 0);

    return d;
  };

  console.log(
    a().reduce((acc, curr) => acc + curr, 0),
    cartItemCount,
    "cartArray"
  );

  useEffect(() => {
    if (cartArray.length !== 0) {
      const cartItem = a().reduce((acc, curr) => acc + curr, 0);

      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(a().reduce((acc, curr) => acc + curr, 0))
      );
    }
  }, [variantId, cartLoading, cartArray]);

  useEffect(() => {
    const count = JSON.parse(localStorage.getItem("cartItemCount"));
    setCartItemCount(count);
  }, [variantId, cartLoading, cartArray]);

  console.log(couponError, couponLoading, couponObject, "coupon states");

  let checkOut = (subTotal) => {
    if (cartArray?.length <= 0 || subTotal === 0) {
      console.log(couponObject, "couponObject");
      setPopUp(true);
      return;
    }
    console.log(couponObject, "couponObject");
    setSubTotal2(subTotal);
    if (couponObject) {
      setCouponObject({
        discountAmount: couponObject?.discountAmount,
        finalTotal: couponObject?.finalTotal,
      });
    }
    setCartPageDone(true);
    navigate("/checkout");
  };
  return (
    <div className="carttt">
      <HomePage />
      <HomePageMobile />
      <AddToCartMobile />
      <div className="tablecart">
        <StepIcons currentStep={currentStep} />

        <div className="cartprodet">
          {cartItemCount <= 0 ? (
            <div className="empty-cart">
              <p>No items available in cart</p>
              <img
                src="/assets/emptycart.png"
                className="imgempty"
                alt="Empty Cart"
              />
            </div>
          ) : (
            <table className="carttble">
              <thead>
                <tr className="listpro">
                  <th>Product</th>
                  <th>Pack Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItemLoading ? (
                  <Loading />
                ) : cartError ? (
                  <p>{cartError}</p>
                ) : (
                  cartArray.map((product, index) =>
                    product?.variants
                      .map((item1) => item1)
                      .flat()
                      .map((item, i) => (
                        <tr key={index} className="align">
                          <td className="infdks">
                            <div className="crt">
                              <img
                                src={productss[0]?.image}
                                alt={productss[0]?.name}
                              />

                              <h2>{product?.productName}</h2>
                            </div>
                          </td>
                          <td className="packsiz">
                            <div className="tii">
                              <h2>{item?.name}</h2>
                              {/* <p className="cartproin">{product.info}</p> */}
                            </div>
                          </td>
                          <td className="priceof">
                            {/* <p>$100</p> */}
                            <p className="ff"></p>${item?.price}
                          </td>
                          <td className="cartquan">
                            <div className="gg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product?.productId,
                                    item,
                                    i,
                                    item?.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>
                              {cartLoading && variantId === item?._id ? (
                                <Loading />
                              ) : (
                                item?.quantity
                              )}
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product?.productId,
                                    item,
                                    i,
                                    item?.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          {/* <td className="total">${calculateProductTotal(item)}</td> */}
                          <td className="total">${item?.variantTotal}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() =>
                                dispatch(
                                  deleteProductIteFromCart(
                                    product?.productId,
                                    item?._id,
                                    setCartLoading
                                  )
                                )
                              }
                              className="removeproduct"
                            >
                              REMOVE
                            </button>
                          </td>
                        </tr>
                      ))
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="coupons_total">
          {/* <div className="coupons">
            <input
              type="cou"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={() => {
                dispatch(applyCouponAction(couponCode, subTotal)),
                  setCouponCode("");
              }}
              className="appy"
            >
              {couponLoading ? <Loading /> : "Apply Coupon"}
            </button>
          </div> */}

          <div className="righttotal">
            <div className="tp">
              <label>Subtotal</label>
              {/* <span>${calculateSubtotal()}</span> */}
              <span>${subTotal}</span>
            </div>
            {/* <div className="of_d">
              <label>Offer </label>
              <span>-${calculateOfferDiscount()}</span>
            </div> */}
            {/* {couponObject?.discountAmount ? (
              <div className="cd">
                <label>Coupon </label>
                <span>-${couponObject?.discountAmount}</span>
              </div>
            ) : (
              ""
            )} */}
            <div className="subtot">
              <label>Total Price :</label>
              <span className="carttot">${subTotal}</span>
            </div>

            {/* <Link to="/checkout" className="co"> */}
            <button
              className="checkout"
              // disabled={cartArray.length <= 0}
              onClick={() => checkOut(subTotal)}
            >
              Check Out
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Footer />

      {popUp && (
        <div className="popupd">
          <div className="popup-inner">
            <button
              className="close-btn"
              onClick={() => {
                setPopUp(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className="hedytu">Alert</h2>
            <form id="ishl">
              <div className="fyousure">
                Cart is empty, Please buy something.
              </div>

              <div className="butonfd">
                <button
                  onClick={() => {
                    setPopUp(false);
                  }}
                  type="submit"
                  className="couponcancel"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
