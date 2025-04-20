import React from "react";
import settings from "../../../assets/icons/gear.svg";
import logout from "../../../assets/icons/logout.svg";
import dashboard from "../../../assets/icons/dashboard.svg";
import leads from "../../../assets/icons/leads.svg";
import axios from "axios";
const logoutUrl = `${import.meta.env.VITE_BASE_URL}/logout`;

const Sidebar = () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const tooltip = link.querySelector(".tooltip-text");
      const rect = link.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      tooltip.style.top = `${rect.top + scrollY + rect.height / 2 - 80}px`;
    });
  });
  const handleLogout = async () => {
    try {
      const response = await axios.get(logoutUrl, {
        withCredentials: true,
      });
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <section className="sidebar">
        <div className="sidebar-container">
          <a href="#" className="nav-link" title="Dashboard">
            <img src={dashboard} alt />
            <span className="tooltip-text">Dashboard</span>
          </a>
          <a href="#" className="nav-link">
            <img src={leads} alt />
            <span className="tooltip-text">Songs</span>
          </a>
        </div>
        <div className="sidebar-container bottom">
          <a href="#" className="nav-link">
            <img src={settings} alt />
            <span className="tooltip-text">Setting</span>
          </a>
          <a href="#" className="nav-link" onClick={handleLogout}>
            <img src={logout} alt />
            <span className="tooltip-text">Log out</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
