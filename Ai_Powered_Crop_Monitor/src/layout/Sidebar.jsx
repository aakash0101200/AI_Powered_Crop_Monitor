import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaTint,
  FaBug,
  FaFileAlt,
  FaLeaf,
} from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const menuItems = [
  { title: "Monitoring", icon: FaTachometerAlt, path: "/" },
  { title: "Crop Health", icon: FaChartLine, path: "/crop-health" },
  { title: "Soil Data", icon: FaTint, path: "/soil-data" },
  { title: "Pest Alerts", icon: FaBug, path: "/alerts" },
  { title: "Reports", icon: FaFileAlt, path: "/reports" },
];

const OPEN_DELAY = 220;
const CLOSE_DELAY = 260;

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (!openTimer.current) {
      openTimer.current = setTimeout(() => {
        setHovered(true);
        openTimer.current = null;
      }, OPEN_DELAY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (!closeTimer.current) {
      closeTimer.current = setTimeout(() => {
        setHovered(false);
        closeTimer.current = null;
      }, CLOSE_DELAY);
    }
  };

  const expanded = !isCollapsed || hovered;

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-expanded={expanded}
      className={`sticky top-6 left-6 h-[calc(100vh-48px)] z-30
        transition-all duration-300 ease-out
        ${expanded ? "w-72" : "w-16"}
        rounded-2xl overflow-hidden bg-cream/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(20,30,20,0.06)] border border-white/60`}
      style={{ transitionProperty: "width, transform, box-shadow, background-color" }}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 transition-all duration-300
          ${expanded ? "justify-between" : "justify-center"}`}
      >
        {expanded ? (
          <h3 className="font-serif text-lg text-ui-text">Agri-AI</h3>
        ) : (
          <div className="h-7 w-7 flex items-center justify-center rounded-md bg-white/40">
            <FaLeaf className="h-4 w-4 text-leaf" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-leaf transition-colors"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <FiChevronsLeft /> : <FiChevronsRight />}
        </button>
      </div>

      <div className="px-3 pb-4">
        <nav className="space-y-2 mt-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.path}
                title={!expanded ? item.title : ""}
                className={`flex items-center gap-3 p-2 rounded-xl transition-[background-color,box-shadow] duration-250
                  ${expanded ? "pl-3 pr-4" : "justify-center w-full"}
                  ${isActive
                    ? "bg-gradient-to-r from-leaf-3/30 to-leaf-2/20 shadow-inner border border-white/40"
                    : "hover:bg-slate-2/70"}
                  focus:outline-none focus:ring-2 focus:ring-leaf/30`}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-lg
                    ${isActive ? "bg-white/70" : "bg-white/30"} shrink-0`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-leaf" : "text-ui-text"}`} />
                </div>

                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out
                    ${expanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"}`}
                  style={{ transitionProperty: "opacity, transform, width" }}
                >
                  <span className="text-sm font-medium text-ui-text">{item.title}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300
            ${expanded ? "" : "justify-center"}`}
        >
          <FaLeaf className="h-8 w-8 text-leaf shrink-0 rounded-md bg-white/50 p-1" />
          <div
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <p className="font-semibold text-sm text-ui-text">Green Valley Farms</p>
            <p className="text-xs text-gray-500">Agronomist</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
