import axios from "axios";

const API = "http://localhost:5000/posts";

// Create a new post
export const createPost = async (postData) => {
  try {
    const res = await axios.post(API, postData);
    return res.data;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err;
  }
};

// Get a single post by ID
export const getPostById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch post:", err);
    throw err;
  }
};

// Update a post
export const updatePost = async (id, postData) => {
  try {
    const res = await axios.put(`${API}/${id}`, postData);
    return res.data;
  } catch (err) {
    console.error("Failed to update post:", err);
    throw err;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    // First, delete all comments associated with this post
    const commentsRes = await axios.get(`http://localhost:5000/comments?postId=${id}`);
    const comments = commentsRes.data;
    
    // Delete each comment
    await Promise.all(
      comments.map(comment => 
        axios.delete(`http://localhost:5000/comments/${comment.id}`)
      )
    );
    
    // Then delete the post itself
    await axios.delete(`http://localhost:5000/posts/${id}`);
  } catch (err) {
    console.error("Failed to delete post:", err);
    throw err;
  }
};
