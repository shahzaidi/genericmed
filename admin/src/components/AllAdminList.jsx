import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
import {
  faAngleDown,
  faEdit,
  faTrash,
  faAngleRight,
  faEye,
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
import { getAllAdmin } from "../redux/actions/adminsActions";
import Loading from "./Loading";
import Header from "./Header";
import ReactPaginate from "react-paginate";

const AllAdminList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const dispatch = useDispatch();

  const { loading, admins, allAdminsCount, error } = useSelector(
    (state) => state?.getAllAdminReducer
  );

  const allAdminsPerPageCount = Number(10);

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
        name: "Rajleen",
        email: "email1@example.com",
        password: "Password1",
        image: "./assets/image_7.png",
        role: "Admin",
      },
      {
        id: 2,
        name: "Rajleen",
        email: "email2@example.com",
        password: "Password2",
        image: "./assets/image_7.png",
        role: "Super Admin",
      },
      {
        id: 3,
        name: "Rajleen",
        email: "email3@example.com",
        password: "Password3",
        image: "./assets/image_7.png",
        role: "Super Admin",
      },
      {
        id: 4,
        name: "Rajleen",
        email: "email4@example.com",
        password: "Password4",
        image: "./assets/image_7.png",
        role: "Admin",
      },
      {
        id: 5,
        name: "Rajleen",
        email: "email5@example.com",
        password: "Password5",
        image: "./assets/image_7.png",
        role: "Admin",
      },
    ];
    setCategories(dummyCategories);
  }, []);

  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };

  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleAddCategory = (newCategory) => {
    newCategory.id = categories.length + 1;
    setCategories([...categories, newCategory]);
  };

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
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
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllAdmin(currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  console.log(admins, "adminssssssss.....//");

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="rightt-panel">
        <Header />
        <Layout heading="All Admin List"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              <div className="engadmin">
                <Link to="/addnewadmin">
                  {" "}
                  <button className="add-category-btn">+ Add Admin</button>
                </Link>
              </div>
              {/* <div className="pentry">
                Show&nbsp;
                <select
                  onChange={(e) =>
                    handleEntriesChange(parseInt(e.target.value))
                  }
                  value={entriesToShow}
                >
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className="search">
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
                <th>Email</th>
                {/* <th>Password</th> */}

                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : admins?.length <= 0 ? (
                <p>No admin available yet to show!</p>
              ) : (
                admins.map((admin, index) => (
                  <tr key={index} className="bl">
                    <td>{startIndex + index + 1}</td>
                    <td>
                      {admin?.firstName} {admin?.lastName}
                    </td>
                    <td>{admin?.email}</td>
                    {/* <td>{category.password}</td> */}
                    {/* <td>
                      <img
                        src={admin?.image}
                        alt={admin?.firstName}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td> */}

                    <td>
                      {admin?.isSuperAdmin && admin?.isAdmin
                        ? "Super Admin"
                        : "Admin"}
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faEye} className="icon" />
                      <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() => handleDeleteCategory(admin?._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {admins?.length >= 10 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, allAdminsCount) / allAdminsPerPageCount
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

export default AllAdminList;
