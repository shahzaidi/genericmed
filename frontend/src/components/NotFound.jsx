import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
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
    <Container className="text-center not-found-container">
      <Row className="rpr">
        <Col>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size="6x"
            className="not-found-icon"
          />
          <h1 className="display-1 not-found-heading">404</h1>
          <p className="lead not-found-text">Page Not Found</p>
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            className="not-found-button"
          >
            Go Home
          </Button>
        </Col>

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
      </Row>
    </Container>
  );
};

export default NotFound;
