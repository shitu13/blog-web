import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
