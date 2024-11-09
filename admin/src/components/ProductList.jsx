import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
import {
  faAngleDown,
  faAngleRight,
  faEdit,
  faTrash,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  getAllProducts,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ReactPaginate from "react-paginate";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);
  const [productId, setProductId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsPerPage = Number(12);

  const {
    loading,
    products,
    error,
    productCount,
    productCountWithApiFeatures,
  } = useSelector((state) => state?.products);

  ///////

  const [isDiscount, setIsDiscount] = useState(0);
  const [discounts, setDiscounts] = useState([10, 20, 30, 40, 50]);
  const [isRating, setIsRating] = useState(0);
  const [ratings, setRatings] = useState([1, 2, 3, 4]);
  const [category, setCategory] = useState("");
  const [isCategoryChecked, setIsCategoryChecked] = useState("");
  const [price, setPrice] = useState([0, 200000]);
  const [keyword, setKeyword] = useState("");
  const [deletePopUp, setDeletePopup] = useState(false);

  ////////

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

  useEffect(() => {
    const dummyCategories = [
      {
        id: 1,
        name: "Product 1",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$10",
        sku: "SKU001",
        type: "T1",
      },
      {
        id: 2,
        name: "Product 2",
        image: "./assets/image_7.png",
        status: "Inactive",
        price: "$15",
        sku: "SKU002",
        type: "T2",
      },
      {
        id: 3,
        name: "Product 3",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$20",
        sku: "SKU003",
        type: "T5",
      },
      {
        id: 4,
        name: "Product 4",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$25",
        sku: "SKU004",
        type: "T2",
      },
      {
        id: 5,
        name: "Product 5",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$30",
        sku: "SKU005",
        type: "T1",
      },
      {
        id: 6,
        name: "Product 6",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$35",
        sku: "SKU006",
        type: "T5",
      },
      {
        id: 7,
        name: "Product 7",
        image: "./assets/image_7.png",
        status: "Active",
        price: "$40",
        sku: "SKU007",
        type: "T1",
      },
    ];
    setCategories(dummyCategories);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
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
  }, [location.pathname]);

  useEffect(() => {
    dispatch(
      getAllProducts(
        keyword,
        price,
        isCategoryChecked,
        isDiscount,
        isRating,
        currentPage
      )
    );
  }, [
    keyword,
    price,
    isCategoryChecked,
    isDiscount,
    isRating,
    currentPage,
    dispatch,
  ]);

  const deleteProduct = (confirmed) => {
    if (confirmed === true) {
      console.log("faq", confirmed);
      setDeletePopup(false);
      dispatch(deleteProductAction(productId));
      setTimeout(() => {
        dispatch(
          getAllProducts(
            keyword,
            price,
            isCategoryChecked,
            isDiscount,
            isRating,
            currentPage
          )
        );
      });
    } else {
      setDeletePopup(false);
      return false;
    }

    setProductId(null);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };
  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="Product List"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
              <div className="engpro">
                <button className="add-new-btn">
                  <Link to="/createproduct" className="add-new-btn">
                    + Create Product
                  </Link>
                </button>
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
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>SKU </th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : products?.length <= 0 ? (
                <p>No product available to show!</p>
              ) : (
                products?.map((product, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{product?.name}</td>
                    <td>{product?.price}</td>
                    <td>
                      <img
                        src={
                          product?.images?.length >= 1
                            ? `https://uploadawsimages.s3.amazonaws.com/${product?.image}`
                            : product?.image
                        }
                        alt={product?.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{product?.sku}</td>
                    <td>{product?.category}</td>
                    <div className="stiks">
                      <td
                        className={`${
                          product?.status === "Active" ? "active" : "deactive"
                        } status-cell`}
                      >
                        {product?.status === "Active" ? "Active" : "InActive"}
                      </td>
                    </div>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() =>
                          navigate(`/createproduct/${product?._id}`)
                        }
                        className="edit-icon"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() => {
                          setDeletePopup(true);
                          setProductId(product?._id);
                        }}
                      />
                    </td>

                    {deletePopUp && (
                      <div className="popupd">
                        <div className="popup-inner">
                          <button
                            className="close-btn"
                            onClick={() => {
                              deleteProduct(false);
                              setProductId(null);
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
                          <h2 className="hedytu">Delete</h2>
                          <form>
                            <div className="fyousure">
                              Are you Sure, want to delete?{" "}
                            </div>

                            <div className="butonfd">
                              <button
                                type="submit"
                                onClick={() => deleteProduct(true)}
                                className="coupondel"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => {
                                  deleteProduct(false);
                                  setProductId(null);
                                }}
                                type="submit"
                                className="couponcancel"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {products?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, productCount) / productsPerPage
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

export default ProductList;
