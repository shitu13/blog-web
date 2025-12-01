import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  console.log(children);
  

  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  return currentUser ? children : <Navigate to="/login" replace />;
}
