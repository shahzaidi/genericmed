import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='xsjbxhh'>
    <footer className="bg-dark text-light">
      <Container>
        <Row>
       
          <Col md={6}>
            <div className="d-flex flex-column align-items-start">
              <img src="/assets/Logo.png" alt="Logo" height="50" />
              <p>
                25 Upton Drive
                Wilmington, MA 01887
              </p>
              <p className='no'>
                (978) 657-7500 / (978) 657-9193
              </p>
            </div>
          </Col>

        
          <Col md={6}>
            <div className="d-flex flex-column justify-content-md-end justify-content-center">
              <div className="mb-4">
                <h5>INFORMATION</h5>
                <ul className="list-unstyled">
                  <li>Advanced Search</li>
                  <li><Link to='/faq' className='faq'>FAQ's</Link></li>
                  <li>Store Location</li>
                  <li>Orders & Returns</li>
                </ul>
              </div>
              <div className='mb-4'>
                <h5>POLICY INFO</h5>
                <ul className="list-unstyled">
                  <li><Link to='/aboutprivacy' className='pol'>Privacy Policy</Link></li>
                  <li><Link to='/paypol' className='pay'>Payment Policy</Link></li>
                  <li><Link to='/medpol' className='med_pol'>Medicine Policy</Link></li>
                  <li><Link to='/canpol' className='can_pol'>Cancellation, Returns and Refund policy</Link></li>
                  <li><Link to='/Term' className='term'>Terms & Conditions</Link></li>
                </ul>
              </div>
              <div className='mb-4'>
                <h5>SUPPORT</h5>
                <ul className="list-unstyled">
                  <li><Link to='/Contactus' className='contact'>Contact Us</Link></li>
                  <li><Link to='/aboutfoot' className='about'>About Us</Link></li>
                  <li>Careers</li>
                  <li>Refunds & Returns</li>
                  <li>Deliveries</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='text-center'>
              <p className='copyright'>Copyright © 2023 Pharmacy. All Rights Reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
};

export default Footer;
