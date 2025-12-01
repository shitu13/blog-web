import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const fetchPostsAndUsers = async () => {
    try {
      const [postsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/posts"),
        axios.get("http://localhost:5000/users"),
      ]);

      setPosts(postsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts or users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsAndUsers();
  }, []);

  const getAuthor = (userId) => users.find(u => u.id === userId);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading posts...</p>
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
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="mb-2 fw-bold">
                <svg width="32" height="32" fill="currentColor" className="me-3" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2z"/>
                </svg>
                Community Posts
              </h1>
              <p className="mb-0 opacity-75">Share your thoughts with the community</p>
            </div>
            <button
              className="btn btn-light btn-lg shadow-sm mt-3 mt-md-0"
              onClick={() => navigate("/create")}
            >
              <svg width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts Container */}
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {posts.length === 0 && (
              <div className="card border-0 shadow-sm text-center p-5">
                <div className="text-muted mb-3">
                  <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  </svg>
                </div>
                <h4 className="text-muted">No posts yet</h4>
                <p className="text-muted mb-3">Be the first to share something!</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/create")}
                >
                  Create First Post
                </button>
              </div>
            )}

            {posts.map((post) => {
              const author = getAuthor(post.userId);
              const isOwner = currentUser && currentUser.id === post.userId;

              return (
                <div 
                  className="card border-0 shadow-sm mb-4 overflow-hidden hover-card" 
                  key={post.id}
                  style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Gradient Top Border */}
                  <div 
                    style={{ 
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }}
                  />

                  <div className="card-body p-4">
                    {/* Author Section */}
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          fontSize: '1rem'
                        }}
                      >
                        {getInitials(author?.name)}
                      </div>
                      <div className="flex-grow-1">
                        {author ? (
                          <Link 
                            to={`/profile/${author.id}`}
                            className="text-decoration-none"
                            style={{ color: '#764ba2' }}
                          >
                            <h6 className="mb-0 fw-bold">{author.name}</h6>
                          </Link>
                        ) : (
                          <h6 className="mb-0 text-muted">Unknown Author</h6>
                        )}
                        <small className="text-muted">Community Member</small>
                      </div>
                      {isOwner && (
                        <span className="badge rounded-pill" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                          Your Post
                        </span>
                      )}
                    </div>

                    {/* Post Content */}
                    <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                    <p className="card-text text-muted mb-4">
                      {post.body.substring(0, 150)}
                      {post.body.length > 150 ? '...' : ''}
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/posts/${post.id}`)}
                      >
                        <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        Read More
                      </button>

                      {isOwner && (
                        <button
                          className="btn text-white"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                          onClick={() => navigate(`/edit/${post.id}`)}
                        >
                          <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                          Edit Post
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;