import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-3 mt-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-md-4">
            <h3 className="fw-bold mb-3">MyBlog</h3>
            <p className="opacity-75">
              A simple blogging platform built with ❤️ using React.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/create" className="text-white opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i> Create Post
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-white opacity-75 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i> My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Connect</h5>

            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-white fs-4"
                style={{ opacity: "0.8" }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white fs-4"
                style={{ opacity: "0.8" }}
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white fs-4"
                style={{ opacity: "0.8" }}
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="my-4" style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }} />

        <p className="text-center mb-0 opacity-75">
          © {new Date().getFullYear()} MyBlog — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
