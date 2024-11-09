import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 10000 / 5000);
    }, 100);

    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(interval);
    };
  }, [navigate]);
  return (
    <Container className="text-center forbidden-page-container" id="pwan">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12}>
          <h1 className="display-3 text-danger">403</h1>
          <h2 className="mb-4" id="forf">
            Forbidden
          </h2>
          <p className="leaad">
            You don't have permission to access this page.
          </p>
          <img
            src="/assets/forbiddenicon.png"
            alt="Forbidden"
            className="forbidden-image mt-4"
          />
          <div
            style={{
              width: "100%",
              height: "10px",
              marginTop: "20px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#007bff",
                borderRadius: "4px",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forbidden;
