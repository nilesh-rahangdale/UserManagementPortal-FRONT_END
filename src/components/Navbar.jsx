import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../service/authServices'

function Navbar() {
    const navigate = useNavigate();
    
    const user = authService.getCurrentUser();
    // const user=false;
    // const user = { username: "bbfjdbfjdsbfkjjdbbfjksbdbkfbdkjsfbkjsbff" }; // Mock user for testing

    const handleLogout = async () => {
        try {
            await authService.logout()
            navigate('/login');
        } catch (error) {
            console.error("Logout failed ", error)
            return;
        }
    }

    return (
        <nav className="flex justify-between items-center text-white p-4 bg-blue-600 shadow-lg w-screen">
            <Link className='text-xl font-bold hover:text-blue-200 transition-colors' to="/">
                User Management
            </Link>
            
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className='hidden md:block text-sm'>
                            Welcome, {user.username}
                        </span>
                        <Link 
                            to="/dashboard" 
                            className={`${linkStyle}  hover:text-blue-200`}
                        >
                            Dashboard
                        </Link>
                        <button 
                            className={`${buttonStyle} bg-red-600 hover:bg-red-700`}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            className={buttonStyle} 
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                        <button 
                            className={buttonStyle} 
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

// Clean, valid Tailwind classes
const buttonStyle = "px-4 py-2 border border-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
const linkStyle = "px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium text-white"

export default Navbar