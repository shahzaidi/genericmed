import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEye,
  faTrash,
  faEnvelope,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getContactUsDetails } from "../redux/actions/contactUsActions";
import Loading from "./Loading";
import Header from "./Header";

const ContactMessageView = () => {
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const { loading, contactMessage, error } = useSelector(
    (state) => state.getContactUsDetailsReducer
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const toggleGuestUsersVisibility = () => {
    setGuestUsersVisibility(!guestUsersVisibility);
  };

  const toggleAdminVisibility = () => {
    setAdminVisibility(!adminVisibility);
  };

  const toggleOrderLogVisibility = () => {
    setOrderLogVisibility(!orderLogVisibility);
  };

  const togglePagesVisibility = () => {
    setPagesVisibility(!pagesVisibility);
  };

  const toggleBlogsVisibility = () => {
    setBlogsVisibility(!blogsVisibility);
  };

  const toggleUserVisibility = () => {
    setUserVisibility(!userVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const toggleDMVisibility = () => {
    setDMVisibility(!dmVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

  const handleSendMail = (mailData) => {
    console.log("Mail Data:", mailData);
  };

  useEffect(() => {
    const dummyCategories = [
      {
        id: 1,
        name: "Sanju",
        email: "Sanju@example.com",
        phone: "123-456-7890",
        subject: " Subject 1",
        message: " Message 1",
        status: "Active",
      },
      {
        id: 2,
        name: "Ronika",
        email: "Ronika@example.com",
        phone: "987-654-3210",
        subject: " Subject 2",
        message: " Message 2",
        status: "Active",
      },
      {
        id: 3,
        name: "Faizal",
        email: "Faizal@example.com",
        phone: "555-123-4567",
        subject: " Subject 3",
        message: " Message 3",
        status: "Active",
      },
      {
        id: 4,
        name: "Shweta",
        email: "Shweta@example.com",
        phone: "333-444-5555",
        subject: " Subject 4",
        message: " Message 4",
        status: "Active",
      },
      {
        id: 5,
        name: "Rupali",
        email: "Rupali@example.com",
        phone: "999-888-7777",
        subject: " Subject 5",
        message: " Message 5",
        status: "Active",
      },
      {
        id: 6,
        name: "Aman",
        email: "Aman@example.com",
        phone: "111-222-3333",
        subject: " Subject 6",
        message: " Message 6",
        status: "Active",
      },
      {
        id: 7,
        name: "Sneha",
        email: "Sneha@example.com",
        phone: "777-888-9999",
        subject: " Subject 7",
        message: " Message 7",
        status: "Active",
      },
    ];
    setCategories(dummyCategories);
  }, []);

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };

  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  useEffect(() => {
    if (id) {
      dispatch(getContactUsDetails(id));
    }
  }, [id]);
  console.log(
    location.state,
    location,
    id,
    contactMessage,
    "location and id././././././././././"
  );
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="rightt-panel">
        <Header />
        <Layout heading="View Contact"></Layout>
      </div>
      <div className="viewsd">
        {loading ? (
          <div className="contact-info-container">
            <Loading />
          </div>
        ) : error ? (
          <p className="contact-info-container">{error}</p>
        ) : (
          <div className="contact-info-container">
            <div className="contact-info-row">
              <label>Name</label>
              <p>{contactMessage?.name}</p>
            </div>

            <div className="contact-info-row">
              <label>Email</label>
              <p>{contactMessage?.email}</p>
            </div>

            <div className="contact-info-row">
              <label>Phone No</label>
              <p>{contactMessage?.phoneNumber}</p>
            </div>

            <div className="contact-info-row">
              <label>Message:</label>
              <p>{contactMessage?.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessageView;
