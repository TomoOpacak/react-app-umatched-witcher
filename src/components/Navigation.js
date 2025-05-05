import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./../css/navigation-style.css";

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="nav-container" ref={menuRef}>
      <div className="top-nav">
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="dropdown">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Services ▾
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/design" onClick={handleLinkClick}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link to="/development" onClick={handleLinkClick}>
                    Development
                  </Link>
                </li>
                <li>
                  <Link to="/seo" onClick={handleLinkClick}>
                    SEO
                  </Link>
                </li>
                <li>
                  <Link to="/marketing" onClick={handleLinkClick}>
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/consulting" onClick={handleLinkClick}>
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link to="/support" onClick={handleLinkClick}>
                    Support
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
