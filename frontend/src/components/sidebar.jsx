import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import {
  FiHome,
  FiSearch,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import {
  FaExchangeAlt,
  FaBriefcase,
  FaMedal,
  FaCoins,
  FaUserGraduate,
  FaGlobe,
  FaChartLine,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = ({ active, onMenuToggle }) => {
  const location = useLocation();

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={location.pathname === to ? "active" : ""}
      onClick={onMenuToggle}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className={`sidebar ${active ? "active" : "hidden"}`}>
      <h2 className="sidebar-title">GlobalSkillSwap</h2>

      <nav className="sidebar-nav">
        <h3 className="sidebar-section-title">Main</h3>
        <NavLink to="/home" icon={<FiHome />} label="Home Dashboard" />
        <NavLink to="/mentors" icon={<FiSearch />} label="Find Mentors" />
        <NavLink to="/exchange" icon={<FaExchangeAlt />} label="Skill Exchange" />
        <NavLink to="/messenger" icon={<FiMessageCircle />} label="Messenger" />
        <NavLink to="/calendar" icon={<FiCalendar />} label="Sessions Calendar" />

        <h3 className="sidebar-section-title">Jobs & Career</h3>
        <NavLink to="/jobs" icon={<FaBriefcase />} label="Find Jobs" />
        <NavLink to="/post-job" icon={<FaUserCog />} label="Post a Job" />
        <NavLink to="/my-jobs" icon={<FaChartLine />} label="My Jobs & Stats" />

        <h3 className="sidebar-section-title">Learning & Growth</h3>
        <NavLink to="/achievements" icon={<FaMedal />} label="Achievements" />
        <NavLink to="/ledger" icon={<FaCoins />} label="SkillPoints Ledger" />
        <NavLink to="/learning-path" icon={<FiBookOpen />} label="Learning Paths" />
        <NavLink to="/ai-recommendations" icon={<FiTrendingUp />} label="AI Recommendations" />

        <h3 className="sidebar-section-title">Community</h3>
        <NavLink to="/profile" icon={<FaUserGraduate />} label="My Profile" />
        <NavLink to="/followers" icon={<FiUsers />} label="Followers / Following" />
        <NavLink to="/feed" icon={<FaGlobe />} label="Community Feed" />
        <NavLink to="/events" icon={<FiCalendar />} label="Workshops & Events" />

        <h3 className="sidebar-section-title">Settings</h3>
        <NavLink to="/settings" icon={<FiSettings />} label="Account Settings" />
        <NavLink to="/preferences" icon={<FaUserCog />} label="Preferences" />

        
      </nav>
    </div>
  );
};

export default Sidebar;
