import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
          style={{ fontSize: '1.5rem' }}
        >
          <svg 
            width="32" 
            height="32" 
            fill="currentColor" 
            className="me-2" 
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2z"/>
          </svg>
          <span className="d-none d-sm-inline">My Blog</span>
          <span className="d-inline d-sm-none">Blog</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {currentUser ? (
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link 
                  className="nav-link px-3 py-2 rounded" 
                  to="/"
                  style={{ transition: 'background 0.3s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                  </svg>
                  All Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link px-3 py-2 rounded" 
                  to="/create"
                  style={{ transition: 'background 0.3s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  Create
                </Link>
              </li>
              
              {/* User Profile Dropdown */}
              <li className="nav-item dropdown ms-lg-2">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center px-3 py-2 rounded"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ transition: 'background 0.3s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <div 
                    className="rounded-circle bg-white d-inline-flex align-items-center justify-content-center me-2 fw-bold"
                    style={{
                      width: '32px',
                      height: '32px',
                      fontSize: '0.75rem',
                      color: '#764ba2'
                    }}
                  >
                    {getInitials(currentUser.name)}
                  </div>
                  <span className="d-none d-lg-inline">{currentUser.name}</span>
                </a>
                <ul 
                  className="dropdown-menu dropdown-menu-end shadow border-0 mt-2"
                  style={{ minWidth: '200px' }}
                >
                  <li>
                    <div className="px-3 py-2 border-bottom">
                      <small className="text-muted d-block">Signed in as</small>
                      <strong className="d-block text-truncate">{currentUser.name}</strong>
                      <small className="text-muted text-truncate d-block">{currentUser.email}</small>
                    </div>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2" to="/profile">
                      <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                      </svg>
                      My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link 
                  className="nav-link px-3 py-2 rounded" 
                  to="/login"
                  style={{ transition: 'background 0.3s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                  Login
                </Link>
              </li>
              <li className="nav-item ms-lg-2">
                <Link 
                  className="btn btn-light fw-semibold px-4 py-2"
                  to="/register"
                  style={{ borderRadius: '50px' }}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;