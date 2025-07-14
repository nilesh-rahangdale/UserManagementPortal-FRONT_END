import React, { useState } from 'react'
import authService from '../service/authServices'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Login=()=>{

  const navigate=useNavigate()

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')

  const handleLogin=async (e)=>{
    e.preventDefault()
    setError('')

    try {
      await authService.login(username,password);
      navigate('/')
    } catch (error) {
      setError('Login failed. Try Again.')
      console.error('Login error', error)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
        {
          error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )
        }
        <form onSubmit={handleLogin} className="space-y-6">

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">username </label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">password </label>
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

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Dont have an Account <Link to={'/signup'} className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">Sign up</Link>
        </p>
        </form>
      </div>
    </div>
  )
}

export default Login