import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TheContextApi } from "../contextApi/TheContext";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductIteFromCart,
  getCartItems,
  updateProductItemQuantityInCart,
} from "../redux/actions/cartActions";
import { applyCouponAction } from "../redux/actions/couponActions";

const ProductCartVisible = ({
  cartItems,
  cartVisible,
  setCartVisible,
  handleRemoveFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [couponVisible, setCouponVisible] = useState(true);
  const [couponCode, setCouponCode] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const couponSectionRef = useRef(null);
  const couponButtonRef = useRef(null);

  // const [cartItemCount, setCartItemCount] = useState(0);
  const [variantId, setVariantId] = useState(null);
  const {
    authUser,
    cartLoading,
    setCartLoading,
    cartItemCount,
    setCartItemCount,
    setCartPageDone,
  } = useContext(TheContextApi);
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
  const { cartItemLoading, cartArray, cartError } = useSelector(
    (state) => state.getCartItemsReducer
  );

  let { couponLoading, couponObject, couponError } = useSelector(
    (state) => state.couponReducer
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCouponInput = () => {
    setCouponVisible(!couponVisible);
  };
  const couponInputRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      couponSectionRef.current &&
      !couponSectionRef.current.contains(event.target) &&
      event.target !== couponButtonRef.current
    ) {
      setCouponVisible(false);
    }
  };

  const applyCouponCode = () => {
    if (couponCode === "VALID_COUPON_CODE") {
      setErrorMessage("");
      alert("Coupon applied successfully!");
    } else {
      setErrorMessage("Coupon code invalid.");
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const calculateSubtotal = () => {
    return 0;
  };

  const calculateTotal = () => {
    return 0;
  };

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
      // setCartVisible(true);
    } else {
      dispatch(updateProductItemQuantityInCart(id, variants, setCartLoading));
      // setCartVisible(true);
    }
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
  }, [cartArray, cartLoading]);

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
  return (
    <>
      {cartVisible && (
        <div>
          <div className="overlay" onClick={() => setCartVisible(false)}></div>
          <div className="cartslide">
            <div className="head_crt">
              <button
                onClick={() => setCartVisible(false)}
                className="close-cart-button"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="hrt">
                <img
                  src="/assets/cart.png"
                  className="cart_img"
                  alt=""
                  srcSet=""
                />
                {cartItemCount <= 0 ? (
                  ""
                ) : (
                  <span className="cartadd-badge">{cartItemCount}</span>
                )}
                <h2>Cart</h2>
              </div>
            </div>

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
            {/* <div ref={couponSectionRef} className="coupon-section">
              {couponVisible ? (
                <div>
                  <input
                    type="text"
                    id="ycty"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={handleCouponCodeChange}
                    ref={couponInputRef}
                  />

                  <button
                    className="applyproductcoup"
                    // onClick={applyCouponCode}
                    onClick={() => {
                      dispatch(applyCouponAction(couponCode, subTotal)),
                        setCouponCode("");
                    }}
                  >
                    {couponLoading ? <Loading /> : "Apply"}
                  </button>
                  {errorMessage && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "relative",
                        marginLeft: "6px",
                        top: "4px",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                </div>
              ) : (
                <p
                  ref={couponButtonRef}
                  onClick={toggleCouponInput}
                  className="appi"
                >
                  Apply coupon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="dropdown-icon"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </p>
              )}
            </div> */}

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
              <button onClick={() => setCartPageDone(true)} className="proceed">
                Proceed to checkout
              </button>
            </Link>
            <Link to="/cart">
              {" "}
              <button onClick={() => setCartVisible(false)} className="cartviw">
                View cart
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCartVisible;

{
  /* <div className="gg">
  <button
    onClick={() =>
      handleQuantityChange(product?.productId, item, i, item?.quantity - 1)
    }
  >
    -
  </button>
  {cartLoading && variantId === item?._id ? <Loading /> : item?.quantity}
  <button
    onClick={() =>
      handleQuantityChange(product?.productId, item, i, item?.quantity + 1)
    }
  >
    +
  </button>
</div>; */
}
