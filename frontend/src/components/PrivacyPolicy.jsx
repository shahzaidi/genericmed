import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import HomePageMobile from "./HomepageMobile";

const PrivacyPolicy = () => {
  return (
    <div>
      <HomePage />
      <HomePageMobile />

      <div className="privacy-policy">
        <div className="pvy">
          <h1>Privacy policy</h1>
          <p>Please read the privacy policy carefully .</p>
        </div>

        <div className="pyf">
          <div className="polimage">
            <img
              src="/assets/PolicyPrivacy.png"
              className="polimg"
              alt="Logo"
              height="50"
            />
          </div>

          <div className="orvcy-info">
            <h1 className="qw">
              Your Privacy, Our Priority: Our Policies at a Glance
            </h1>
            <p>
              At GenericMedOnline, we prioritize your data privacy and are
              committed to safeguarding your personal information. This Privacy
              Policy outlines how we collect, use, and protect your data. By
              accessing our website, you consent to the terms described herein.
            </p>
            <h2>What Information Do We Collect About You?</h2>
            <p>
              When you visit GenericMedOnline, we may collect both non-personal
              and personal information. Non-personal information includes your
              IP address, browser type, and device information, which helps us
              optimize our website and services. Personal information may
              include your name, address, contact details, and preferences,
              provided with your consent during registration or purchase.
            </p>

            <h2>How We Use Your Information About You?</h2>
            <p>
              The information we collect is used to enhance your browsing
              experience, personalize content, and improve our products and
              services. It's also used for order processing, communication
              regarding promotions or updates, and maintaining account
              functionality.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Our website utilizes cookies to enhance user experience and
              collect valuable data. Cookies are small text files stored on your
              device that track your activity on our site, helping us analyze
              trends, administer the website, track your preferences, enhance
              navigation, and analyze website traffic patterns. Accepting our
              cookie policy enables us to optimize your browsing experience and
              provide personalized content.
            </p>

            <h2>Data Protection and Security Measures</h2>
            <p>
              We take your privacy seriously. That's why we've implemented
              robust security measures to protect your personal information from
              unauthorized access, alteration, or disclosure. Our systems use
              industry-standard encryption protocols, firewalls, and access
              controls to ensure the integrity and confidentiality of your data.
            </p>

            <h2>Opt-Out Options</h2>
            <p>
              You have the right to opt out of providing certain personal
              information collection, although this may impact the functionality
              of our services. Additionally, you can manage your communication
              preferences and opt out of promotional emails by following the
              instructions in the email footer.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your information only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy or as
              required by law. You may request to delete your account and
              associated data by contacting our customer support team.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              While browsing GenericMedOnline, you may encounter links to
              external websites. We assure you that we are transparent about
              these third-party sites' privacy practices or content. We
              encourage you to review their privacy policies before providing
              personal information.
            </p>

            <p>
              Please contact us at [@] for further assistance if you have
              questions or concerns regarding our Privacy Policy.
            </p>
            <h2 className="cn">Thank you for choosing GenericMedOnline.</h2>

            <div className="hand">
              <p>Privacy & Trust Go Hand-in-Hand</p>
              <span>Choose GenericMedOnline</span>
            </div>

            <div className="handl">
              <h2>Privacy, Trust, and Your Health</h2>
              <p>Learn More About Our Policies</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterMobile />
    </div>
  );
};

export { PrivacyPolicy };
const PriNavigation = () => {
  return (
    <ul className="list-unstyled">
      <li className="pol">
        <Link to="/paypol"></Link>
      </li>
    </ul>
  );
};

export { PriNavigation };
