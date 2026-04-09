import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { NAV_LINKS, APP_NAME } from "@lib/constants";
import { useAuth } from "@store/authStore";
import { authAPI } from "@services/api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight text-gray-900">
          {APP_NAME}
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-black
                ${isActive ? "text-black" : "text-gray-500"}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Hi, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-black text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-5 h-0.5 bg-gray-900 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-900 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-900 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-black text-white text-sm font-medium px-4 py-2.5 text-center hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>

          {!isAuthenticated ? (
            <div className="mt-3 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white bg-black px-4 py-2 text-center rounded-md hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="mt-3 bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
