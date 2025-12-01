import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (value.length >= 10) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(Math.min(strength, 4));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await registerUser(form);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    navigate("/login");
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "#e2e8f0";
    if (passwordStrength <= 2) return "#ef4444";
    if (passwordStrength === 3) return "#f59e0b";
    return "#10b981";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{ background: '#f8f9fa' }}
    >
      {/* Animated Background Gradient Orbs */}
      <div 
        className="position-absolute rounded-circle"
        style={{
          width: '500px',
          height: '500px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: '0.1',
          top: '-150px',
          right: '-150px',
          filter: 'blur(80px)'
        }}
      />
      <div 
        className="position-absolute rounded-circle"
        style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
          opacity: '0.1',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(80px)'
        }}
      />

      {/* Main Card */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
              <div className="row g-0">
                {/* Left Side - Branding */}
                <div 
                  className="col-md-5 text-white p-5 d-flex flex-column justify-content-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <div className="mb-4">
                    <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2z"/>
                    </svg>
                  </div>
                  <h2 className="fw-bold mb-3">Join Our Community</h2>
                  <p className="mb-4 opacity-75">Create an account to start sharing your thoughts and connect with others.</p>
                  
                  <div className="mt-auto">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                      </div>
                      <span>Share your ideas</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                      </div>
                      <span>Connect with others</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                      </div>
                      <span>Build your profile</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="col-md-7 p-5">
                  <div className="text-end mb-4">
                    <small className="text-muted">Already have an account?</small>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => navigate("/login")}
                      style={{ borderRadius: '20px' }}
                    >
                      Login
                    </button>
                  </div>

                  <h3 className="fw-bold mb-2">Create Account</h3>
                  <p className="text-muted mb-4">Get started with your free account</p>

                  <div onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold small text-muted">FULL NAME</label>
                      <div className="position-relative">
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ps-5 ${errors.name ? "is-invalid" : ""}`}
                          placeholder="John Doe"
                          value={form.name}
                          onChange={handleChange}
                          style={{ 
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            padding: '12px 12px 12px 45px'
                          }}
                        />
                      </div>
                      {errors.name && (
                        <small className="text-danger d-flex align-items-center mt-1">
                          <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                          {errors.name}
                        </small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold small text-muted">EMAIL ADDRESS</label>
                      <div className="position-relative">
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                          </svg>
                        </span>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ps-5 ${errors.email ? "is-invalid" : ""}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          style={{ 
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            padding: '12px 12px 12px 45px'
                          }}
                        />
                      </div>
                      {errors.email && (
                        <small className="text-danger d-flex align-items-center mt-1">
                          <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                          {errors.email}
                        </small>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold small text-muted">PASSWORD</label>
                      <div className="position-relative">
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                          </svg>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`form-control ps-5 pe-5 ${errors.password ? "is-invalid" : ""}`}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          style={{ 
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            padding: '12px 45px 12px 45px'
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ border: 'none', background: 'none' }}
                        >
                          {showPassword ? (
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      {/* Password Strength */}
                      {form.password && (
                        <div className="mt-2">
                          <div className="d-flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className="flex-grow-1"
                                style={{
                                  height: '4px',
                                  borderRadius: '2px',
                                  background: level <= passwordStrength ? getStrengthColor() : '#e2e8f0',
                                  transition: 'background 0.3s'
                                }}
                              />
                            ))}
                          </div>
                          <small style={{ color: getStrengthColor() }}>
                            {getStrengthText()} password
                          </small>
                        </div>
                      )}
                      
                      {errors.password && (
                        <small className="text-danger d-flex align-items-center mt-1">
                          <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                          {errors.password}
                        </small>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-lg w-100 text-white mt-3"
                      disabled={loading}
                      style={{
                        background: loading ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <svg width="16" height="16" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-muted small mt-3 mb-0">
                      By signing up, you agree to our Terms and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}