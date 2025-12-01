import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/Protectedroute";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Auth routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Fallback */}
        <Route path="*" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
