import React from "react";
import background from "../../assets/images/imag.jpg";
import "./styles.css";
import logo from "./logo.png";

const Login = () => {
  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="container-fluid px-0 full-height d-flex align-items-center justify-content-center">
        <div className="login-container">
          <div className="login-left position-relative">
            <div className="position-absolute bottom-0 start-0 pt-4 px-4">
              <h5 className="fw-bold text-dark">Admin Dashboard Overview</h5>
              <p className="text-gray mb-2">
                Manage users, view analytics, and configure settings all in one
                place.
              </p>
            </div>
          </div>
          <div className="login-right">
            <div className="login-title">
              <img
                src={logo}
                alt="Logo"
                className="mb-3"
                style={{ maxWidth: 120 }}
              />
            </div>
            <h5 className="text-center mb-4">Welcome</h5>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Users name or Email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-dark w-50">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
