import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "./Layout";
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
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  productInitialValues,
  productValidationSchema,
} from "../common/Validation";
import { useFormik } from "formik";
import {
  createProduct,
  getProductDetails,
  updateProductDetailsAction,
} from "../redux/actions/productActions";
import { getAllCategory } from "../redux/actions/categoryActions";
import Header from "./Header";
import { uploadImagesAction } from "../redux/actions/imagesActions";

const ProductPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [MRP, setMRP] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("");
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [sku, setSku] = useState("");
  const [man, setMan] = useState("");
  const [stre, setStre] = useState("");
  const [dos, setDos] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(false);
  const [bestOffer, setBestOffer] = useState(false);

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [fields, setFields] = useState([]);

  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const { productLoading, product, productError } = useSelector(
    (state) => state.getProductDetailsReducer
  );

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
  );
  const navigate = useNavigate();
  const params = useParams();

  const refImage = useRef();
  const refImages = useRef();

  const { id } = params;

  const handleSwitchToggle = () => {
    setIsOn(!isOn);
  };
  const location = useLocation();

  const handleAddField = () => {
    setFields([...fields, { name: "", price: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);

    console.log(name, index, value, fields, "metaPD");

    formik.setFieldValue("variantsAndPrices", fields);
  };

  const handleChange2 = (value, e) => {
    console.log(value, e, "metaPD");
    if (e === "description") {
      formik.setFieldValue("description", value);
    }

    if (e === "dosage") {
      formik.setFieldValue("dosage", value);
    }

    if (e === "strength") {
      formik.setFieldValue("strength", value);
    }

    if (e === "manufacturer") {
      formik.setFieldValue("manufacturer", value);
    }
  };

  const handleImageUpload = (e, name) => {
    // const uploadedImage = e.target.files[0];
    // const newImages = [...images];
    // newImages[index] = URL.createObjectURL(uploadedImage);
    if (name === "images") {
      if (e.target.files.length === 0) {
        return;
      } else {
        let formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append("images", e.target.files[i]);
        }

        dispatch(uploadImagesAction(formData, name));
      }
    }
    if (name === "image") {
      if (e.target.files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", e.target.files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }
  };

  const handleProduct = () => {
    console.log(formik?.values, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createProduct(formik?.values));
    }
  };

  const updateProduct = () => {
    console.log(formik?.values, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(updateProductDetailsAction(id, formik?.values));
    }
  };

  const handleChang3 = (e, type) => {
    // let value = e.target.value;
    // let name = e.target.name;

    // console.log(name, value, type, "nameValueType");

    if (type === "bestSeller") {
      setBestSeller(!bestSeller);
      formik.setFieldValue("bestSeller", !bestSeller);
    }

    if (type === "bestOffer") {
      setBestOffer(!bestOffer);
      formik.setFieldValue("bestOffer", !bestOffer);
    }

    if (type === "featuredProduct") {
      setFeaturedProduct(!featuredProduct);
      formik.setFieldValue("featuredProduct", !featuredProduct);
    }
  };

  const formik = useFormik({
    initialValues: productInitialValues,
    onSubmit: id ? updateProduct : handleProduct,
    validationSchema: productValidationSchema,
  });

  console.log(formik?.values, formik?.errors, "fields");

  console.log(
    formik?.values?.bestSeller,
    formik?.values?.bestOffer,
    formik?.values?.featuredProduct,
    formik.values,
    "nameValueT"
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (product && Object.keys(product).length >= 1) {
      formik.setFieldValue("description", product?.description);
      formik.setFieldValue("slug", product?.slug);
      formik.setFieldValue("category", product?.category);
      formik.setFieldValue("manufacturer", product?.manufacturer);
      formik.setFieldValue("sku", product?.sku);
      formik.setFieldValue("name", product?.name);
      formik.setFieldValue("dosage", product?.dosage);
      formik.setFieldValue("strength", product?.strength);
      formik.setFieldValue("price", product?.price);
      formik.setFieldValue("metaKeyword", product?.metaKeyword);
      formik.setFieldValue("metaTitle", product?.metaTitle);
      formik.setFieldValue("metaDescription", product?.metaDescription);
      formik.setFieldValue("status", product?.status);
      formik.setFieldValue("shortDescription", product?.shortDescription);
      formik.setFieldValue("shortDescription", product?.shortDescription);
      formik.setFieldValue("variantsAndPrices", product?.variantsAndPrices);
      formik.setFieldValue("bestSeller", product?.bestSeller);
      formik.setFieldValue("bestOffer", product?.bestOffer);
      formik.setFieldValue("featuredProduct", product?.featuredProduct);
      setBestSeller(product?.bestSeller);
      setBestOffer(product?.bestOffer);
      setFeaturedProduct(product?.featuredProduct);
      setImage(product?.image);
      formik.setFieldValue("image", product?.image);
      setImages(product?.images);
      formik.setFieldValue("images", product?.images);

      if (
        product?.variantsAndPrices &&
        product?.variantsAndPrices?.length >= 1
      ) {
        setFields(product?.variantsAndPrices);
        setIsOn(true);
      }
    }
    console.log(id, product?.variantsAndPrices, fields, "productAdmin11");
  }, [id, product]);
  console.log(id, product?.variantsAndPrices, fields, "productAdmin");

  useEffect(() => {
    if (imageUrls && type === "images") {
      setImages(imageUrls);
      formik.setFieldValue("images", imageUrls);
    }
    if (imageUrls && type === "image") {
      setImage(imageUrls[0]);
      formik.setFieldValue("image", imageUrls[0]);
    }
  }, [imageUrls]);

  console.log(images, image, "imagesssssssssssssssssssssss././.");

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">
          <Header />
          <Layout heading="Create Product"></Layout>
          <div className="produche">
            <div className="gp">
              <div className="ing">
                <label>Best Seller</label>
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={bestSeller}
                  value={bestSeller}
                  onChange={(e) => {
                    handleChang3(e, "bestSeller");
                  }}
                />
              </div>
              <div className="ing">
                <label>Best Offer</label>
                <input
                  type="checkbox"
                  name="bestOffer"
                  checked={bestOffer}
                  value={bestOffer}
                  onChange={(e) => {
                    handleChang3(e, "bestOffer");
                  }}
                />
              </div>
              <div className="ing">
                <label>Featured Product</label>
                <input
                  type="checkbox"
                  name="featuredProduct"
                  checked={featuredProduct}
                  value={featuredProduct}
                  onChange={(e) => {
                    handleChang3(e, "featuredProduct");
                  }}
                />
              </div>
            </div>
            <div className="in">
              <label>
                Upload Image {import.meta?.env?.VITE_IMAGE_BASE_URL}
              </label>

              <div className="ig">
                <>
                  <div
                    style={{ marginBottom: "20px" }}
                    onClick={() => refImage.current.click()}
                  >
                    <div
                      className="bigimage mentomn"
                      style={{
                        cursor: "pointer",
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <div className="big-image-placeholder">
                        <img
                          src={
                            image
                              ? `https://uploadawsimages.s3.amazonaws.com/${image}`
                              : "/assets/upimgicon.png"
                          }
                          alt="Upload Icon"
                          style={
                            image ? { width: "150px", height: "150px" } : {}
                          }
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={refImage}
                      onChange={(e) => handleImageUpload(e, "image")}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              </div>
            </div>

            <div className="in">
              <label>Upload Images</label>
              <div className="ig">
                <>
                  <div
                    style={{ marginBottom: "20px" }}
                    onClick={() => refImages.current.click()}
                  >
                    <div
                      className="bigimage mentomn"
                      style={{
                        cursor: "pointer",
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <div className="big-image-placeholder">
                        <img
                          src={
                            images.length >= 1
                              ? `https://uploadawsimages.s3.amazonaws.com/${images[0]}`
                              : "/assets/upimgicon.png"
                          }
                          style={
                            images.length >= 1
                              ? { width: "150px", height: "150px" }
                              : {}
                          }
                          alt="Upload Icon"
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      ref={refImages}
                      onChange={(e) => handleImageUpload(e, "images")}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              </div>
              {images.length >= 1 && (
                <div className="igg">
                  {images.length <= 0
                    ? ""
                    : images
                        .filter((im, index) => index !== 0)
                        .map((imag, index) => (
                          <div key={index} style={{ margin: "20px" }}>
                            <div
                              className="bigimage mentomn"
                              style={{
                                cursor: "pointer",
                                width: "150px",
                                height: "150px",
                              }}
                            >
                              {imag ? (
                                <img
                                  src={`https://uploadawsimages.s3.amazonaws.com/${imag}`}
                                  alt={`Uploaded Image ${index + 1}`}
                                  style={{ width: "150px", height: "150px" }}
                                />
                              ) : (
                                <div className="big-image-placeholder">
                                  <img
                                    src="/assets/upimgicon.png"
                                    alt="Upload Icon"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                </div>
              )}
              {formik?.touched?.images && formik?.errors?.images ? (
                <p className="errorsig">{formik?.errors?.images}</p>
              ) : null}
            </div>
            <div className="in">
              <label>
                Product Name <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="name"
                  value={formik?.values?.name}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.name && formik?.errors?.name ? (
                <p className="errorsig">{formik?.errors?.name}</p>
              ) : null}
            </div>
            <div className="in">
              <label>
                Short Description <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="shortDescription"
                  value={formik?.values?.shortDescription}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.shortDescription &&
              formik?.errors?.shortDescription ? (
                <p className="errorsig">{formik?.errors?.shortDescription}</p>
              ) : null}
            </div>
            <div className="in">
              <label>
                Description <span style={{ color: "red" }}>*</span>
                <ReactQuill
                  name="description"
                  value={formik?.values?.description}
                  onChange={(value) => handleChange2(value, "description")}
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
            <div className="in">
              <label>
                Slug <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="slug"
                  value={formik?.values?.slug}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.slug && formik?.errors?.slug ? (
                <p className="errorsig">{formik?.errors?.slug}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Select Category <span style={{ color: "red" }}>*</span>
                <select
                  name="category"
                  value={formik?.values?.category}
                  onChange={formik.handleChange}
                >
                  {categories
                    ? categories?.map((category) => (
                        <option value={category?.name}>{category?.name}</option>
                      ))
                    : ""}
                </select>
              </label>
              {formik?.touched?.category && formik?.errors?.category ? (
                <p className="errorsig">{formik?.errors?.category}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Manufacturer
                <ReactQuill
                  name="manufacturer"
                  value={formik?.values?.manufacturer}
                  onChange={(value) => handleChange2(value, "manufacturer")}
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
              {formik?.touched?.manufacturer && formik?.errors?.manufacturer ? (
                <p className="errorsig">{formik?.errors?.manufacturer}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Strength
                <ReactQuill
                  name="strength"
                  value={formik?.values?.strength}
                  onChange={(value) => handleChange2(value, "strength")}
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
              {formik?.touched?.strength && formik?.errors?.strength ? (
                <p className="errorsig">{formik?.errors?.strength}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Dosage
                <ReactQuill
                  name="dosage"
                  value={formik?.values?.dosage}
                  onChange={(value) => handleChange2(value, "dosage")}
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
                {formik?.touched?.dosage && formik?.errors?.dosage ? (
                  <p className="errorsig">{formik?.errors?.dosage}</p>
                ) : null}
              </label>
            </div>

            <div className="in">
              <label>
                SKU
                <input
                  type="text"
                  name="sku"
                  value={formik?.values?.sku}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.sku && formik?.errors?.sku ? (
                  <p className="errorsig">{formik?.errors?.sku}</p>
                ) : null}
              </label>
            </div>
            <div className="in">
              <label>
                Price <span style={{ color: "red" }}>*</span>
                <input
                  type="number"
                  name="price"
                  value={formik?.values?.price}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.price && formik?.errors?.price ? (
                  <p className="errorsig">{formik?.errors?.price}</p>
                ) : null}
              </label>
            </div>

            <div className="in">
              <label>
                Meta Keyword <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="metaKeyword"
                  value={formik?.values?.metaKeyword}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.metaKeyword && formik?.errors?.metaKeyword ? (
                  <p className="errorsig">{formik?.errors?.metaKeyword}</p>
                ) : null}
              </label>
            </div>
            <div className="in">
              <label>
                Meta Title <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="metaTitle"
                  value={formik?.values?.metaTitle}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.metaTitle && formik?.errors?.metaTitle ? (
                  <p className="errorsig">{formik?.errors?.metaTitle}</p>
                ) : null}
                <div dangerouslySetInnerHTML={{ __html: metaDescription }} />
              </label>
            </div>

            <div className="in">
              <label>
                Meta Description <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  name="metaDescription"
                  value={formik?.values?.metaDescription}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.metaDescription &&
                formik?.errors?.metaDescription ? (
                  <p className="errorsig">{formik?.errors?.metaDescription}</p>
                ) : null}
              </label>
            </div>

            <div className="in">
              <label>
                Status <span style={{ color: "red" }}>*</span>
                <select
                  name="status"
                  value={formik?.values?.status}
                  onChange={formik.handleChange}
                >
                  <option>Choose Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              {formik?.touched?.status && formik?.errors?.status ? (
                <p className="errorsig">{formik?.errors?.status}</p>
              ) : null}
            </div>

            <div className="specifi">
              <label>
                Variants
                <input
                  type="checkbox"
                  id="specSwitch"
                  checked={isOn}
                  onChange={handleSwitchToggle}
                  className="switch-input"
                />
                <label htmlFor="specSwitch" className="switch-label" id="onoff">
                  <span className="switch-inner"></span>
                  <span className="switch-swittch" id="roll"></span>
                  <span className="switch-on-text">On</span>
                  <span className="switch-off-text">Off</span>
                </label>
                {formik?.touched?.variantsAndPrices &&
                formik?.errors?.variantsAndPrices ? (
                  <p className="errorsig">
                    {formik?.errors?.variantsAndPrices}
                  </p>
                ) : null}
              </label>
              {isOn && (
                <div>
                  {fields &&
                    fields.map((field, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", marginBottom: "10px" }}
                      >
                        <div style={{ marginRight: "10px" }} className="fields">
                          <div className="variantss">
                            <label>Pack Size(Tablets)</label>

                            <input
                              type="text"
                              name="name"
                              className="pack"
                              value={field.name}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </div>

                          <div className="pricevariants">
                            <label>Price</label>
                            <input
                              type="number"
                              name="price"
                              className="valy"
                              value={field.price}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => handleRemoveField(index)}
                            className="subtractdel"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                  <div className="productvarisnts">
                    <button onClick={handleAddField} className="adspec">
                      + Add
                    </button>
                    {id ? (
                      <button
                        type="submit"
                        onClick={formik?.handleSubmit}
                        className="sv"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={formik?.handleSubmit}
                        className="sv"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductPage;
