import React,{useEffect,useState} from 'react'
import Feed from './components/feed';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import ChangePassword from './components/changePassword';
import EditProfile from './components/editProfile';
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import ProtectedRoutes from './components/protectedRoutes';

function App() {

  const token = JSON.parse(localStorage.getItem("token"));

console.log(token)
  


  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/feed' element={  <Feed  />} /> 
          <Route path='/editprofile/:id' element={<EditProfile />} />

          <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Navigate to='/feed' />} />

          <Route path='/changepassword/:id' element={<ChangePassword />} />
          <Route path='/logout/:id' element={<Logout />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
