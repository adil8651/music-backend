import React from "react";
import myImage from "./logo.png";
import profile from "./profile.jpeg";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={myImage} alt height={36} />
          </a>
          <div className="d-flex gap-3 align-items-center">
            <a href="#" className="notification">
              <i className="fas fa-bell" />
              <span className="num">28</span>
            </a>
            <div className="rounded-circle overflow-hidden">
              <img src={profile} className="profile-img" alt />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
