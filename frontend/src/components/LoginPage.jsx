import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { TheContextApi } from "../contextApi/TheContext";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/actions/cartActions";

const LoginPage = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);

  let dispatch = useDispatch();

  // const [cartItemCount, setCartItemCount] = useState(0);

  const {
    authUser,
    setAuthUser,
    loginSignUpLoading,
    cartItemCount,
    setCartItemCount,
    checkOutPageDone,
    paymentReviewPageDone,
  } = useContext(TheContextApi);

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname, "location");

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/shopallproducts/${keyword}`);
      // setKeyword("");
    } else {
      navigate(`/shopallproducts`);
      // setKeyword("");
    }
  };
  const handleChange = (e, b) => {
    setKeyword(e.target.value);
    setCount(b);
  };
  useEffect(() => {
    if (keyword !== "" || count === 1) {
      setLoading(true);
      setTimeout(() => {
        handleSearch();
        setLoading(false);
      }, 600);
    }
  }, [keyword, count]);

  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem("user")));
  }, [loginSignUpLoading]);

  ///////////////////////////////////////////////////////////////////////////////

  const { cartItemLoading, cartArray, cartError } = useSelector(
    (state) => state.getCartItemsReducer
  );

  useEffect(() => {
    dispatch(getCartItems());
  }, [cartItemCount, authUser, paymentReviewPageDone]);

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
    // if (cartArray.length !== 0) {
    const cartItem = a().reduce((acc, curr) => acc + curr, 0);

    localStorage.setItem(
      "cartItemCount",
      JSON.stringify(a().reduce((acc, curr) => acc + curr, 0))
    );
    // }
  }, [
    cartItemCount,
    cartArray,
    authUser,
    checkOutPageDone,
    paymentReviewPageDone,
  ]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // if (cartItemCount === 0) {
    const count = JSON.parse(localStorage.getItem("cartItemCount"));
    setCartItemCount(count);
    // }
  }, [
    cartItemCount,
    authUser,
    cartArray,
    checkOutPageDone,
    paymentReviewPageDone,
  ]);

  console.log(authUser, "keyword........///////////");

  return (
    <div className="login-page">
      <Link to="/">
        <div className="logo-container">
          <img src="/assets/Logo.png" alt="Logo" />
        </div>
      </Link>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search for Product"
          id="inputt"
          className={searchActive ? "active" : ""}
          onChange={(e) => handleChange(e, 1)}
        />
        {loading ? (
          <Loading />
        ) : (
          <img
            src="/assets/searchh.png"
            className="icon-search"
            alt=""
            srcSet=""
            // onClick={}
          />
        )}
      </div>
      <div className="login-container">
        {localStorage?.length !== 0 && authUser && authUser !== null ? (
          // <Link to="#">{`${authUser?.firstName} ${authUser?.lastName}`}</Link>
          ""
        ) : (
          <Link to="/signup">
            <button type="button" className="Signup">
              Sign Up / Log In
            </button>
          </Link>
        )}
      </div>
      <div className="cart-container">
        <Link to="/cart">
          <img src="/assets/cart.png" alt="Cart" />
          {cartItemCount <= 0 ? (
            ""
          ) : (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </Link>

        <Link to={authUser ? "/wishlist" : "/signup"}>
          <img src="/assets/wishlist.png" alt="Cart" />
        </Link>
      </div>
      {authUser && authUser !== null ? (
        <div className="myprof">
          <Link to="/my-profile">
            <div className="usernameprofile">
              <img src="/assets/userpr.png" alt="Profile" />
              <span className="nameuser">{`${authUser?.firstName} ${authUser?.lastName}`}</span>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginPage;
