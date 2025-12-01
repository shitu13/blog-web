import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { deletePost } from '../services/postService';
import { useToast } from "../context/ToastContext";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const postRes = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(postRes.data);

      if (postRes.data.userId) {
        const authorRes = await axios.get(`http://localhost:5000/users/${postRes.data.userId}`);
        setAuthor(authorRes.data);
      }

      const usersRes = await axios.get("http://localhost:5000/users");
      setUsers(usersRes.data);

      const commentsRes = await axios.get(`http://localhost:5000/comments?postId=${id}`);
      setComments(commentsRes.data);
      setLoadingComments(false);
    } catch (err) {
      console.error(err);
      setError("Post not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAuthorName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      postId: id,
      userId: currentUser.id,
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:5000/comments", commentData);
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Failed to add comment.");
    }
  };

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

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg border-0" style={{ maxWidth: '400px' }}>
          <div className="card-body text-center p-5">
            <div className="text-danger mb-3">
              <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
            </div>
            <h4 className="text-danger mb-3">{error}</h4>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isOwner = currentUser && currentUser.id === post.userId;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Back Button */}
        <button
          className="btn btn-outline-secondary mb-4 shadow-sm"
          onClick={() => navigate("/")}
        >
          <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Posts
        </button>

        {/* Main Post Card */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg overflow-hidden">
              {/* Gradient Top Border */}
              <div
                style={{
                  height: "6px",
                  background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                }}
              />

              <div className="card-body p-5">
                {/* Author Section */}
                <div className="d-flex align-items-center mb-4 pb-4 border-bottom">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                    style={{
                      width: "56px",
                      height: "56px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: "1.2rem",
                    }}
                  >
                    {getInitials(author?.name)}
                  </div>
                  <div className="flex-grow-1">
                    {author ? (
                      <>
                        <h6 className="mb-1 fw-bold">
                          <a
                            href={`/profile/${author.id}`}
                            className="text-decoration-none"
                            style={{ color: "#764ba2" }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/profile/${author.id}`);
                            }}
                          >
                            {author.name}
                          </a>
                        </h6>
                        <small className="text-muted">
                          <svg width="14" height="14" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                          </svg>
                          {author.email}
                        </small>
                      </>
                    ) : (
                      <h6 className="mb-0 text-muted">Unknown Author</h6>
                    )}
                  </div>
                  {isOwner && (
                    <span
                      className="badge rounded-pill"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      Your Post
                    </span>
                  )}
                </div>

                {/* Post Title */}
                <h1 className="fw-bold mb-4" style={{ color: "#2d3748", lineHeight: "1.3" }}>
                  {post.title}
                </h1>

                {/* Post Content */}
                <div
                  className="post-content"
                  style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#4a5568" }}
                >
                  {post.body.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-3">{paragraph}</p>
                  ))}
                </div>

                {/* Action Buttons */}
                {isOwner && (
                  <div className="mt-5 pt-4 border-top">
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn text-white px-4"
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                        onClick={() => navigate(`/edit/${post.id}`)}
                      >
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        Edit Post
                      </button>
                      <button
                        className="btn btn-outline-danger px-4"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                        Delete Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="card border-0 shadow-lg overflow-hidden mt-4">
              <div
                style={{
                  height: '6px',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                }}
              />
              <div className="card-body p-5">
                <h4 className="mb-4 d-flex align-items-center">
                  <svg width="24" height="24" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                  </svg>
                  Comments ({comments.length})
                </h4>

                {loadingComments ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="text-muted mb-3">
                      <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                      </svg>
                    </div>
                    <h5 className="text-muted mb-2">No comments yet</h5>
                    <p className="text-muted mb-0">Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="border-0 rounded-3 p-4 mb-3 position-relative"
                        style={{
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                          borderLeft: '4px solid #667eea'
                        }}
                      >
                        <div className="d-flex align-items-start">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3 flex-shrink-0"
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              fontSize: "1rem",
                            }}
                          >
                            {getInitials(getAuthorName(c.userId))}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <strong className="fw-bold" style={{ color: '#2d3748' }}>
                                {getAuthorName(c.userId)}
                              </strong>
                              <small className="text-muted">
                                <svg width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                {new Date(c.createdAt).toLocaleString()}
                              </small>
                            </div>
                            <p className="mb-0" style={{ color: '#4a5568', lineHeight: '1.6' }}>{c.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Section */}
                {currentUser && (
                  <div className="mt-4 pt-4 border-top">
                    <h6 className="mb-3 fw-bold">Add a Comment</h6>
                    <div className="d-flex align-items-start">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3 flex-shrink-0"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          fontSize: "1rem",
                        }}
                      >
                        {getInitials(currentUser.name)}
                      </div>
                      <div className="flex-grow-1">
                        <textarea
                          className="form-control mb-3"
                          rows="3"
                          placeholder="Share your thoughts..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          style={{
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            padding: '12px 16px',
                            resize: 'vertical'
                          }}
                        ></textarea>
                        <button
                          className="btn text-white px-4"
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          style={{
                            background: newComment.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#94a3b8',
                            border: 'none',
                            borderRadius: '10px'
                          }}
                        >
                          <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                          </svg>
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

export default PostDetails;