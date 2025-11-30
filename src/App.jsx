import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Posts from './components/Posts'
import PostDetails from './components/PostDetails'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
    </>
      
  )
}

export default App
