import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Reports", path: "/reports" },
  { name: "Alerts", path: "/alerts" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-6">
      <nav className="mx-auto flex justify-center">
        <ul
          className="
            flex items-stretch
            sm:space-x-6 md:space-x-8 lg:space-x-10
            bg-[var(--sidebar-bg)] backdrop-blur-md
            px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4
            rounded-3xl shadow-lg
            text-xs sm:text-sm md:text-base lg:text-lg
          "
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`px-2 transition-colors ${
                  location.pathname === item.path
                    ? "font-bold text-[var(--primary-color)]"
                    : "text-[var(--text-color)] hover:text-[var(--primary-color)]"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
