import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import { useToast } from "../context/ToastContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length < 6) {
      newErrors.title = "Title must be at least 6 characters.";
    }

    if (!body.trim()) {
      newErrors.body = "Body is required.";
    } else if (body.trim().length < 6) {
      newErrors.body = "Body must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const {showToast} = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await createPost({
        title,
        body,
        userId: currentUser.id
      });

      showToast("Post created successfully!", "success");
      // Success feedback
      navigate("/");
    } catch (err) {
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section with Gradient */}
      <div 
        className="text-white py-5 mb-4 shadow"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-light btn-sm me-3"
              onClick={() => navigate("/")}
              style={{ borderRadius: '50px' }}
            >
              <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back
            </button>
            <div className="flex-grow-1">
              <h1 className="mb-2 fw-bold">
                <svg width="32" height="32" fill="currentColor" className="me-3" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                Create New Post
              </h1>
              <p className="mb-0 opacity-75">Share your thoughts with the community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Author Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '1.2rem'
                    }}
                  >
                    {getInitials(currentUser.name)}
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">Posting as</h6>
                    <p className="mb-0 text-muted">{currentUser.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="card border-0 shadow-lg overflow-hidden">
              {/* Gradient Top Border */}
              <div 
                style={{ 
                  height: '6px',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                }}
              />

              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {/* Title Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark mb-2">
                      <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                      </svg>
                      Post Title
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Enter an engaging title for your post..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ 
                        borderRadius: '10px',
                        border: errors.title ? '2px solid #dc3545' : '2px solid #e2e8f0',
                        padding: '12px 16px'
                      }}
                    />
                    {errors.title && (
                      <div className="mt-2">
                        <small className="text-danger d-flex align-items-center">
                          <svg width="14" height="14" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                          {errors.title}
                        </small>
                      </div>
                    )}
                    <small className="text-muted mt-1 d-block">
                      {title.length}/100 characters
                    </small>
                  </div>

                  {/* Body Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark mb-2">
                      <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
                        <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"/>
                      </svg>
                      Post Content
                    </label>
                    <textarea
                      className={`form-control ${errors.body ? "is-invalid" : ""}`}
                      rows="8"
                      placeholder="Write your post content here... Share your ideas, stories, or insights."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      style={{ 
                        borderRadius: '10px',
                        border: errors.body ? '2px solid #dc3545' : '2px solid #e2e8f0',
                        padding: '12px 16px',
                        resize: 'vertical'
                      }}
                    ></textarea>
                    {errors.body && (
                      <div className="mt-2">
                        <small className="text-danger d-flex align-items-center">
                          <svg width="14" height="14" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                          {errors.body}
                        </small>
                      </div>
                    )}
                    <small className="text-muted mt-1 d-block">
                      {body.length} characters
                    </small>
                  </div>

                  {/* Tips Card */}
                  <div className="alert alert-light border-0 mb-4" style={{ background: '#f8f9fa' }}>
                    <div className="d-flex">
                      <div className="me-3" style={{ color: '#667eea' }}>
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h6 className="mb-2 fw-bold">Writing Tips</h6>
                        <ul className="mb-0 small text-muted ps-3">
                          <li>Make your title clear and engaging</li>
                          <li>Organize your content with proper paragraphs</li>
                          <li>Proofread before publishing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3 flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-lg text-white px-5"
                      disabled={loading}
                      style={{ 
                        background: loading ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '50px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                          </svg>
                          Publish Post
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="btn btn-outline-secondary btn-lg px-4"
                      disabled={loading}
                      style={{ borderRadius: '50px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;