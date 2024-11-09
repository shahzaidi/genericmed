import React from "react";
import { Link } from "react-router-dom";

const Whatsapp = () => {
  return (
    <Link
      to={`https://wa.me/+919899896668?text=I have a few questions. Can you help?`}
      className="whic"
    >
      <img src="/assets/whatsapp.png" alt="" srcset="" />
    </Link>
  );
};

export default Whatsapp;
