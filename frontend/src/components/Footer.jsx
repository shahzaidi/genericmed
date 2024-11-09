import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="ushc">
      <footer className="bg-dark text-light">
        <Container>
          <Row>
            <Col md={6}>
              <div className="d-flex flex-column align-items-start">
                <img src="/assets/Logo.png" alt="Logo" height="50" />
                <p>25 Upton Drive Wilmington, MA 01887</p>
                <p
                  style={{
                    position: "relative!important",
                    left: "-49px!important",
                  }}
                  className="no"
                >
                  (978) 657-7500 / (978) 657-9193
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="d-flex justify-content-end">
                <div className="mr-4" id="wid">
                  <h5>COMPANY</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/aboutfoot" className="about">
                        About Us
                      </Link>
                    </li>

                    <li>
                      <Link to="/Contactus" className="contact">
                        Contact Us
                      </Link>
                    </li>

                    <li>
                      <Link to="/blogpage" className="about">
                        Blog
                      </Link>
                    </li>

                    <li>
                      <Link to="/faq" className="faq">
                        FAQ's
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="head_sup">
                  <div className="super">
                    <h5>POLICY INFO</h5>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/aboutprivacy" className="pol">
                          Privacy Policy
                        </Link>
                      </li>

                      <li>
                        <Link to="/canpol" className="can_pol">
                          Cancellation and Refund policy
                        </Link>
                      </li>
                      <li>
                        <Link to="/Term" className="term">
                          Package & Authenticity
                        </Link>
                      </li>

                      <li>
                        <Link to="/paypol" className="pay">
                          Payment Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="super">
                    <h5>ADDRESS</h5>
                    <ul className="list-unstyled" id="fhdj">
                      <li>Lorem ipsum 25 Upton Drive Wilmington, MA 01887</li>
                      <li>Email : abc@gmail.com</li>

                      <li>Contact Number : (978) XXX-700 / (978) XXX-9193</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="copu">
            <p className="copyright">
              Copyright © 2023 Pharmacy. All Rights Reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
