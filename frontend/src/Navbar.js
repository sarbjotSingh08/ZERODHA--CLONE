import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-4 border-bottom" style={{ backgroundColor: "#fff" }}>
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img 
              src="media/images/logo.svg" 
              alt="zerodha icon" 
              style={{ width: "30%", marginLeft: "35%" }}
            />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Menu */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-4" style={{marginLeft:"35%"}}>

              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/signup">Signup</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/product">Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/pricing">Pricing</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/support">Support</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}
