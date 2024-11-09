import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = ({ heading }) => {
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  useEffect(() => {
    const a = localStorage.getItem("user");
    setUser(JSON.parse(a));
  }, []);

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  console.log(user, "user, user");

  return (
    <>
      <div className="header_admin">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <h2>{heading}</h2>

            <div className="visit">
              <img src="/assets/visitweb.png" alt="" />
              <p>Visit Website</p>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="/assets/profileimg.png"
                alt="Profile"
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <div className="admin-drop">
                <p
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  onClick={toggleAdminDropdown}
                  aria-expanded="false"
                >
                  {Object.keys(user).length >= 1
                    ? `${user?.firstName} ${user?.lastName}`
                    : "Admin"}
                  <FontAwesomeIcon icon={faAngleDown} />
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="adminform">
        {adminDropdownVisible && (
          <ul>
            {/* <li>Profile</li> */}
            <li onClick={logout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Header;
