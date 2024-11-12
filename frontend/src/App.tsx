
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateBlogPage from './pages/CreateBlogPage'
import Blog from './pages/Blog'
import Hero from './pages/Hero'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/publish' element={<CreateBlogPage />} />
        <Route path='/profile/:userId' element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
