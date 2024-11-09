import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUsPageDetailsAction,
  getAboutUsPageMetaDetails,
} from "../redux/actions/aboutUsPageAction";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const dispatch = useDispatch();
  const { loading, aboutUsPage, error } = useSelector(
    (state) => state.getAboutUsDetailsReducer
  );

  const { metaAboutUsLoading, aboutUsMeta, metaAboutUsError } = useSelector(
    (state) => state.getAboutUsPageMetaDetailsReducer
  );

  useEffect(() => {
    dispatch(getAboutUsPageDetailsAction());
  }, []);

  const metaFunction = (aboutUsMeta) => {
    if (Object.keys(aboutUsMeta).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={aboutUsMeta?.metaDescription} />
          <meta name="title" content={aboutUsMeta?.metaTitle} />
          <meta name="keyword" content={aboutUsMeta?.metaKeyword} />
          <meta name="slug" content={aboutUsMeta?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(getAboutUsPageMetaDetails());
  }, []);

  console.log(aboutUsPage, aboutUsMeta, "aboutUsPage");
  return (
    <div>
      {metaFunction(aboutUsMeta)}
      <HomePage />
      <Container fluid className="p-5 bg-light text-center">
        <h1>About Us</h1>
      </Container>
      <Container className="about-us-container py-5">
        <Row className="justify-content-center mb-4" id="prog">
          <Col xs={12} md={4} className="text-center">
            <Image
              src="/assets/AboutUs.png"
              className="aboutusimg"
              alt="Logo"
              fluid
            />
          </Col>
          <Col xs={12} md={8} id="kl">
            <section className="sections">
              <section className="mission-section">
                <h1 className="bufgt">
                  For Every Budget, Everyone, Everywhere
                </h1>
                <p>
                  Unlocking Wellness, One Click at a Time : Welcome to
                  GenericMedOnline, where convenience meets care! With over 25
                  product categories catering to every health need imaginable,
                  we're not just your average online pharmacy - we're your
                  virtual health haven! We have an unmatched ability to reach
                  people and provide them with access to the affordable, quality
                  healthcare and well-being services they need to live their
                  healthiest lives.
                </p>
                <h2 className="differnet">
                  Here's How We're Built Different :
                </h2>
                <div className="section">
                  <p>
                    <span>Championing Affordability:</span> We understand that
                    healthcare costs can be overwhelming, even with insurance.
                    That's why we offer a wide range of generic and brand-name
                    medications at competitive prices. You shouldn't have to
                    choose between your well-being and your wallet.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Convenience at Your Doorstep:</span> Forget the long
                    lines and frustration of traditional pharmacies. We deliver
                    your medication discreetly to your doorstep, saving you
                    precious time and hassle.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Transparency You Can Trust:</span> We believe in
                    complete transparency. You'll always find clear pricing
                    information and detailed product descriptions so that you
                    can make informed decisions about your health.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Quality You Can Count On:</span> We take pride in
                    sourcing our products only from reliable manufacturers who
                    undergo strict quality checks. Our suppliers' facilities
                    have been certified by the FDA, GMP, CDSCO, or equivalent
                    drug authorities, ensuring you receive only the best quality
                    products.
                  </p>
                </div>
                <p className="uio">
                  <strong>
                    Need a little advice on which product is right for you? Look
                    no further!
                  </strong>
                  <br />
                  Our team of well-experienced pharmacists is here to help,
                  offering expert guidance and personalized recommendations to
                  help you achieve better health.
                </p>
                <h3 className="generi">
                  Choose GenericMedOnline - Because we can do “Health” better!
                </h3>
              </section>

              <section className="values-section">
                <p>
                  At our core, we are driven by the goal of leading a healthcare
                  revolution and becoming the best online pharmacy in the United
                  States. Our passion fuels our commitment to providing our
                  valued customers with the best healthcare solutions. Our
                  vision is to make healthcare simpler, more accessible, and
                  tailored to your individual needs. Here's how we're achieving
                  that:
                </p>
                <div className="section">
                  <p>
                    <span>Always Open, Always Here for You:</span> We operate
                    24/7, 365 days a year. No matter when you need us, our
                    friendly customer support team is just a call, chat, or
                    email away.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Your Gateway to Savings:</span> We offer competitive
                    prices, exciting discounts, and special deals to help you
                    maximize your savings on essential medications and health
                    products.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Fast and Reliable Delivery:</span> Receive your
                    medications in no time with our lightning-fast shipping
                    options. We have partnered with trustworthy courier services
                    to guarantee that your order arrives promptly and securely.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Encrypted Platform and Secure Transactions:</span>{" "}
                    Rest assured that your transactions are safe and hassle-free
                    with our secure payment gateways and state-of-the-art
                    security technologies.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Empowering Informed Choices:</span> We believe in
                    transparency. You'll find clear pricing and detailed product
                    information, allowing you to make informed decisions about
                    your healthcare without being influenced by insurance
                    limitations.
                  </p>
                </div>
                <h3 className="generi">Convenience You Can Count On</h3>
                <div className="section">
                  <p>
                    <span>Refill Essentials with a Click:</span> No more
                    scrambling to fill prescriptions! With GenericMedOnline,
                    refilling your medications is a breeze. Order online from
                    the comfort of your home and have them delivered directly to
                    your doorstep.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Never Miss a Dose:</span> Life gets busy, but your
                    health shouldn't suffer. Our convenient online ordering
                    system ensures you never run out of essential medications,
                    helping you stay on track with your treatment plan.
                  </p>
                </div>
                <div className="section">
                  <p>
                    <span>Great Deals Delivered:</span> We regularly offer
                    exclusive discounts and promotions to help you save even
                    more on your healthcare needs.
                  </p>
                </div>
                <p>
                  Get Healthy, Save Smart: Find budget-friendly meds at
                  GenericMedOnline! We're here to simplify your healthcare
                  journey and empower you to take charge of your well-being.
                  With over 25 categories to choose from, you're sure to find
                  the right medication for your needs. Simplify your healthcare
                  journey and start saving today!
                </p>
              </section>
            </section>
          </Col>
        </Row>
      </Container>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export { AboutUs };

const Navigation = () => {
  return (
    <ul className="list-unstyled">
      <li className="about">
        <Link to="/aboutfoot">About Us</Link>
      </li>
    </ul>
  );
};

export { Navigation };
