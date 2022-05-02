import React from 'react'
import { Outlet, useNavigate} from 'react-router-dom';

const useAuth = () => {

    const user = {loggedIn:false};
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const navigate=useNavigate();
    const isAuth=useAuth();
  return isAuth ? <Outlet /> : navigate('/signup') ;
}

export default ProtectedRoutes;