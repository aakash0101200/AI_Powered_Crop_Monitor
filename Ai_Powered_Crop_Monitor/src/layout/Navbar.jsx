import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Reports", path: "/reports" },
  { name: "Alerts", path: "/alerts" },
];

const roleOptions = [
  { label: "Farmers", path: "/farmers" },
  { label: "Agronomists", path: "/agronomists" },
  { label: "Field Technicians", path: "/field-technicians" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleBtnRef = useRef(null);
  const roleMenuRef = useRef(null);

  const currentRolePath = roleOptions.find((r) => location.pathname.startsWith(r.path))?.path || "";

  useEffect(() => {
    function onClickOutside(e) {
      if (
        isRoleMenuOpen &&
        roleMenuRef.current &&
        !roleMenuRef.current.contains(e.target) &&
        roleBtnRef.current &&
        !roleBtnRef.current.contains(e.target)
      ) {
        setIsRoleMenuOpen(false);
      }
    }
    function onEscape(e) {
      if (e.key === "Escape") setIsRoleMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isRoleMenuOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-6">
      <nav className="mx-auto flex justify-center">
        <div
          className="
            flex items-center gap-4
            bg-[var(--sidebar-bg)] backdrop-blur-md
            px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4
            rounded-3xl shadow-lg
            text-xs sm:text-sm md:text-base lg:text-lg
          "
        >
          <ul className="flex items-stretch sm:space-x-6 md:space-x-8 lg:space-x-10">
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
