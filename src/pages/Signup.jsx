import React, { useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import authService from '../service/authServices'


const Signup = () => {

  const navigate=useNavigate()

  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  
  
  const handleSignup =async (e) => {
    e.preventDefault();
    setEmail('')

    if(password !== confirmPassword){
      setError('Password and Confirm-Password does not match ');
      console.error('Password and Confirm-Password does not match ')
      return
    }

    try {
      await authService.signupNormalUser(username,password,email);
      navigate("/login")
    } catch (error) {
      setError('Signup failed. please try again.');
      console.error("signup error", error )
      navigate('/signup')
      return;
    }

    

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username </label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={username} 
              onChange={(e)=>setUsername(e.target.value)} 
              required 
              placeholder='enter username'
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-mail </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
              placeholder='enter email'
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password </label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
              placeholder='enter password'
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="cnfPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password </label>
            <input 
              type="password" 
              name="cnfPassword" 
              id="cnfPassword" 
              value={confirmPassword} 
              onChange={(e)=>setConfirmPassword(e.target.value)} 
              required 
              placeholder='confirm password'
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">Login</Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default Signup