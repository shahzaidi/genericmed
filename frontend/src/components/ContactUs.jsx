import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import { useFormik } from "formik";
import {
  contactUsInitialValues,
  contactUsValidationSchema,
} from "../common/Validation";
import { TheContextApi } from "../contextApi/TheContext";
import {
  contactUsAction,
  getContactUsMetaPageDetails,
} from "../redux/actions/contactUsActions";
import { useDispatch, useSelector } from "react-redux";
import HomePageMobile from "./HomepageMobile";
import { Helmet } from "react-helmet";

const ContactForm = () => {
  const { contacted, setContacted, contactLoading, setContactLoading } =
    useContext(TheContextApi);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const dispatch = useDispatch();
  const { contactUsMetaLoading, contactUsMeta, contactUsMetaError } =
    useSelector((state) => state.getContactUsMetaPageDetailsReducer);

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    captcha: false,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const handleCaptchaChange = (value) => {
    console.log("captcha Token", value);
    setFormData({
      ...formData,
      captcha: value,
    });

    setFormErrors({
      ...formErrors,
      captcha: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      phone: !formData.phone.trim(),
      message: !formData.message.trim(),
    };

    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).some((error) => error)) {
      console.log(
        "Please fill in all the required fields and complete the captcha."
      );
    } else {
      console.log("contactUsMeta Form submitted successfully:", contactUsMeta);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        captcha: "",
      });
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
      }, 7000);
    }
  };

  const contactUsSubmit = () => {
    if (
      Object.keys(formik.errors).length === 0
      // &&
      // Object.keys(otpErrors).length === 0
    ) {
      dispatch(
        contactUsAction(formik?.values, setContacted, setContactLoading)
      );
    }
  };

  const formik = useFormik({
    initialValues: contactUsInitialValues,
    onSubmit: contactUsSubmit,
    validationSchema: contactUsValidationSchema,
  });
  console.log("Form submitted successfully:", contactUsMeta);
  useEffect(() => {
    dispatch(getContactUsMetaPageDetails());
  }, []);

  const metaFunction = (contactUsMeta) => {
    if (Object.keys(contactUsMeta).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={contactUsMeta?.metaDescription} />
          <meta name="title" content={contactUsMeta?.metaTitle} />
          <meta name="keyword" content={contactUsMeta?.metaKeyword} />
          <meta name="slug" content={contactUsMeta?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <HomePage />
      <HomePageMobile />
      <h1 className="hfa">Contact Us</h1>
      <div className="ee">
        {metaFunction(contactUsMeta)}
        <div className="contact_form">
          {contacted ? (
            <div className="confirmation-popup">
              <div className="thnkcontent">
                <h1>Thank You!</h1>
                <p>Your message has been received.</p>
                <p>
                  Thanks for contacting us! We will get back to you shortly.
                </p>
                <Link to="/">
                  {" "}
                  <button className="backhome">Back to Home</button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="contactusdiv">
              <div className="form_contentcon">
                <div>
                  <label>
                    Name <span style={{ color: "red" }}>*</span>
                    <input
                      type="name"
                      name="name"
                      value={formik?.values?.name}
                      onChange={formik.handleChange}
                    />
                    {formik?.touched?.name && formik?.errors?.name ? (
                      <p className="errorsig">{formik?.errors?.name}</p>
                    ) : null}
                  </label>
                </div>
                <div className="email_ph">
                  <div className="email">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                      <input
                        type="email"
                        name="email"
                        id="eaicon"
                        value={formik?.values?.email}
                        onChange={formik.handleChange}
                      />
                      {formik?.touched?.email && formik?.errors?.email ? (
                        <p className="errorsigem">{formik?.errors?.email}</p>
                      ) : null}
                    </label>
                  </div>
                  <div className="phone">
                    <label>
                      Phone <span style={{ color: "red" }}>*</span>
                      <input
                        type="number"
                        name="phoneNumber"
                        id="conph"
                        value={formik?.values?.phoneNumber}
                        onChange={formik.handleChange}
                      />
                      {formik?.touched?.phoneNumber &&
                      formik?.errors?.phoneNumber ? (
                        <p className="errorsig">
                          {formik?.errors?.phoneNumber}
                        </p>
                      ) : null}
                    </label>
                  </div>
                </div>
                <div>
                  <label>
                    Message <span style={{ color: "red" }}>*</span>
                    <textarea
                      name="message"
                      value={formik?.values?.message}
                      onChange={formik.handleChange}
                    />
                    {formik?.touched?.message && formik?.errors?.message ? (
                      <p className="errorsig">{formik?.errors?.message}</p>
                    ) : null}
                  </label>
                </div>

                {/* <div className='recapctch'>
          <label>
            I'm not a robot <span style={{ color: 'red' }}>*</span>
            <ReCAPTCHA
              sitekey='your_recaptcha_site_key'
              onChange={handleCaptchaChange}
              className={formErrors.captcha ? 'error' : ''}
              id='recap'
            />
          </label>
        </div> */}
              </div>
              <div>
                <button
                  onClick={formik?.handleSubmit}
                  type="submit"
                  className="form_sub"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

          <div className="contact-info">
            <h1>Contact Info</h1>

            <div className="info-item">
              <FaEnvelope />
              <p>pharmacy@gmail.com</p>
            </div>

            <div className="info-item">
              <FaPhone />
              <p>(978) 657-7500 / (978) 657-9193</p>
            </div>

            <div className="info-item">
              <FaWhatsapp />
              <p> (978) 657-7500 </p>
            </div>

            <div className="info-item">
              <FaMapMarkerAlt />
              <p>25 Upton Drive Wilmington, MA 01887</p>
            </div>

            <div className="social-icons">
              <a
                href="https://www.facebook.com/campaign/landing.php?campaign_id=14884913640&extra_1=s%7Cc%7C589460569900%7Cb%7Cfacebook%20log%20in%7C&placement=&creative=589460569900&keyword=facebook%20log%20in&partner_id=googlesem&extra_2=campaignid%3D14884913640%26adgroupid%3D128696221912%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1409266755%26loc_physical_ms%3D1007820%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAiA7t6sBhAiEiwAsaieYgOKafVRaILntALx3PlwjexjM8pEV_6Z9U64lhdZxhkTzrczEkJc5hoCWu0QAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/fb.jpg" className="fb" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/accounts/login/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/insta.jpg"
                  className="insta"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://twitter.com/i/flow/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/twitter.png"
                  className="twitt"
                  alt="Twitter"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export { ContactForm };

const ContactNavigation = () => {
  return (
    <ul className="list-unstyled">
      <li className="contact">
        <Link to="/Contactus"></Link>
      </li>
    </ul>
  );
};

export { ContactNavigation };
