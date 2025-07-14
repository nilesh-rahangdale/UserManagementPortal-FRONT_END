import React from 'react'
import { useState, useEffect } from 'react'
import authService from '../service/authServices'

const PasswordModal = ({ isOpen, onClose, onSave }) => {
  const [error, setError] = useState()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  useEffect(() => {
  if (isOpen) {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
  }
}, [isOpen]);


  const handleSave=async()=>{
    if(newPassword !== confirmNewPassword) {
      setError('New Password and Confirm Password do not match.')
      return;
    }
    try {
      await authService.changePassword(oldPassword,newPassword,confirmNewPassword);
      onSave();
      onClose();
    } catch (error) {
      setError('Failed to change password. Please try again.');
      console.error('Failed to change password.',error)
    }

  }

  if (!isOpen) { return null; }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input 
              type="password" 
              name="oldPassword" 
              id="oldPassword"
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              id="newPassword"
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="confirmNewPassword" 
              id="confirmNewPassword"
              value={confirmNewPassword} 
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >Cancel</button>
            <button 
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users.');
      console.error(error);
    }
  };

  fetchUsers();
}, []);

  const handleDeleteUser = async (id) => {
    try {
      await authService.deleteUser(id)
      setUsers(users.filter(user => user.id !== id))
    } catch (error) {
      setError('Error Deleting user. ')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (error) return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Manage Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const [loading, setLoading] = useState(true)

  // Admin
  const [isAdmin, setIsAdmin] = useState(false)

  // Profile editing status
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({})

  // Passmodal Open
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  useEffect( ()=>{
    const starter=async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser)
        setEditedUser(currentUser)

        // Check for admin role
        const userRole = currentUser.roles || [];
        setIsAdmin(userRole.includes('ROLE_ADMIN'));
      } catch (error) {
        console.error("Error fetching user data.")
      } finally {
        setLoading(false);
      }
    };
    starter();
  }
    , []
  )

  const handleEditDetails = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleSave = async () => {
    try {
      await authService.updateUser(editedUser);
      setUser(editedUser)
      setIsEditing(!isEditing)
    } catch (error) {
      console.error("failed to update. ", error)
    }
  }

  const handleCancel = () => {
    setEditedUser({...user});
    setIsEditing(!isEditing)
  }

   if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
   }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <div 
            onClick={()=>setActiveSection('home')}
            className={`block px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
              activeSection === 'home' 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >Home</div>
          <div 
            onClick={()=>setActiveSection('profile')}
            className={`block px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
              activeSection === 'profile' 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >Profile</div>
          {
            isAdmin && (
              <div 
                onClick={()=>setActiveSection('users')}
                className={`block px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
                  activeSection === 'users' 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >Users</div>
            )
          }
          <div 
            onClick={()=>setActiveSection('settings')}
            className={`block px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
              activeSection === 'settings' 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >Settings</div>
          
        </nav>
      </div>
      {/* Home section */}
      <div className="flex-1 overflow-auto">
        {activeSection === 'home' &&
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user.username}!</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis expedita quisquam, esse in quibusdam dignissimos mollitia nihil aliquid quos numquam eos ab nisi ea, laborum nostrum! Repellendus, libero consectetur exercitationem totam veritatis atque, quasi facilis placeat ea, provident nostrum harum. Architecto quam totam sit, eos adipisci officiis iure ratione corporis?
                </p>
              </div>
            </div>
          </div>
        }

        {/* Profile Section */}
        {activeSection === 'profile' &&
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Profile Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    id="username"
                    value={isEditing ? editedUser.username : user.username}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'border-gray-200 bg-gray-50'
                    } outline-none`}
                  />
                </div>

                {!isEditing ? (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleEditDetails}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >Edit</button>
                    <button
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >Change Password</button>
                  </div>
                ) : (
                  <div className="flex space-x-4 pt-4">
                    <button 
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >Save</button>
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        }

        
        {/* Setting Section */}
        {
          activeSection === 'settings' &&
          (
            <div className="p-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit ut illo, esse ipsa totam cumque assumenda! Consequatur, alias placeat debitis sequi qui cum voluptate at similique nisi iure dolor, nobis eveniet voluptates fugiat, facilis autem reiciendis doloribus itaque! Quae id alias beatae saepe officiis, ea dolor doloribus perspiciatis distinctio veniam.
                  </p>
                </div>
              </div>
            </div>
          )
        }
        {/* Users Section */}
        {
          activeSection === 'users' && isAdmin &&
          (
            <div className="p-8">
              <UserTable />
            </div>
          )
        }

        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={()=>setIsPasswordModalOpen(false)}
          onSave={() => console.log('Password Changed Successfully. ')}
        />
      </div>

    </div>
  )
}

export default Dashboard