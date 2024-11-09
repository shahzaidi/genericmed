import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faStar,
  faCheckCircle,
  faClock,
  faTrash,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGuestUsersReview,
  getAllGuestUsersReviews,
} from "../redux/actions/guestUsersReviewsActions";
import Header from "./Header";
import ReactPaginate from "react-paginate";

const AllReviews = () => {
  const dispatch = useDispatch();
  const allReviewsPerPageCount = Number(10);
  const { reviewsLoading, reviews, allReviewsCount, reviewsError } =
    useSelector((state) => state.getAllGuestUsersReviewsReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);

  const [ProVisibility, setProVisibility] = useState(false);
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

  const toggleDMVisibility = () => {
    setDMVisibility(!dmVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  useEffect(() => {
    if (
      location.pathname === "/allorders" ||
      location.pathname === "/pendingorders" ||
      location.pathname === "/Delorders" ||
      location.pathname === "/Cancelorders"
    ) {
      setOrderVisibility(true);
    } else {
      setOrderVisibility(false);
    }

    if (
      location.pathname === "/allcategories" ||
      location.pathname === "/subcategories"
    ) {
      setCatVisibility(true);
    } else {
      setCatVisibility(false);
    }

    if (
      location.pathname === "/createproduct" ||
      location.pathname === "/productlist" ||
      location.pathname === "/attributes" ||
      location.pathname === "/outofstock"
    ) {
      setProVisibility(true);
    } else {
      setProVisibility(false);
    }

    if (
      location.pathname === "/createcoupon" ||
      location.pathname === "/couponlist" ||
      location.pathname === "/shippingrule" ||
      location.pathname === "/paymentmethod"
    ) {
      setEcomVisibility(true);
    } else {
      setEcomVisibility(false);
    }

    if (
      location.pathname === "/googleanalytics" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categorypage" ||
      location.pathname === "/shopall" ||
      location.pathname === "/aboutus" ||
      location.pathname === "/blogpage" ||
      location.pathname === "/contactus" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/faqs"
    ) {
      setDMVisibility(true);
    } else {
      setDMVisibility(false);
    }

    if (
      location.pathname === "/customerlist" ||
      location.pathname === "/allreviews" ||
      location.pathname === "/pendingreviews" ||
      location.pathname === "/approvereviews" ||
      location.pathname === "/Deletereviews" ||
      location.pathname === "/pendingcustomerlist"
    ) {
      setUserVisibility(true);
    } else {
      setUserVisibility(false);
    }

    if (
      location.pathname === "/aboutus" ||
      location.pathname === "/contactus" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/faqs" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categoriespage" ||
      location.pathname === "/shopall"
    ) {
      setPagesVisibility(true);
    } else {
      setPagesVisibility(false);
    }
    if (
      location.pathname === "/blogallblogs" ||
      location.pathname === "/blogcategorypage" ||
      location.pathname === "/addnewpost"
    ) {
      setBlogsVisibility(true);
    } else {
      setBlogsVisibility(false);
    }

    if (
      location.pathname === "/orderlist" ||
      location.pathname === "/createanorder"
    ) {
      setOrderLogVisibility(true);
    } else {
      setOrderLogVisibility(false);
    }
    if (
      location.pathname === "/alladminlist" ||
      location.pathname === "/addnewadmin" ||
      location.pathname === "/alladminroles" ||
      location.pathname === "/userpermissions"
    ) {
      setAdminVisibility(true);
    } else {
      setAdminVisibility(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const dummyCategories = [
      {
        id: 1,
        date: "01-02-2024",
        title: "Title 1",
        image: "/assets/image_7.png",
        review: "Good product",
        status: "Pending",
      },
      {
        id: 2,
        date: "02-02-2024",
        title: "Title 2",
        image: "/assets/image_7.png",
        review: "Superb",
        status: "Approved",
      },
      {
        id: 3,
        date: "03-02-2024",
        title: "Title 3",
        image: "/assets/image_7.png",
        review: "Nice",
        status: "Delete",
      },
      {
        id: 4,
        date: "04-02-2024",
        title: "Title 4",
        image: "/assets/image_7.png",
        review: "Great",
        status: "Pending",
      },
      {
        id: 5,
        date: "05-02-2024",
        title: "Title 5",
        image: "/assets/image_7.png",
        review: "Excellent",
        status: "Approved",
      },
    ];

    setCategories(dummyCategories);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteCategory = (productId, reviewId, comment, name) => {
    console.log(productId, reviewId, "ideeeessssss''''''''///////");
    let confirm = window.confirm(
      `Are you sure, wants to delete review:- ${comment}!`
    );
    if (confirm) {
      dispatch(deleteGuestUsersReview(productId, reviewId, name));
    } else {
      return;
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.title &&
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = Math.min(
    startIndex + entriesToShow,
    filteredCategories.length
  );
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const totalPages = 20;
  const pagesToShow = 5;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
  };

  useEffect(() => {
    dispatch(getAllGuestUsersReviews(currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  console.log(
    reviewsLoading,
    reviews,
    reviewsError,
    "ffffffffffffff........////"
  );

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="All reviews"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              {/* <div className="pentryreview">
                Show&nbsp;
                <select
                  onChange={(e) =>
                    handleEntriesChange(parseInt(e.target.value))
                  }
                  value={entriesToShow}
                >
                  <option value="10">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div> */}
              {/* <div className="searchproducts">
                Search{" "}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div> */}
            </div>
          </div>
          <table className="adminallblog-related">
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Image</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews?.length <= 0 ? (
                <p>No review yet to show!</p>
              ) : reviewsError ? (
                <p>{reviewsError}</p>
              ) : (
                reviews.map((review, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{review?.name}</td>
                    <td>
                      <img
                        src={review?.product?.image}
                        alt={review?.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      {/* Displaying 5 stars for rating */}
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`stars ${
                            i < review?.rating ? "selected" : ""
                          }`}
                          // onClick={() => handleStarsClick(i)}
                        >
                          <FontAwesomeIcon icon={faStar} key={i} />
                        </span>
                      ))}
                    </td>
                    <td>{review?.comment}</td>
                    <td
                      className={`${
                        review?.isApproved ? "approved" : "pending"
                        // ? "approved"
                        // : "deleted"
                      } status-cell`}
                    >
                      {/* Displaying appropriate status button */}
                      {review?.isApproved ? (
                        <button
                          className="approved-button"
                          onClick={() =>
                            handleStatusChange(review._id, "Approved")
                          }
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          className="pending-button"
                          onClick={() =>
                            handleStatusChange(review?._id, "Pending")
                          }
                        >
                          Pending
                        </button>
                      )}
                    </td>
                    <td>
                      {/* <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="approved-icon"
                        onClick={() =>
                          handleStatusChange(category.id, "Approved")
                        }
                      /> */}

                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() =>
                          handleDeleteCategory(
                            review?.product?._id,
                            review?._id,
                            review?.comment,
                            "allGuestsReviews"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {reviews?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, allReviewsCount) / allReviewsPerPageCount
                )}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
