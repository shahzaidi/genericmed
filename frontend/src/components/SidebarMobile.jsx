import React, { useContext } from "react";
import { FaUser, FaAddressCard, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TheContextApi } from "../contextApi/TheContext";

const SidebarMobile = () => {
  const { authUser, setAuthUser, loginSignUpLoading } =
    useContext(TheContextApi);
  const navigate = useNavigate();
  let signOut = async () => {
    try {
      await localStorage.clear();
      navigate("/");
      if (localStorage.length === 0) {
        setAuthUser(null);
        toast.success("Logged out Successfully", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      // Handle error
      if (error) {
        toast.error(error?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "24%",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "15px",
        }}
        className="detailspromenu"
      >
        <Link to="/profilemob">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="tfd"
          >
            <FaUser style={{ marginRight: "10px" }} />
            <span>My Profile</span>
          </div>
        </Link>

        <Link to="/myaddress">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="tfd"
          >
            <FaAddressCard style={{ marginRight: "10px" }} />

            <span>My Address</span>
          </div>
        </Link>

        <Link to="/mywishlist">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="tfd"
          >
            <FaHeart style={{ marginRight: "10px" }} />

            <span>My Wishlist</span>
          </div>
        </Link>

        <Link onClick={signOut}>
          <div
            className="tfd"
            style={{
              display: "flex",
              alignItems: "center",

              width: "100%",
              padding: "5.5px",
            }}
          >
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SidebarMobile;
