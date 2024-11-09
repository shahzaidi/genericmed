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
import {
  getAdminPermissions,
  providePermissions,
} from "../redux/actions/adminPermissionsActions";
import Header from "./Header";

const UserPermissions = () => {
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

  const { loading, admins, error } = useSelector(
    (state) => state?.getAllAdminReducer
  );

  const { permissionsLoading, permissions, permissionsError } = useSelector(
    (state) => state?.getAdminPermissionsReducer
  );

  useEffect(() => {
    dispatch(getAllAdmin());
  }, []);

  // ////////////////////////////////////////////////////////////////////////////////////////////////

  const [adminId, setAdminId] = useState(null);

  const [adminPermissions, setAdminPermissions] = useState({});
  const [productsPermissions, setProductsPermissions] = useState(false);
  const [createProducts, setCreateProducts] = useState(false);
  const [readProducts, setReadProducts] = useState(false);
  const [updateProducts, setUpdateProducts] = useState(false);
  const [deleteProducts, setDeleteProducts] = useState(false);

  const [createCoupons, setCreateCoupons] = useState(false);
  const [readCoupons, setReadCoupons] = useState(false);
  const [updateCoupons, setUpdateCoupons] = useState(false);
  const [deleteCoupons, setDeleteCoupons] = useState(false);

  const [createOrders, setCreateOrders] = useState(false);
  const [readOrders, setReadOrders] = useState(false);
  const [updateOrders, setUpdateOrders] = useState(false);
  const [deleteOrders, setDeleteOrders] = useState(false);

  const [createCategories, setCreateCategories] = useState(false);
  const [readCategories, setReadCategories] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false);
  const [deleteCategories, setDeleteCategories] = useState(false);

  const [createSubCategories, setCreateSubCategories] = useState(false);
  const [readSubCategories, setReadSubCategories] = useState(false);
  const [updateSubCategories, setUpdateSubCategories] = useState(false);
  const [deleteSubCategories, setDeleteSubCategories] = useState(false);

  const [createBlogCategories, setCreateBlogCategories] = useState(false);
  const [readBlogCategories, setReadBlogCategories] = useState(false);
  const [updateBlogCategories, setUpdateBlogCategories] = useState(false);
  const [deleteBlogCategories, setDeleteBlogCategories] = useState(false);

  const [createCustomers, setCreateCustomers] = useState(false);
  const [readCustomers, setReadCustomers] = useState(false);
  const [updateCustomers, setUpdateCustomers] = useState(false);
  const [deleteCustomers, setDeleteCustomers] = useState(false);

  const [createBlogs, setCreateBlogs] = useState(false);
  const [readBlogs, setReadBlogs] = useState(false);
  const [updateBlogs, setUpdateBlogs] = useState(false);
  const [deleteBlogs, setDeleteBlogs] = useState(false);

  const [readContactUs, setReadContactUs] = useState(false);
  const [deleteContactUs, setDeleteContactUs] = useState(false);

  // Digital Marketing States

  const [readHomePageDg, setReadHomePageDg] = useState(false);
  const [createHomePageDg, setCreateHomePageDg] = useState(false);
  const [updateHomePageDg, setUpdateHomePageDg] = useState(false);

  const [readShopAllDg, setReadShopAllDg] = useState(false);
  const [createShopAllDg, setCreateShopAllDg] = useState(false);
  const [updateShopAllDg, setUpdateShopAllDg] = useState(false);

  const [readAboutUsDg, setReadAboutUsDg] = useState(false);
  const [createAboutUsDg, setCreateAboutUsDg] = useState(false);
  const [updateAboutUsDg, setUpdateAboutUsDg] = useState(false);

  const [readBlogDg, setReadBlogDg] = useState(false);
  const [createBlogDg, setCreateBlogDg] = useState(false);
  const [updateBlogDg, setUpdateBlogDg] = useState(false);

  const [readContactUsDg, setReadContactUsDg] = useState(false);
  const [createContactUsDg, setCreateContactUsDg] = useState(false);
  const [updateContactUsDg, setUpdateContactUsDg] = useState(false);

  const [readPrivacyPolicyDg, setReadPrivacyPolicyDg] = useState(false);
  const [createPrivacyPolicyDg, setCreatePrivacyPolicyDg] = useState(false);
  const [updatePrivacyPolicyDg, setUpdatePrivacyPolicyDg] = useState(false);

  const [readFaqDg, setReadFaqDg] = useState(false);
  const [createFaqDg, setCreateFaqDg] = useState(false);
  const [updateFaqDg, setUpdateFaqDg] = useState(false);

  const [
    readPackagingAndAuthenticationDg,
    setReadPackagingAndAuthenticationDg,
  ] = useState(false);
  const [
    createPackagingAndAuthenticationDg,
    setCreatePackagingAndAuthenticationDg,
  ] = useState(false);
  const [
    updatePackagingAndAuthenticationDg,
    setUpdatePackagingAndAuthenticationDg,
  ] = useState(false);

  // Pages

  // About Us

  const [readAboutUsPg, setReadAboutUsPg] = useState(false);
  const [createAboutUsPg, setCreateAboutUsPg] = useState(false);
  const [updateAboutUsPg, setUpdateAboutUsPg] = useState(false);

  // Privacy Policy

  const [readPrivacyPolicyPg, setReadPrivacyPolicyPg] = useState(false);
  const [createPrivacyPolicyPg, setCreatePrivacyPolicyPg] = useState(false);
  const [updatePrivacyPolicyPg, setUpdatePrivacyPolicyPg] = useState(false);

  // Package and Authenticity

  const [readPackageAndAuthenticityPg, setReadPackageAndAuthenticityPg] =
    useState(false);
  const [createPackageAndAuthenticityPg, setCreatePackageAndAuthenticityPg] =
    useState(false);
  const [updatePackageAndAuthenticityPg, setUpdatePackageAndAuthenticityPg] =
    useState(false);

  // Faq's

  const [readFaqsPg, setReadFaqsPg] = useState(false);
  const [createFaqsPg, setCreateFaqsPg] = useState(false);
  const [updateFaqsPg, setUpdateFaqsPg] = useState(false);

  // Home Page

  const [readHomePagePg, setReadHomePagePg] = useState(false);
  const [createHomePagePg, setCreateHomePagePg] = useState(false);
  const [updateHomePagePg, setUpdateHomePagePg] = useState(false);

  // Categories

  const [readCategoriesPg, setReadCategoriesPg] = useState(false);
  const [createCategoriesPg, setCreateCategoriesPg] = useState(false);
  const [updateCategoriesPg, setUpdateCategoriesPg] = useState(false);

  // Shop All

  const [readShopAllPg, setReadShopAllPg] = useState(false);
  const [createShopAllPg, setCreateShopAllPg] = useState(false);
  const [updateShopAllPg, setUpdateShopAllPg] = useState(false);

  // //////////////////////////////////////////////////////////////////////////////////////////////

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
      { id: 1, name: "Rajleen", role: "Admin" },
      { id: 2, name: "Rajleen", role: "Super Admin" },
      { id: 3, name: "Rajleen", role: "Super Admin" },
      { id: 4, name: "Rajleen", role: "Admin" },
      { id: 5, name: "Rajleen", role: "Admin" },
    ];
    setCategories(dummyCategories);
  }, []);

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const [selectedName, setSelectedName] = useState("");

  const handlenameChange = (e) => {
    setSelectedName(e.target.value);
    console.log(e.target.value, e.target.name, "handlenameChange");
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

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleAddCategory = (newCategory) => {
    newCategory.id = categories.length + 1;
    setCategories([...categories, newCategory]);
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

  const [selectAll, setSelectAll] = useState(false);
  const [orders, setOrders] = useState([
    { name: "All Categories" },
    { name: "Subcategories" },
  ]);

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleChange = (e, name) => {
    // Products

    if (name === "readProducts") {
      setReadProducts(!readProducts);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readProducts,
      }));
    }
    if (name === "createProducts") {
      setCreateProducts(!createProducts);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createProducts,
      }));
    }
    if (name === "updateProducts") {
      setUpdateProducts(!updateProducts);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateProducts,
      }));
    }
    if (name === "deleteProducts") {
      setDeleteProducts(!deleteProducts);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteProducts,
      }));
    }

    // Categories

    if (name === "readCategories") {
      setReadCategories(!readCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readCategories,
      }));
    }
    if (name === "createCategories") {
      setCreateCategories(!createCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createCategories,
      }));
    }

    if (name === "updateCategories") {
      setUpdateCategories(!updateCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateCategories,
      }));
    }
    if (name === "deleteCategories") {
      setDeleteCategories(!deleteCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteCategories,
      }));
    }

    // Sub Categories

    if (name === "readSubCategories") {
      setReadSubCategories(!readSubCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readSubCategories,
      }));
    }
    if (name === "createSubCategories") {
      setCreateSubCategories(!createSubCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createSubCategories,
      }));
    }

    if (name === "updateSubCategories") {
      setUpdateSubCategories(!updateSubCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateSubCategories,
      }));
    }
    if (name === "deleteSubCategories") {
      setDeleteSubCategories(!deleteSubCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteSubCategories,
      }));
    }

    // Blog Categories

    if (name === "readBlogCategories") {
      setReadBlogCategories(!readBlogCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readBlogCategories,
      }));
    }
    if (name === "createBlogCategories") {
      setCreateBlogCategories(!createBlogCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createBlogCategories,
      }));
    }

    if (name === "updateBlogCategories") {
      setUpdateBlogCategories(!updateBlogCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateBlogCategories,
      }));
    }
    if (name === "deleteBlogCategories") {
      setDeleteBlogCategories(!deleteBlogCategories);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteBlogCategories,
      }));
    }

    // Orders

    if (name === "readOrders") {
      setReadOrders(!readOrders);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readOrders,
      }));
    }
    if (name === "createOrders") {
      setCreateOrders(!createOrders);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createOrders,
      }));
    }

    if (name === "updateOrders") {
      setUpdateOrders(!updateOrders);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateOrders,
      }));
    }
    if (name === "deleteOrders") {
      setDeleteOrders(!deleteOrders);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteOrders,
      }));
    }

    // Coupons

    if (name === "readCoupons") {
      setReadCoupons(!readCoupons);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readCoupons,
      }));
    }
    if (name === "createCoupons") {
      setCreateCoupons(!createCoupons);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createCoupons,
      }));
    }

    if (name === "updateCoupons") {
      setUpdateCoupons(!updateCoupons);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateCoupons,
      }));
    }
    if (name === "deleteCoupons") {
      setDeleteCoupons(!deleteCoupons);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteCoupons,
      }));
    }

    // Users

    if (name === "readCustomers") {
      setReadCustomers(!readCustomers);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readCustomers,
      }));
    }
    if (name === "deleteCustomers") {
      setDeleteCustomers(!deleteCustomers);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteCustomers,
      }));
    }

    // Blogs

    if (name === "readBlogs") {
      setReadBlogs(!readBlogs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readBlogs,
      }));
    }
    if (name === "createBlogs") {
      setCreateBlogs(!createBlogs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createBlogs,
      }));
    }

    if (name === "updateBlogs") {
      setUpdateBlogs(!updateBlogs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateBlogs,
      }));
    }
    if (name === "deleteBlogs") {
      setDeleteBlogs(!deleteBlogs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteBlogs,
      }));
    }

    // Contact US

    if (name === "readContactUs") {
      setReadContactUs(!readContactUs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readContactUs,
      }));
    }

    if (name === "deleteContactUs") {
      setDeleteContactUs(!deleteContactUs);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !deleteContactUs,
      }));
    }

    // Digital Marketing

    // Blog

    if (name === "readBlogDg") {
      setReadBlogDg(!readBlogDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readBlogDg,
      }));
    }

    if (name === "createBlogDg") {
      setCreateBlogDg(!createBlogDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createBlogDg,
      }));
    }

    if (name === "updateBlogDg") {
      setUpdateBlogDg(!updateBlogDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateBlogDg,
      }));
    }

    //  Home Page

    if (name === "readHomePageDg") {
      setReadHomePageDg(!readHomePageDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readHomePageDg,
      }));
    }

    if (name === "createHomePageDg") {
      setCreateHomePageDg(!createHomePageDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createHomePageDg,
      }));
    }

    if (name === "updateHomePageDg") {
      setUpdateHomePageDg(!updateHomePageDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateHomePageDg,
      }));
    }

    // Shop All

    if (name === "readShopAllDg") {
      setReadShopAllDg(!readShopAllDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readShopAllDg,
      }));
    }

    if (name === "createShopAllDg") {
      setCreateShopAllDg(!createShopAllDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createShopAllDg,
      }));
    }

    if (name === "updateShopAllDg") {
      setUpdateShopAllDg(!updateShopAllDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateShopAllDg,
      }));
    }

    // About Us

    if (name === "readAboutUsDg") {
      setReadAboutUsDg(!readAboutUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readAboutUsDg,
      }));
    }

    if (name === "createAboutUsDg") {
      setCreateAboutUsDg(!createAboutUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createAboutUsDg,
      }));
    }

    if (name === "updateAboutUsDg") {
      setUpdateAboutUsDg(!updateAboutUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateAboutUsDg,
      }));
    }

    // Contact Us

    if (name === "readContactUsDg") {
      setReadContactUsDg(!readContactUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readContactUsDg,
      }));
    }

    if (name === "createContactUsDg") {
      setCreateContactUsDg(!createContactUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createContactUsDg,
      }));
    }

    if (name === "updateContactUsDg") {
      setUpdateContactUsDg(!updateContactUsDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateContactUsDg,
      }));
    }

    // Privacy Policy

    if (name === "readPrivacyPolicyDg") {
      setReadPrivacyPolicyDg(!readPrivacyPolicyDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readPrivacyPolicyDg,
      }));
    }

    if (name === "createPrivacyPolicyDg") {
      setCreatePrivacyPolicyDg(!createPrivacyPolicyDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createPrivacyPolicyDg,
      }));
    }

    if (name === "updatePrivacyPolicyDg") {
      setUpdatePrivacyPolicyDg(!updatePrivacyPolicyDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updatePrivacyPolicyDg,
      }));
    }

    //  Packaging And Authentication ;

    if (name === "readPackagingAndAuthenticationDg") {
      setReadPackagingAndAuthenticationDg(!readPackagingAndAuthenticationDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readPackagingAndAuthenticationDg,
      }));
    }

    if (name === "createPackagingAndAuthenticationDg") {
      setCreatePackagingAndAuthenticationDg(
        !createPackagingAndAuthenticationDg
      );
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createPackagingAndAuthenticationDg,
      }));
    }

    if (name === "updatePackagingAndAuthenticationDg") {
      setUpdatePackagingAndAuthenticationDg(
        !updatePackagingAndAuthenticationDg
      );
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updatePackagingAndAuthenticationDg,
      }));
    }

    // Faq's

    if (name === "readFaqDg") {
      setReadFaqDg(!readFaqDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readFaqDg,
      }));
    }

    if (name === "createFaqDg") {
      setCreateFaqDg(!createFaqDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createFaqDg,
      }));
    }

    if (name === "updateFaqDg") {
      setUpdateFaqDg(!updateFaqDg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateFaqDg,
      }));
    }

    // Pages

    // About Us

    if (name === "readAboutUsPg") {
      setReadAboutUsPg(!readAboutUsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readAboutUsPg,
      }));
    }

    if (name === "createAboutUsPg") {
      setCreateAboutUsPg(!createAboutUsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createAboutUsPg,
      }));
    }

    if (name === "updateAboutUsPg") {
      setUpdateAboutUsPg(!updateAboutUsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateAboutUsPg,
      }));
    }

    // Privacy Policy

    if (name === "readPrivacyPolicyPg") {
      setReadPrivacyPolicyPg(!readPrivacyPolicyPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readPrivacyPolicyPg,
      }));
    }

    if (name === "createPrivacyPolicyPg") {
      setCreatePrivacyPolicyPg(!createPrivacyPolicyPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createPrivacyPolicyPg,
      }));
    }

    if (name === "updatePrivacyPolicyPg") {
      setUpdatePrivacyPolicyPg(!updatePrivacyPolicyPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updatePrivacyPolicyPg,
      }));
    }

    //  Packaging And Authentication ;

    if (name === "readPackageAndAuthenticityPg") {
      setReadPackageAndAuthenticityPg(!readPackageAndAuthenticityPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readPackageAndAuthenticityPg,
      }));
    }

    if (name === "createPackageAndAuthenticityPg") {
      setCreatePackageAndAuthenticityPg(!createPackageAndAuthenticityPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createPackageAndAuthenticityPg,
      }));
    }

    if (name === "updatePackageAndAuthenticityPg") {
      setUpdatePackageAndAuthenticityPg(!updatePackageAndAuthenticityPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updatePackageAndAuthenticityPg,
      }));
    }

    // Faq's

    if (name === "readFaqsPg") {
      setReadFaqsPg(!readFaqsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readFaqsPg,
      }));
    }

    if (name === "createFaqsPg") {
      setCreateFaqsPg(!createFaqsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createFaqsPg,
      }));
    }

    if (name === "updateFaqsPg") {
      setUpdateFaqsPg(!updateFaqsPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateFaqsPg,
      }));
    }
    //  Home Page

    if (name === "readHomePagePg") {
      setReadHomePagePg(!readHomePagePg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readHomePagePg,
      }));
    }

    if (name === "createHomePagePg") {
      setCreateHomePagePg(!createHomePagePg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createHomePagePg,
      }));
    }

    if (name === "updateHomePagePg") {
      setUpdateHomePagePg(!updateHomePagePg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateHomePagePg,
      }));
    }

    // Categories Pg

    if (name === "readCategoriesPg") {
      setReadCategoriesPg(!readCategoriesPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readCategoriesPg,
      }));
    }
    if (name === "createCategoriesPg") {
      setCreateCategoriesPg(!createCategoriesPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createCategoriesPg,
      }));
    }

    if (name === "updateCategoriesPg") {
      setUpdateCategoriesPg(!updateCategoriesPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateCategoriesPg,
      }));
    }

    // Shop All Pg

    if (name === "readShopAllPg") {
      setReadShopAllPg(!readShopAllPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !readShopAllPg,
      }));
    }

    if (name === "createShopAllPg") {
      setCreateShopAllPg(!createShopAllPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !createShopAllPg,
      }));
    }

    if (name === "updateShopAllPg") {
      setUpdateShopAllPg(!updateShopAllPg);
      setAdminPermissions((adminPermissions) => ({
        ...adminPermissions,
        [name]: !updateShopAllPg,
      }));
    }

    console.log(
      e.target.checked,
      e,
      name,
      readProducts,
      "handleChange...........//////////"
    );
  };

  const handleSubmit = () => {
    if (!selectedName) {
      return window.alert(
        "Please Select Admin Name for Assigning Permissions!"
      );
    } else if (selectedName && Object.keys(adminPermissions).length !== 0) {
      dispatch(providePermissions(selectedName, adminPermissions));
    } else {
      return;
    }
  };

  console.log(
    readProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    adminPermissions,
    permissions,
    "handleChange....."
  );

  useEffect(() => {
    if (selectedName) {
      dispatch(getAdminPermissions(selectedName));
    }
  }, [selectedName]);

  useEffect(() => {
    if (permissions && Object.keys(permissions).length >= 0) {
      let filterPermissions = Object.fromEntries(
        Object.entries(permissions).filter(([key, value]) => key !== "_id")
      );

      setAdminPermissions(filterPermissions);

      // Products

      if (permissions?.readProducts) {
        setReadProducts(permissions?.readProducts);
      } else {
        setReadProducts(false);
      }
      if (permissions?.createProducts) {
        setCreateProducts(permissions?.createProducts);
      } else {
        setCreateProducts(false);
      }
      if (permissions?.updateProducts) {
        setUpdateProducts(permissions?.updateProducts);
      } else {
        setUpdateProducts(false);
      }
      if (permissions?.deleteProducts) {
        setDeleteProducts(permissions?.deleteProducts);
      } else {
        setDeleteProducts(false);
      }

      // Categories

      if (permissions?.readCategories) {
        setReadCategories(permissions?.readCategories);
      } else {
        setReadCategories(false);
      }
      if (permissions?.createCategories) {
        setCreateCategories(permissions?.createCategories);
      } else {
        setCreateCategories(false);
      }
      if (permissions?.updateCategories) {
        setUpdateCategories(permissions?.updateCategories);
      } else {
        setUpdateCategories(false);
      }
      if (permissions?.deleteCategories) {
        setDeleteCategories(permissions?.deleteCategories);
      } else {
        setDeleteCategories(false);
      }

      // Sub Categories

      if (permissions?.readSubCategories) {
        setReadSubCategories(permissions?.readSubCategories);
      } else {
        setReadSubCategories(false);
      }
      if (permissions?.createSubCategories) {
        setCreateSubCategories(permissions?.createSubCategories);
      } else {
        setCreateSubCategories(false);
      }
      if (permissions?.updateSubCategories) {
        setUpdateSubCategories(permissions?.updateSubCategories);
      } else {
        setUpdateSubCategories(false);
      }
      if (permissions?.deleteSubCategories) {
        setDeleteSubCategories(permissions?.deleteSubCategories);
      } else {
        setDeleteSubCategories(false);
      }

      // Blog Categories

      if (permissions?.readBlogCategories) {
        setReadBlogCategories(permissions?.readBlogCategories);
      } else {
        setReadBlogCategories(false);
      }
      if (permissions?.createBlogCategories) {
        setCreateBlogCategories(permissions?.createBlogCategories);
      } else {
        setCreateBlogCategories(false);
      }
      if (permissions?.updateBlogCategories) {
        setUpdateBlogCategories(permissions?.updateBlogCategories);
      } else {
        setUpdateBlogCategories(false);
      }
      if (permissions?.deleteBlogCategories) {
        setDeleteBlogCategories(permissions?.deleteBlogCategories);
      } else {
        setDeleteBlogCategories(false);
      }

      // Orders

      if (permissions?.readOrders) {
        setReadOrders(permissions?.readOrders);
      } else {
        setReadOrders(false);
      }
      if (permissions?.createOrders) {
        setCreateOrders(permissions?.createOrders);
      } else {
        setCreateOrders(false);
      }
      if (permissions?.updateOrders) {
        setUpdateOrders(permissions?.updateOrders);
      } else {
        setUpdateOrders(false);
      }
      if (permissions?.deleteOrders) {
        setDeleteOrders(permissions?.deleteOrders);
      } else {
        setDeleteOrders(false);
      }

      // Coupons

      if (permissions?.readCoupons) {
        setReadCoupons(permissions?.readCoupons);
      } else {
        setReadCoupons(false);
      }
      if (permissions?.createCoupons) {
        setCreateCoupons(permissions?.createCoupons);
      } else {
        setCreateCoupons(false);
      }
      if (permissions?.updateCoupons) {
        setUpdateCoupons(permissions?.updateCoupons);
      } else {
        setUpdateCoupons(false);
      }
      if (permissions?.deleteCoupons) {
        setDeleteCoupons(permissions?.deleteCoupons);
      } else {
        setDeleteCoupons(false);
      }

      // Customers

      if (permissions?.readCustomers) {
        setReadCustomers(permissions?.readCustomers);
      } else {
        setReadCustomers(false);
      }

      if (permissions?.deleteCustomers) {
        setDeleteCustomers(permissions?.deleteCustomers);
      } else {
        setDeleteCustomers(false);
      }

      // Blogs

      if (permissions?.readBlogs) {
        setReadBlogs(permissions?.readBlogs);
      } else {
        setReadBlogs(false);
      }
      if (permissions?.createBlogs) {
        setCreateBlogs(permissions?.createBlogs);
      } else {
        setCreateBlogs(false);
      }
      if (permissions?.updateBlogs) {
        setUpdateBlogs(permissions?.updateBlogs);
      } else {
        setUpdateBlogs(false);
      }
      if (permissions?.deleteBlogs) {
        setDeleteBlogs(permissions?.deleteBlogs);
      } else {
        setDeleteBlogs(false);
      }

      // Contact Us

      if (permissions?.readContactUs) {
        setReadContactUs(permissions?.readContactUs);
      } else {
        setReadContactUs(false);
      }

      if (permissions?.deleteContactUs) {
        setDeleteContactUs(permissions?.deleteContactUs);
      } else {
        setDeleteContactUs(false);
      }

      // Digital Marketing

      // Blogs
      if (permissions?.readBlogDg) {
        setReadBlogDg(permissions?.readBlogDg);
      } else {
        setReadBlogDg(false);
      }
      if (permissions?.createBlogDg) {
        setCreateBlogDg(permissions?.createBlogDg);
      } else {
        setCreateBlogDg(false);
      }
      if (permissions?.updateBlogDg) {
        setUpdateBlogDg(permissions?.updateBlogDg);
      } else {
        setUpdateBlogDg(false);
      }

      // Home page

      if (permissions?.readHomePageDg) {
        setReadHomePageDg(permissions?.readHomePageDg);
      } else {
        setReadHomePageDg(false);
      }
      if (permissions?.createHomePageDg) {
        setCreateHomePageDg(permissions?.createHomePageDg);
      } else {
        setCreateHomePageDg(false);
      }
      if (permissions?.updateHomePageDg) {
        setUpdateHomePageDg(permissions?.updateHomePageDg);
      } else {
        setUpdateHomePageDg(false);
      }

      // Shop All
      if (permissions?.readShopAllDg) {
        setReadShopAllDg(permissions?.readShopAllDg);
      } else {
        setReadShopAllDg(false);
      }
      if (permissions?.createShopAllDg) {
        setCreateShopAllDg(permissions?.createShopAllDg);
      } else {
        setCreateShopAllDg(false);
      }
      if (permissions?.updateShopAllDg) {
        setUpdateShopAllDg(permissions?.updateShopAllDg);
      } else {
        setUpdateShopAllDg(false);
      }

      // About Us

      if (permissions?.readAboutUsDg) {
        setReadAboutUsDg(permissions?.readAboutUsDg);
      } else {
        setReadAboutUsDg(false);
      }
      if (permissions?.createAboutUsDg) {
        setCreateAboutUsDg(permissions?.createAboutUsDg);
      } else {
        setCreateAboutUsDg(false);
      }
      if (permissions?.updateAboutUsDg) {
        setUpdateAboutUsDg(permissions?.updateAboutUsDg);
      } else {
        setUpdateAboutUsDg(false);
      }

      // Contact Us

      if (permissions?.readContactUsDg) {
        setReadContactUsDg(permissions?.readContactUsDg);
      } else {
        setReadContactUsDg(false);
      }
      if (permissions?.createContactUsDg) {
        setCreateContactUsDg(permissions?.createContactUsDg);
      } else {
        setCreateContactUsDg(false);
      }
      if (permissions?.updateContactUsDg) {
        setUpdateContactUsDg(permissions?.updateContactUsDg);
      } else {
        setUpdateContactUsDg(false);
      }

      // Privacy Policy

      if (permissions?.readPrivacyPolicyDg) {
        setReadPrivacyPolicyDg(permissions?.readPrivacyPolicyDg);
      } else {
        setReadPrivacyPolicyDg(false);
      }
      if (permissions?.createPrivacyPolicyDg) {
        setCreatePrivacyPolicyDg(permissions?.createPrivacyPolicyDg);
      } else {
        setCreatePrivacyPolicyDg(false);
      }
      if (permissions?.updatePrivacyPolicyDg) {
        setUpdatePrivacyPolicyDg(permissions?.updatePrivacyPolicyDg);
      } else {
        setUpdatePrivacyPolicyDg(false);
      }

      // Package and Authenticity

      if (permissions?.readPackagingAndAuthenticationDg) {
        setReadPackagingAndAuthenticationDg(
          permissions?.readPackagingAndAuthenticationDg
        );
      } else {
        setReadPackagingAndAuthenticationDg(false);
      }
      if (permissions?.createPackagingAndAuthenticationDg) {
        setCreatePackagingAndAuthenticationDg(
          permissions?.createPackagingAndAuthenticationDg
        );
      } else {
        setCreatePackagingAndAuthenticationDg(false);
      }
      if (permissions?.updatePackagingAndAuthenticationDg) {
        setUpdatePackagingAndAuthenticationDg(
          permissions?.updatePackagingAndAuthenticationDg
        );
      } else {
        setUpdatePackagingAndAuthenticationDg(false);
      }

      // Faq's

      if (permissions?.readFaqDg) {
        setReadFaqDg(permissions?.readFaqDg);
      } else {
        setReadFaqDg(false);
      }
      if (permissions?.createFaqDg) {
        setCreateFaqDg(permissions?.createFaqDg);
      } else {
        setCreateFaqDg(false);
      }
      if (permissions?.updateFaqDg) {
        setUpdateFaqDg(permissions?.updateFaqDg);
      } else {
        setUpdateFaqDg(false);
      }

      // pages

      // About Us

      if (permissions?.readAboutUsPg) {
        setReadAboutUsPg(permissions?.readAboutUsPg);
      } else {
        setReadAboutUsPg(false);
      }
      if (permissions?.createAboutUsPg) {
        setCreateAboutUsPg(permissions?.createAboutUsPg);
      } else {
        setCreateAboutUsPg(false);
      }
      if (permissions?.updateAboutUsPg) {
        setUpdateAboutUsPg(permissions?.updateAboutUsPg);
      } else {
        setUpdateAboutUsPg(false);
      }

      // Privacy Policy

      if (permissions?.readPrivacyPolicyPg) {
        setReadPrivacyPolicyPg(permissions?.readPrivacyPolicyPg);
      } else {
        setReadPrivacyPolicyPg(false);
      }
      if (permissions?.createPrivacyPolicyPg) {
        setCreatePrivacyPolicyPg(permissions?.createPrivacyPolicyPg);
      } else {
        setCreatePrivacyPolicyPg(false);
      }
      if (permissions?.updatePrivacyPolicyPg) {
        setUpdatePrivacyPolicyPg(permissions?.updatePrivacyPolicyPg);
      } else {
        setUpdatePrivacyPolicyPg(false);
      }

      // Package and Authenticity

      if (permissions?.readPackageAndAuthenticityPg) {
        setReadPackageAndAuthenticityPg(
          permissions?.readPackageAndAuthenticityPg
        );
      } else {
        setReadPackageAndAuthenticityPg(false);
      }
      if (permissions?.createPackageAndAuthenticityPg) {
        setCreatePackageAndAuthenticityPg(
          permissions?.createPackageAndAuthenticityPg
        );
      } else {
        setCreatePackageAndAuthenticityPg(false);
      }
      if (permissions?.updatePackageAndAuthenticityPg) {
        setUpdatePackageAndAuthenticityPg(
          permissions?.updatePackageAndAuthenticityPg
        );
      } else {
        setUpdatePackageAndAuthenticityPg(false);
      }

      // Faq's

      if (permissions?.readFaqsPg) {
        setReadFaqsPg(permissions?.readFaqsPg);
      } else {
        setReadFaqsPg(false);
      }
      if (permissions?.createFaqsPg) {
        setCreateFaqsPg(permissions?.createFaqsPg);
      } else {
        setCreateFaqsPg(false);
      }
      if (permissions?.updateFaqsPg) {
        setUpdateFaqsPg(permissions?.updateFaqsPg);
      } else {
        setUpdateFaqsPg(false);
      }

      // Home page

      if (permissions?.readHomePagePg) {
        setReadHomePagePg(permissions?.readHomePagePg);
      } else {
        setReadHomePagePg(false);
      }
      if (permissions?.createHomePagePg) {
        setCreateHomePagePg(permissions?.createHomePagePg);
      } else {
        setCreateHomePagePg(false);
      }
      if (permissions?.updateHomePagePg) {
        setUpdateHomePagePg(permissions?.updateHomePagePg);
      } else {
        setUpdateHomePagePg(false);
      }

      // Categories Pg

      if (permissions?.readCategoriesPg) {
        setReadCategoriesPg(permissions?.readCategoriesPg);
      } else {
        setReadCategoriesPg(false);
      }
      if (permissions?.createCategoriesPg) {
        setCreateCategoriesPg(permissions?.createCategoriesPg);
      } else {
        setCreateCategoriesPg(false);
      }
      if (permissions?.updateCategoriesPg) {
        setUpdateCategoriesPg(permissions?.updateCategoriesPg);
      } else {
        setUpdateCategoriesPg(false);
      }
      // Shop All Pg

      if (permissions?.readShopAllPg) {
        setReadShopAllPg(permissions?.readShopAllPg);
      } else {
        setReadShopAllPg(false);
      }
      if (permissions?.createShopAllPg) {
        setCreateShopAllPg(permissions?.createShopAllPg);
      } else {
        setCreateShopAllPg(false);
      }
      if (permissions?.updateShopAllPg) {
        setUpdateShopAllPg(permissions?.updateShopAllPg);
      } else {
        setUpdateShopAllPg(false);
      }
    }
  }, [permissions, selectedName]);

  console.log(permissions, "sssssaasjkjdsjadhjdhjdhjddjhjdhsjdj");
  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="User Permissions"></Layout>
        <div className="recent-ordersusers">
          <Link to="/alladminroles">
            {" "}
            <button className="allrole">All Role</button>
          </Link>
          <div>
            <label htmlFor="name" className="lablnme">
              Name
            </label>
            <select
              id="name"
              name="id"
              value={selectedName}
              onChange={handlenameChange}
            >
              <option>Select Admin</option>
              {admins?.length > 0 ? (
                admins?.map((admin, index) => (
                  <option value={admin?._id}>
                    {admin?.firstName} {admin?.lastName}
                  </option>
                ))
              ) : (
                <option>No, admin available to show in options!</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="role" className="lblrole">
              Select Role
            </label>
            <select id="role" value={selectedRole} onChange={handleRoleChange}>
              <option value="">Select a Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          {/* <div class="table-container">
  
  <div className='headselectall'>
      <h2>Dashboard</h2>
      <div>

  <label>Select All</label>
  <input type="checkbox" />
</div>
</div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Total Orders</th>
                  <th>Pending Orders</th>
                  <th>Complete Orders</th>
                  <th>Total Earning</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="permissions">
                    <td>{index % 2 === 0 ? "1" : "2"}</td>
                    <td>{index === 0 ? "Dashboard" : "Recent Orders"}</td>

    {index === 0 ? (
      <>
        <td> </td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
      </>
    ) : (
      <td><input type="checkbox" /></td>
    )}
  </tr>
))}
  </tbody>
      </table>
      </div> */}

          <div class="table-container">
            <div className="headselectall">
              <h2>Orders</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "All Orders", index: 1 },
                  // { name: 'Pending Orders', index: 2 },
                  // { name: 'Delivered Orders', index: 3 },
                  // { name: 'Cancelled Orders', index: 4 }
                ].map((page, index) => (
                  <tr key={index + 1} className="permissions">
                    <td>{index + 1}</td>
                    <td>{page.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={readOrders}
                        onChange={(e) => handleChange(e, "readOrders")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={createOrders}
                        onChange={(e) => handleChange(e, "createOrders")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={updateOrders}
                        onChange={(e) => handleChange(e, "updateOrders")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={deleteOrders}
                        onChange={(e) => handleChange(e, "deleteOrders")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>Manage Categories</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <>
                  <tr className="permissions">
                    <td> 1</td>
                    <td>All Categories</td>
                    <td>
                      <input
                        checked={readCategories}
                        onChange={(e) => handleChange(e, "readCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={createCategories}
                        onChange={(e) => handleChange(e, "createCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={updateCategories}
                        onChange={(e) => handleChange(e, "updateCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={deleteCategories}
                        onChange={(e) => handleChange(e, "deleteCategories")}
                        type="checkbox"
                      />
                    </td>
                  </tr>
                  <tr className="permissions">
                    <td>2</td>
                    <td>Sub Categories</td>
                    <td>
                      <input
                        checked={readSubCategories}
                        onChange={(e) => handleChange(e, "readSubCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={createSubCategories}
                        onChange={(e) => handleChange(e, "createSubCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={updateSubCategories}
                        onChange={(e) => handleChange(e, "updateSubCategories")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={deleteSubCategories}
                        onChange={(e) => handleChange(e, "deleteSubCategories")}
                        type="checkbox"
                      />
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>Manage Products</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {[
                  // { name: 'Attributes', index: 0 },
                  { name: "Product List", index: 1 },
                  // { name: 'Out of Stock', index: 2 }
                ].map((page, index) => (
                  <tr key={index + 1} className="permissions">
                    <td>{index + 1}</td>
                    <td>{page.name}</td>
                    <td>
                      <input
                        checked={readProducts}
                        onChange={(e) => handleChange(e, "readProducts")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={createProducts}
                        onChange={(e) => handleChange(e, "createProducts")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={updateProducts}
                        onChange={(e) => handleChange(e, "updateProducts")}
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <input
                        checked={deleteProducts}
                        onChange={(e) => handleChange(e, "deleteProducts")}
                        type="checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>E-Commerce</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 &&
                  orders.map(
                    (order, index) =>
                      index === 0 && (
                        <tr key={order.id} className="permissions">
                          <td>1</td>
                          <td>Coupon List</td>
                          <td>
                            <input
                              checked={readCoupons}
                              onChange={(e) => handleChange(e, "readCoupons")}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              checked={createCoupons}
                              onChange={(e) => handleChange(e, "createCoupons")}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              checked={updateCoupons}
                              onChange={(e) => handleChange(e, "updateCoupons")}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              checked={deleteCoupons}
                              onChange={(e) => handleChange(e, "deleteCoupons")}
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>Users</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  {/* <th>Edit</th> */}
                  <th>Delete</th>
                  {/* <th>Send Mail</th> */}
                  {/* <th>Create</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map(
                  (order, index) =>
                    index === 0 && (
                      <tr key={order.id} className="permissions">
                        <td>{index + 1}</td>
                        <td>Customer List</td>
                        <td>
                          <input
                            checked={readCustomers}
                            onChange={(e) => handleChange(e, "readCustomers")}
                            type="checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={deleteCustomers}
                            onChange={(e) => handleChange(e, "deleteCustomers")}
                          />
                        </td>
                        {/* <td>
                          <input type="checkbox" />
                        </td> */}
                        {/* <td>
                          <input type="checkbox" />
                        </td> */}
                        {/* <td>
                          <input type="checkbox" />
                        </td> */}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>Blogs</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="permissions">
                  <td>1</td>
                  <td>All Blogs</td>
                  <td>
                    <input
                      checked={readBlogs}
                      onChange={(e) => handleChange(e, "readBlogs")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createBlogs}
                      onChange={(e) => handleChange(e, "createBlogs")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateBlogs}
                      onChange={(e) => handleChange(e, "updateBlogs")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={deleteBlogs}
                      onChange={(e) => handleChange(e, "deleteBlogs")}
                      type="checkbox"
                    />
                  </td>
                </tr>
                <tr className="permissions">
                  <td>2</td>
                  <td>Blog Categories</td>
                  <td>
                    <input
                      checked={readBlogCategories}
                      onChange={(e) => handleChange(e, "readBlogCategories")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createBlogCategories}
                      onChange={(e) => handleChange(e, "createBlogCategories")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateBlogCategories}
                      onChange={(e) => handleChange(e, "updateBlogCategories")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={deleteBlogCategories}
                      onChange={(e) => handleChange(e, "deleteBlogCategories")}
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div class="table-container">
            <div className="headselectall">
              <h2>Digital Marketing</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }, (_, index) => (
                  <tr key={index} className="permissions">
                    <td>{index + 1}</td>
                    <td>
                      {index === 0
                        ? "Homepage"
                        : index === 1
                        ? "Shop All"
                        : index === 2
                        ? "About Us"
                        : index === 3
                        ? "Blog Page"
                        : index === 4
                        ? "Contact Us"
                        : index === 5
                        ? "Privacy Policy"
                        : index === 6
                        ? "Package & Authenticity"
                        : "FAQs"}
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div class="table-container">
            <div className="headselectall">
              <h2>Digital Marketing</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="permissions">
                  <td>1</td>
                  <td>Home Page</td>
                  <td>
                    <input
                      checked={readHomePageDg}
                      onChange={(e) => handleChange(e, "readHomePageDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createHomePageDg}
                      onChange={(e) => handleChange(e, "createHomePageDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateHomePageDg}
                      onChange={(e) => handleChange(e, "updateHomePageDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>
                <tr className="permissions">
                  <td>2</td>
                  <td>Shop All</td>
                  <td>
                    <input
                      checked={readShopAllDg}
                      onChange={(e) => handleChange(e, "readShopAllDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createShopAllDg}
                      onChange={(e) => handleChange(e, "createShopAllDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateShopAllDg}
                      onChange={(e) => handleChange(e, "updateShopAllDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>3</td>
                  <td>About Us</td>
                  <td>
                    <input
                      checked={readAboutUsDg}
                      onChange={(e) => handleChange(e, "readAboutUsDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createAboutUsDg}
                      onChange={(e) => handleChange(e, "createAboutUsDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateAboutUsDg}
                      onChange={(e) => handleChange(e, "updateAboutUsDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>4</td>
                  <td>Blog Page</td>
                  <td>
                    <input
                      checked={readBlogDg}
                      onChange={(e) => handleChange(e, "readBlogDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createBlogDg}
                      onChange={(e) => handleChange(e, "createBlogDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateBlogDg}
                      onChange={(e) => handleChange(e, "updateBlogDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>5</td>
                  <td>Contact Us</td>
                  <td>
                    <input
                      checked={readContactUsDg}
                      onChange={(e) => handleChange(e, "readContactUsDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createContactUsDg}
                      onChange={(e) => handleChange(e, "createContactUsDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateContactUsDg}
                      onChange={(e) => handleChange(e, "updateContactUsDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>6</td>
                  <td>Privacy Policy </td>
                  <td>
                    <input
                      checked={readPrivacyPolicyDg}
                      onChange={(e) => handleChange(e, "readPrivacyPolicyDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createPrivacyPolicyDg}
                      onChange={(e) => handleChange(e, "createPrivacyPolicyDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updatePrivacyPolicyDg}
                      onChange={(e) => handleChange(e, "updatePrivacyPolicyDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>7</td>
                  <td>Package & Authenticity</td>
                  <td>
                    <input
                      checked={readPackagingAndAuthenticationDg}
                      onChange={(e) =>
                        handleChange(e, "readPackagingAndAuthenticationDg")
                      }
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createPackagingAndAuthenticationDg}
                      onChange={(e) =>
                        handleChange(e, "createPackagingAndAuthenticationDg")
                      }
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updatePackagingAndAuthenticationDg}
                      onChange={(e) =>
                        handleChange(e, "updatePackagingAndAuthenticationDg")
                      }
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>8</td>
                  <td>FAQs</td>
                  <td>
                    <input
                      checked={readFaqDg}
                      onChange={(e) => handleChange(e, "readFaqDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createFaqDg}
                      onChange={(e) => handleChange(e, "createFaqDg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateFaqDg}
                      onChange={(e) => handleChange(e, "updateFaqDg")}
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-container">
            <div className="headselectall">
              <h2>Pages</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="permissions">
                  <td>1</td>
                  <td>About Us</td>
                  <td>
                    <input
                      checked={readAboutUsPg}
                      onChange={(e) => handleChange(e, "readAboutUsPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createAboutUsPg}
                      onChange={(e) => handleChange(e, "createAboutUsPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateAboutUsPg}
                      onChange={(e) => handleChange(e, "updateAboutUsPg")}
                      type="checkbox"
                    />
                  </td>
                </tr>
                <tr className="permissions">
                  <td>2</td>
                  <td>Privacy Policy</td>
                  <td>
                    <input
                      checked={readPrivacyPolicyPg}
                      onChange={(e) => handleChange(e, "readPrivacyPolicyPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createPrivacyPolicyPg}
                      onChange={(e) => handleChange(e, "createPrivacyPolicyPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updatePrivacyPolicyPg}
                      onChange={(e) => handleChange(e, "updatePrivacyPolicyPg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>3</td>
                  <td>Package & Authenticity</td>
                  <td>
                    <input
                      checked={readPackageAndAuthenticityPg}
                      onChange={(e) =>
                        handleChange(e, "readPackageAndAuthenticityPg")
                      }
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createPackageAndAuthenticityPg}
                      onChange={(e) =>
                        handleChange(e, "createPackageAndAuthenticityPg")
                      }
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updatePackageAndAuthenticityPg}
                      onChange={(e) =>
                        handleChange(e, "updatePackageAndAuthenticityPg")
                      }
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>4</td>
                  <td>FAQs</td>
                  <td>
                    <input
                      checked={readFaqsPg}
                      onChange={(e) => handleChange(e, "readFaqsPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createFaqsPg}
                      onChange={(e) => handleChange(e, "createFaqsPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateFaqsPg}
                      onChange={(e) => handleChange(e, "updateFaqsPg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>5</td>
                  <td>Home Page </td>
                  <td>
                    <input
                      checked={readHomePagePg}
                      onChange={(e) => handleChange(e, "readHomePagePg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createHomePagePg}
                      onChange={(e) => handleChange(e, "createHomePagePg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateHomePagePg}
                      onChange={(e) => handleChange(e, "updateHomePagePg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>6</td>
                  <td>Categories Page</td>
                  <td>
                    <input
                      checked={readCategoriesPg}
                      onChange={(e) => handleChange(e, "readCategoriesPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createCategoriesPg}
                      onChange={(e) => handleChange(e, "createCategoriesPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateCategoriesPg}
                      onChange={(e) => handleChange(e, "updateCategoriesPg")}
                      type="checkbox"
                    />
                  </td>
                </tr>

                <tr className="permissions">
                  <td>7</td>
                  <td>Shop All</td>
                  <td>
                    <input
                      checked={readShopAllPg}
                      onChange={(e) => handleChange(e, "readShopAllPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={createShopAllPg}
                      onChange={(e) => handleChange(e, "createShopAllPg")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={updateShopAllPg}
                      onChange={(e) => handleChange(e, "updateShopAllPg")}
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div class="table-container">
            <div className="headselectall">
              <h2>Pages</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Create</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }, (_, index) => (
                  <tr key={index + 1} className="permissions">
                    <td>{index + 1}</td>
                    <td>
                      {index === 0
                        ? "About Us"
                        : index === 1
                        ? "Privacy Policy"
                        : index === 2
                        ? "Package and Authenticity"
                        : index === 3
                        ? "Blog Page"
                        : index === 4
                        ? "FAQs"
                        : index === 5
                        ? "Homepage"
                        : index === 6
                        ? "Categories Page"
                        : "Shop All"}
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>

                    <td>
                      {" "}
                      <input type="checkbox" />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* <div class="table-container">
 
  <div className='headselectall'>
      <h2>Order Log</h2>
      <div>

  <label>Select All</label>
  <input type="checkbox" />
</div>
</div>

<table className='usertble'>
    <thead>
    <tr className='permissionhead'>
        <th>SN</th>
        <th>Page</th>
        <th>List</th>
        <th>Edit</th>
        <th>Delete</th>
     
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className='permissions'>
        <td>1</td>
        <td>Order List</td> 
        <td><input type="checkbox" /></td> 
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td> 
        <td><input type="checkbox" /></td> 
       
      </tr>
    </tbody>
  </table>
</div> */}

          <div class="table-container">
            <div className="headselectall">
              <h2>Contact Message</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>

                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="permissions">
                  <td>1</td>
                  <td>Contact Messages</td>
                  <td>
                    <input
                      checked={readContactUs}
                      onChange={(e) => handleChange(e, "readContactUs")}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={deleteContactUs}
                      onChange={(e) => handleChange(e, "deleteContactUs")}
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div class="table-container">
            <div className="headselectall">
              <h2>Admin</h2>
              <div>
                <label>Select All</label>
                <input type="checkbox" />
              </div>
            </div>

            <table className="usertble">
              <thead>
                <tr className="permissionhead">
                  <th>SN</th>
                  <th>Page</th>
                  <th>List</th>
                  <th>Edit</th>
                  <th>Delete</th>

                  <th>Create</th>
                </tr>
              </thead>
              <tbody>
                <tr className="permissions">
                  <td>1</td>
                  <td>All Admin List</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr> */}
          {/* <tr className='permissions'>
    <td>2</td>
    <td>All Admin Roles</td> 
    <td><input type="checkbox" /></td> 
    <td></td> 
    <td><input type="checkbox" /></td> 
    <td><input type="checkbox" /></td> 
  </tr> */}
          {/* </tbody>
            </table>
          </div> */}

          <button className="usersave" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
