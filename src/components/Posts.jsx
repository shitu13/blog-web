import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const localPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");

            // Merge local + API posts
            setPosts([...localPosts, ...response.data]);

        } catch (err) {
            setError("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Posts</h2>
                <a href="/create" className="btn btn-primary">+ Create Post</a>
            </div>


            {posts.map((post) => (
                <div className="card mb-3" key={post.id}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body.substring(0, 70)}...</p>

                        <a href={`/posts/${post.id}`} className="btn btn-primary btn-sm me-2">
                            View
                        </a>
                        <a href={`/edit/${post.id}`} className="btn btn-warning btn-sm">
                            Edit
                        </a>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Posts;
