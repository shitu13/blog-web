import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostDetails = async () => {
    try {
      let postRes, commentsRes;

      if (Number(id) > 100) {
        // Post is a locally created post
        const localPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
        const localPost = localPosts.find(p => p.id === Number(id));
        if (!localPost) throw new Error("Post not found locally");

        postRes = { data: localPost };
        commentsRes = { data: [] }; // Local posts have no comments
      } else {
        // Fetch from API
        postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      }

      setPost(postRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error(err);
      setError("Post not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <a href="/" className="btn btn-secondary mb-3">← Back</a>

      <h2>{post.title}</h2>
      <p>{post.body}</p>

      {comments.length > 0 && (
        <>
          <hr />
          <h4>Comments</h4>
          {comments.map(c => (
            <div className="card mb-3" key={c.id}>
              <div className="card-body">
                <h6 className="card-title">{c.name}</h6>
                <p>{c.body}</p>
                <small className="text-muted">{c.email}</small>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostDetails;
