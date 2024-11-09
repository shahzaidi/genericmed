import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
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

const AddToCartMobile= () => {
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
  const {
    authUser,
    cartLoading,
    setCartLoading,
    cartItemCount,
    setCartItemCount,
    setCouponObject,
    setSubTotal2,
  } = useContext(TheContextApi);
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
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
    console.log(couponObject, "couponObject");
    setSubTotal2(subTotal);
    if (couponObject) {
      setCouponObject({
        discountAmount: couponObject?.discountAmount,
        finalTotal: couponObject?.finalTotal,
      });
    }
  };
  return (
    <div className="car">
   
      <div className="tablecartmob">
        <StepIcons currentStep={currentStep} />
        <div>
   
          <div className="tblemohj">
           
            {cartItemCount <= 0 ? (
              <div className="visiblemptycart">
                <p>No items available in cart</p>
                <img
                  src="/assets/emptycart.png"
                  className="imgemptyvis"
                  alt="Empty Cart"
                />
              </div>
            ) : (
              cartArray &&
              cartArray.map((product, index) =>
                product?.variants
                  .map((item1) => item1)
                  .flat()
                  .map((item, i) => (
                    <div key={index} className="cart-item">
                      <div className="crtity">
                        <div className="imgname">
                        <img
                          src="/assets/Offer1.png"
                          alt={item.name}
                          className="cart-item-image"
                        />

                            <h2>Product Name</h2>
                            </div>
                        <p>{item.name}</p>
                        <span className="varinttotl">${item.variantTotal}</span>
                      </div>
                      <div className="cart-item-quantity">
                        <div className="vrint">
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
                          <p>
                            {cartLoading && variantId === item?._id ? (
                              <Loading />
                            ) : (
                              item?.quantity
                            )}
                          </p>
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
                          className="trh"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 3h8a2 2 0 0 1 2 2v2h4a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9H4a1 1 0 0 1 0-2h4V5a2 2 0 0 1 2-2zM6 9v10h12V9H6zm5 2h2v6h-2V11zm-4 0h2v6H7V11zm8 0h2v6h-2V11z" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
              )
            )}
          
            <p className="subcrt">
              Subtotal: <span>${subTotal}</span>
            </p>
            {couponObject?.discountAmount ? (
              <p className="suboi">
                Coupon: <span>-${couponObject?.discountAmount}</span>
              </p>
            ) : (
              ""
            )}
            <p className="totcrt">
              Total:
              <span className="totgy">
                ${" "}
                {couponObject?.finalTotal ? couponObject?.finalTotal : subTotal}
              </span>
            </p>
            <Link to="/checkout">
              {" "}
              <button className="proceed">Proceed to checkout</button>
            </Link>
            </div>
            </div>
      
       
      </div>
      <FooterMobile/>
    </div>
  );
};

export default AddToCartMobile;
