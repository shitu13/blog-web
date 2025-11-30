import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
    const postToEdit = localPosts.find(p => p.id === Number(id));

    if (!postToEdit) {
      alert("Post not found");
      navigate("/");
      return;
    }

    setTitle(postToEdit.title);
    setBody(postToEdit.body);
    setLoading(false);
  }, [id, navigate]);


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


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const localPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
    const updatedPosts = localPosts.map(p => {
      if (p.id === Number(id)) {
        return { ...p, title, body };
      }
      return p;
    });

    localStorage.setItem("myPosts", JSON.stringify(updatedPosts));
    navigate("/");
  };


  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className={`form-control ${errors.body ? "is-invalid" : ""}`}
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {errors.body && (
            <small className="text-danger">{errors.body}</small>
          )}
        </div>

        <button className="btn btn-success">Update Post</button>
        <a href="/" className="btn btn-secondary ms-2">Back</a>
      </form>
    </div>
  );
}

export default EditPost;
