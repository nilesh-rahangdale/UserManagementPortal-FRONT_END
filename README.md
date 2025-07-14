# 🚀 User Management Portal





---

## ✨ Features

### 🔐 **Authentication & Security**
- **Secure Login/Signup** - JWT-based authentication
- **Protected Routes** - Route-level access control
- **Session Management** - Automatic session handling
- **Password Management** - Change password functionality

### 👥 **User Management**
- **Profile Management** - Edit user details
- **Admin Dashboard** - Comprehensive user administration
- **User CRUD Operations** - Create, Read, Update, Delete users
- **Role-Based Access** - Admin-only features

### 🎨 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach
- **Beautiful Animations** - Smooth transitions and hover effects
- **Loading States** - Enhanced user feedback

---

## 🚀 Quick Start

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nilesh-rahangdale/UserManagementPortal-FRONT_END
   cd UserManagementPortal-FRONT_END
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
src/
├── 📄 App.jsx                 # Main application component
├── 📄 main.jsx               # Application entry point
├── 🎨 index.css              # Global styles with Tailwind
├── 📁 components/
│   ├── 🔒 ProtectedRoute.jsx  # Route protection component
│   └── 🧭 Navbar.jsx          # Navigation component
├── 📁 pages/
│   ├── 🏠 Mainpage.jsx        # Landing page
│   ├── 🔑 Login.jsx           # Login page
│   ├── ✍️ Signup.jsx          # Registration page
│   └── 📊 Dashboard.jsx       # User dashboard
└── 📁 service/
    └── 🔧 authServices.js     # API service layer
```

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 19.x |
| **Vite** | Build Tool | 7.x |
| **Tailwind CSS** | Styling | 4.x |
| **React Router** | Routing | 7.x |
| **Axios** | HTTP Client | 1.x |
| **ESLint** | Code Linting | 9.x |

---

## 🎯 Key Components

### 🔐 Authentication Service
```javascript
// Comprehensive auth service with:
- User registration and login
- JWT token management
- Password change functionality
- User profile updates
- Admin user management
```

### 🛡️ Protected Routes
```jsx
// Route protection based on authentication status
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### 📊 Dashboard Features
- **Home** - Welcome dashboard
- **Profile** - User profile management
- **Users** - Admin user management (admin only)
- **Settings** - Application settings

---

## 🎨 UI Highlights

### 🌈 **Modern Design System**
- **Gradient Backgrounds** - Beautiful blue-purple gradients
- **Glass Morphism** - Modern card designs
- **Micro Interactions** - Smooth hover effects
- **Responsive Grid** - Mobile-first layouts

### 🎭 **Interactive Elements**
- **Form Validation** - Real-time validation feedback
- **Loading States** - Spinners and skeleton screens
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Confirmation messages

---

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend Integration
The frontend expects a REST API with the following endpoints:
```
POST /auth/registerNormalUser
POST /auth/loginUser
POST /auth/logoutUser
GET  /auth/getCurrentUser
GET  /users/getAllUsers
PUT  /users/updateUser/:id
DELETE /users/deleteUser/:id
PUT  /users/changePassword/:id
```

---

## 🎯 Features in Detail

### 🔑 **Authentication Flow**
1. User registers/logs in
2. JWT token stored securely
3. Protected routes accessible
4. Automatic token refresh
5. Secure logout

### 👤 **User Management**
- View all users (admin)
- Edit user profiles
- Delete users (admin)
- Change passwords
- Role-based permissions

### 🎨 **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Cross-browser compatibility

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**


---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Heroicons** - For the beautiful icons

---

 If you found this project helpful, please give it a star! ✨ 

---

