import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCheck } from "lucide-react";

const roleOptions = [
  { label: "Farmers", path: "/farmers" },
  { label: "Agronomists", path: "/agronomists" },
  { label: "Field Technicians", path: "/field-technicians" },
];

function RoleSwitcher({ className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const currentRolePath = roleOptions.find((r) => location.pathname.startsWith(r.path))?.path || "";

  useEffect(() => {
    function onClickOutside(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div className={`${className}`}>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[var(--sidebar-bg)] text-[var(--text-color)] hover:border-white/40 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Select role"
      >
        <UserCheck className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[var(--sidebar-bg)] shadow-xl backdrop-blur-md z-50"
        >
          <ul className="py-1">
            {roleOptions.map((role) => {
              const isActive = currentRolePath === role.path;
              return (
                <li key={role.path}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate(role.path);
                    }}
                    className={`w-full text-left px-4 py-2 transition ${
                      isActive
                        ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)]"
                        : "text-[var(--text-color)] hover:bg-white/10"
                    }`}
                    role="menuitemradio"
                    aria-checked={isActive}
                  >
                    {role.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;


