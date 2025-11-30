import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

        setLoading(true);

        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/posts",
                { title, body, userId: 1 }
            );

            const newPost = { ...response.data, id: Date.now() };

            const savedPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
            savedPosts.push(newPost);
            localStorage.setItem("myPosts", JSON.stringify(savedPosts));

            navigate("/");
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Failed to create post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Post</h2>

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

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>

            <a href="/" className="btn btn-secondary mt-3">Back</a>
        </div>
    );
}

export default CreatePost;
