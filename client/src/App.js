import React from 'react'
import Feed from './components/feed';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import ChangePassword from './components/changePassword';
import EditProfile from './components/editProfile';
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import ProtectedRoutes from './components/protectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path='/feed/:id' element={<Feed />} /> 
          <Route path='/' element={<Navigate to='/feed/:id' />} />
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* </Route> */}
          <Route path='/editprofile/:id' element={<EditProfile />} />
          <Route path='/changepassword/:id' element={<ChangePassword />} />
          <Route path='/logout/:id' element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
