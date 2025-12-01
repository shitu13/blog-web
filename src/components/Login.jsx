import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await loginUser(form.email, form.password);

    setLoading(false);

    if (!result.success) {
      setErrors({ login: result.message }); // global login error
      return;
    }


    localStorage.setItem("current_user", JSON.stringify(result.user));
    navigate("/");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      {/* Animated Pattern Background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: '0.3'
        }}
      />

      {/* Floating Orbs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.1)',
          top: '-100px',
          left: '-100px',
          filter: 'blur(60px)'
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '250px',
          height: '250px',
          background: 'rgba(255,255,255,0.1)',
          bottom: '-80px',
          right: '-80px',
          filter: 'blur(60px)'
        }}
      />

      {/* Main Login Card */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-white mb-4">
              <div className="mb-3">
                <svg width="80" height="80" fill="currentColor" viewBox="0 0 16 16" className="drop-shadow">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2z" />
                </svg>
              </div>
              <h2 className="fw-bold mb-2">Welcome Back</h2>
              <p className="opacity-75">Login to continue to your account</p>
            </div>

            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold small text-muted">EMAIL ADDRESS</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className={`form-control form-control-lg ps-5 ${errors.email ? "is-invalid" : ""}`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        style={{
                          borderRadius: '12px',
                          border: errors.email ? '2px solid #dc3545' : '2px solid #e2e8f0',
                          padding: '14px 14px 14px 48px'
                        }}
                      />
                    </div>
                    {errors.email && (
                      <small className="text-danger d-flex align-items-center mt-2">
                        <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-semibold small text-muted mb-0">PASSWORD</label>
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-decoration-none p-0"
                        style={{ color: '#667eea' }}
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control form-control-lg ps-5 pe-5 ${errors.password ? "is-invalid" : ""}`}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        style={{
                          borderRadius: '12px',
                          border: errors.password ? '2px solid #dc3545' : '2px solid #e2e8f0',
                          padding: '14px 48px'
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ border: 'none', background: 'none' }}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <small className="text-danger d-flex align-items-center mt-2">
                        <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        {errors.password}
                      </small>
                    )}
                  </div>

                  {errors.login && (
                    <small className="text-danger d-flex align-items-center mt-2">
                      <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                      {errors.login}
                    </small>
                  )}


                  {/* Remember Me */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px'
                      }}
                    />
                    <label
                      className="form-check-label text-muted ms-2"
                      htmlFor="rememberMe"
                      style={{ cursor: 'pointer' }}
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-lg w-100 text-white mb-3"
                    disabled={loading}
                    style={{
                      background: loading ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <svg width="18" height="18" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="position-relative text-center my-4">
                    <hr style={{ borderTop: '1px solid #e2e8f0' }} />
                    <span
                      className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small"
                    >
                      New to our platform?
                    </span>
                  </div>
                </form>
                {/* Register Link */}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="btn btn-outline-secondary btn-lg w-100"
                    style={{
                      borderRadius: '12px',
                      padding: '14px',
                      borderWidth: '2px',
                      fontWeight: '600'
                    }}
                  >
                    Create Account
                  </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <small className="text-white opacity-75">
                Protected by industry-standard encryption
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}