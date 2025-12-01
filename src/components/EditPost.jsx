import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {deletePost} from '../services/postService'
import axios from "axios";
import { useToast } from "../context/ToastContext";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalPost, setOriginalPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);

        if (res.data.userId !== currentUser.id) {
          alert("You are not authorized to edit this post.");
          navigate("/");
          return;
        }

        setTitle(res.data.title);
        setBody(res.data.body);
        setOriginalPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Post not found");
        navigate("/");
      }
    };

    fetchPost();
  }, [id, navigate, currentUser.id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);

    try {
      await axios.put(`http://localhost:5000/posts/${id}`, {
        title,
        body,
        userId: currentUser.id
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update post.");
    } finally {
      setSaving(false);
    }
  };

  const { showToast } = useToast();
  const handleDelete = async () => {
  try {
    await deletePost(id);
    showToast("Post deleted successfully!", "error");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Failed to delete post.");
  }
};

  const hasChanges = () => {
    if (!originalPost) return false;
    return title !== originalPost.title || body !== originalPost.body;
  };

  const handleDiscard = () => {
    if (hasChanges()) {
      if (window.confirm("Discard all changes?")) {
        setTitle(originalPost.title);
        setBody(originalPost.body);
        setErrors({});
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div 
        className="text-white py-4 mb-4 shadow"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light btn-sm me-3"
                onClick={() => navigate(-1)}
                style={{ borderRadius: '50px' }}
              >
                <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back
              </button>
              <div>
                <h1 className="mb-1 fw-bold d-flex align-items-center">
                  <svg width="28" height="28" fill="currentColor" className="me-3" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                  Edit Post
                </h1>
                <p className="mb-0 opacity-75 small">Make changes to your post</p>
              </div>
            </div>
            {hasChanges() && (
              <span className="badge bg-warning text-dark mt-2 mt-md-0">
                <svg width="14" height="14" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                Unsaved changes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Editor Info Banner */}
            <div className="card border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {getInitials(currentUser.name)}
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted d-block">Editing as</small>
                    <strong>{currentUser.name}</strong>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <svg width="14" height="14" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Main Edit Card */}
            <div className="card border-0 shadow-lg overflow-hidden">
              <div style={{ height: '6px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }} />

              <div className="card-body p-5">
                <div onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark mb-2 d-flex align-items-center justify-content-between">
                      <span>
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                        Post Title
                      </span>
                      <small className="text-muted fw-normal">{title.length}/100</small>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Enter post title..."
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
                  </div>

                  {/* Body */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark mb-2 d-flex align-items-center justify-content-between">
                      <span>
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
                          <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"/>
                        </svg>
                        Post Content
                      </span>
                      <small className="text-muted fw-normal">{body.length} chars</small>
                    </label>
                    <textarea
                      className={`form-control ${errors.body ? "is-invalid" : ""}`}
                      rows="10"
                      placeholder="Write your content..."
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
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 flex-wrap pt-3 border-top">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-lg text-white px-5"
                      disabled={saving || !hasChanges()}
                      style={{ 
                        background: saving || !hasChanges() ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '50px'
                      }}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    
                    {hasChanges() && (
                      <button
                        type="button"
                        onClick={handleDiscard}
                        className="btn btn-outline-warning btn-lg px-4"
                        disabled={saving}
                        style={{ borderRadius: '50px' }}
                      >
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                        Discard
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate(`/posts/${id}`)}
                      className="btn btn-outline-secondary btn-lg px-4"
                      disabled={saving}
                      style={{ borderRadius: '50px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div 
            className="card border-0 shadow-lg" 
            style={{ maxWidth: '400px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-4 text-center">
              <div className="text-danger mb-3">
                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
              </div>
              <h4 className="mb-3">Delete Post?</h4>
              <p className="text-muted mb-4">This action cannot be undone. Your post will be permanently deleted.</p>
              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-danger px-4"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPost;