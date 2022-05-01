import React from 'react'
import Feed from './components/feed';
import SignUp from './components/signup';
import Login from './components/login';
import EditProfile from './components/editProfile';
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import ProtectedRoutes from './components/protectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path='/' element={<Feed />} /> 
          <Route path='/feed' element={<Navigate to='/' />} />
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* </Route> */}
          <Route path='/editprofile' element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
