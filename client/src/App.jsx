import './App.css'
import CardDetails from './components/CardDetails'
import Edit from './components/Edit'
import Home from './components/Home'
import Listings from './components/Listings'
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'
import PrivateAuthRoute from './components/PrivateAuthRoute'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UserPosts from './components/UserPosts'
import Users from './components/Users'
import Faq from './components/faq'
import { Route, Routes } from 'react-router-dom'

// app.jsx
function App() {
  return (
    <div className="container">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/listings' element={<Listings/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/listings/new' element= {<PrivateAuthRoute><NewPost/></PrivateAuthRoute>} />
          <Route path="/listings/details/:id" element={<CardDetails/>} />
          <Route path="/listings/edit/:id" element={<Edit/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/posts/:user' element={<UserPosts/>}/>
        </Routes>
      <div className='bg-img'></div>
      <div className='bg-color'></div>
    </div>
    
  )
}

export default App;