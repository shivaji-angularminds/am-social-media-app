import React from 'react'
import { Outlet, useNavigate,Navigate} from 'react-router-dom';
const token = JSON.parse(localStorage.getItem("token"));

const useAuth = () => {

    const user = {loggedIn:false};
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const navigate=useNavigate();
    const isAuth=useAuth();
  return token ? <Outlet /> :  <Navigate to="/login" /> ;
}

export default ProtectedRoutes;