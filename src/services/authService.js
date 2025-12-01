import axios from "axios";

const API = "http://localhost:5000/users";

export const registerUser = async (user) => {
  // Check if email exists
  const res = await axios.get(`${API}?email=${user.email}`);
  if (res.data.length > 0) {
    return { success: false, message: "Email already exists" };
  }

  // Save the user
  const createRes = await axios.post(API, user);
  return { success: true, data: createRes.data };
};

export const loginUser = async (email, password) => {
  const res = await axios.get(`${API}?email=${email}&password=${password}`);

  if (res.data.length === 0) {
    return { success: false, message: "Invalid email or password" };
  }

  return { success: true, user: res.data[0] };
};
