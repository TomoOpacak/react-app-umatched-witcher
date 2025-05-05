import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./../css/style.css";

export default function DesktopNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="nav-container desktop-only" ref={dropdownRef}>
      <div className="top-nav">
        <div></div> {/* Placeholder for layout balance */}
        <ul className="desktop-links">
          <li>
            <Link to="/" className="desktop-link" onClick={handleLinkClick}>
              Započni igru
            </Link>
          </li>
          <li className="dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="desktop-link"
            >
              Karte
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
