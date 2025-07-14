import React, { Children } from 'react'
import authService from '../service/authServices'
import { Navigate } from 'react-router-dom';

const ProtectedRoute=({children})=> {
  const isAuthenticated=authService.isAuthenticated();
  // const isAuthenticated=true;

  if(!isAuthenticated){
    return(
      <Navigate to="/login" />
    )
  }

  return(children);

  
}

export default ProtectedRoute