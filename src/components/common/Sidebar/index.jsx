import React from "react";
import settings from "../../../assets/icons/gear.svg";
import logout from "../../../assets/icons/logout.svg";
import dashboard from "../../../assets/icons/dashboard.svg";
import leads from "../../../assets/icons/leads.svg";

const Sidebar = () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const tooltip = link.querySelector(".tooltip-text");
      const rect = link.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      tooltip.style.top = `${rect.top + scrollY + rect.height / 2 - 80}px`;
    });
  });
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
          <a href="#" className="nav-link">
            <img src={logout} alt />
            <span className="tooltip-text">Log out</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
