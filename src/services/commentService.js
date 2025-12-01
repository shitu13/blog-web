import axios from "axios";

const API_URL = "http://localhost:5000/comments";

export const commentService = {
  // Fetch comments for a specific post
  getCommentsByPostId: async (postId) => {
    const res = await axios.get(`${API_URL}?postId=${postId}`);
    return res.data;
  },

  // Create a new comment
  createComment: async (postId, userId, content) => {
    const res = await axios.post(API_URL, {
      postId,
      userId,
      content,
      createdAt: new Date().toISOString()
    });
    return res.data;
  },

  // Optionally: delete comment
  deleteComment: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
};
