import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Layout from "./Layout";
import Header from "./Header";
import { useFormik } from "formik";
import {
  aboutUsPageInitialValues,
  aboutUsPageValidationSchema,
} from "../common/Validation";
import { useDispatch, useSelector } from "react-redux";
import {
  createAboutUsPageAction,
  getAboutUsPageDetailsAction,
  updateAboutUsPageAction,
} from "../redux/actions/pagesFolder/aboutUsPageActions";
import { uploadImagesAction } from "../redux/actions/imagesActions";
import Loading from "./Loading";

const PageAboutUs = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const [description, setDescription] = useState("");

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

  const dispatch = useDispatch();
  const imageUrlRef = useRef();
  const { loading, aboutUsPage, error } = useSelector(
    (state) => state.getAboutUsDetailsReducer
  );

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
  );

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
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
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
      location.pathname === "/termscondition" ||
      location.pathname === "/faq"
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
      location.pathname === "/pageaboutus" ||
      location.pathname === "/pagecontactus" ||
      location.pathname === "/pagetermscondition" ||
      location.pathname === "/pageprivacypolicy" ||
      location.pathname === "/pagefaq" ||
      location.pathname === "/pagehomepage" ||
      location.pathname === "/pagecategoriespage" ||
      location.pathname === "/pageshopall"
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

  const handleChange = (value, name) => {
    console.log(name, value, "click.././././././.././");
    if (name === "description") {
      formik.setFieldValue("description", value);
    }
  };

  const handleCreateAboutUsPage = () => {
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createAboutUsPageAction(formik?.values));
    }
    console.log(formik?.values);
  };

  const handleUpdateAboutUsPage = () => {
    if (
      Object.keys(formik.errors).length === 0 &&
      Object.keys(aboutUsPage).length !== 0
    ) {
      dispatch(updateAboutUsPageAction(aboutUsPage?._id, formik?.values));
    }
  };

  const formik = useFormik({
    initialValues: aboutUsPageInitialValues,
    onSubmit: aboutUsPage?._id
      ? handleUpdateAboutUsPage
      : handleCreateAboutUsPage,
    validationSchema: aboutUsPageValidationSchema,
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };
  const handleSavePage = () => {
    console.log("Selected Image:", selectedImage);
    console.log("Description:", description);
    // You can perform further actions here, like sending data to a backend API
  };
  useEffect(() => {
    dispatch(getAboutUsPageDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    if (aboutUsPage && Object.keys(aboutUsPage).length >= 1) {
      formik?.setFieldValue("description", aboutUsPage?.description);
      formik.setFieldValue("imageUrl", aboutUsPage?.imageUrl);
    }
  }, [aboutUsPage]);

  console.log(formik?.values, formik?.errors, "abcdefgh");

  useEffect(() => {
    if (imageUrls && type === "image") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("imageUrl", imageUrls[0]);
    }
  }, [imageUrls]);

  // console.log(image, "imagesssssssssssssssssssssss././.");
  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />

        <div className="rightt-panel">
          <Header />
          <Layout heading="About Us"></Layout>
          {loading ? (
            <div className="pagau">
              <Loading />
            </div>
          ) : error ? (
            <p className="pagau">{error}</p>
          ) : (
            <div className="pagau">
              <div className="image_content">
                <label className="impage">Image</label>

                <div className="imch">
                  <div
                    className="image-container"
                    onClick={() => imageUrlRef.current.click()}
                  >
                    <img
                      src={
                        formik?.values?.imageUrl
                          ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.imageUrl}`
                          : "/assets/upimgicon.png"
                      }
                      alt="Selected"
                      className="seted-image"
                    />
                  </div>

                  <input
                    type="file"
                    name="image"
                    id="imageUpload"
                    ref={imageUrlRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="deptio">
                <label>
                  Description
                  <ReactQuill
                    value={formik?.values?.description}
                    name="description"
                    onChange={(value) => handleChange(value, "description")}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }],

                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                    ]}
                  />
                </label>
                {formik?.touched?.description && formik?.errors?.description ? (
                  <p className="errorsig">{formik?.errors?.description}</p>
                ) : null}
              </div>

              {formik &&
              aboutUsPage &&
              Object.keys(aboutUsPage).length !== 0 ? (
                <button className="homesave" onClick={formik?.handleSubmit}>
                  Update
                </button>
              ) : (
                <button className="homesave" onClick={formik?.handleSubmit}>
                  Save
                </button>
              )}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PageAboutUs;
