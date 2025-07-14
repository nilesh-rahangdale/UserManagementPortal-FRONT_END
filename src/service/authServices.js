import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": 'application/json',
  },
  withCredentials: true,
});

// Axios response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          authService.logout();
          window.location.href = '/login';
          break;

        case 403:
          console.error("Access denied for resource");
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 500:
          console.error("Internal server error");
          break;
      }
    } else if (error.request) {
      console.error("Request is sent but no response received", error.message);
    } else {
      console.error("Error in setting up request", error.message);
    }

    return Promise.reject(error);
  }
);

// Auth service
const authService = {
  signupNormalUser: async (username, password, email) => {
    try {
      const resp = await api.post('/auth/registerNormalUser', {
        username,
        password,
        email,
      });
      return resp.data;
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const resp = await api.post("/auth/loginUser", {
        username,
        password,
      });

      const user = await authService.fetchCurrentUser();
      return {
        ...resp.data,
        user,
      };
    } catch (error) {
      console.log("Login failed", error);
      throw error;
    }
  },

  fetchCurrentUser: async () => {
    try {
      const resp = await api.get("/auth/getCurrentUser");
      localStorage.setItem('user', JSON.stringify(resp.data));
      return resp.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      if (error.response && error.response.status === 401) {
        await authService.logout();
      }
      return null;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error fetching user from localStorage", error);
      return null;
    }
  },

  logout: async () => {
    try {
      const resp = await api.post("/auth/logoutUser");
      localStorage.removeItem('user');
      return resp.data;
    } catch (error) {
      console.error("Error logging out user", error);
    }
  },

  isAuthenticated: async () => {
    try {
      const user = await authService.fetchCurrentUser();
      return !!user;
    } catch (error) {
      console.error("User is not authenticated", error);
      return false;
    }
  },

  updateUser: async (userDetails) => {
    try {
      const resp = await api.put(`/users/updateUser/${userDetails.id}`,
        userDetails
      )
      const currentUser = await authService.fetchCurrentUser();
      const updatedUser = { ...currentUser, ...resp.data }
      localStorage.setItem('user', updatedUser)
    } catch (error) {
      console.error("error updating user. ", error)
    }
  },

  getAllUsers: async () => {
    try {
      const resp = await api.get("/users/getAllUsers");
      return resp.data;

    } catch (error) {
      console.error("error fetchiing user from db.", error)
      throw error;
    }
  },
  
  deleteUser:async(id)=>{
    try {
      await api.delete(`/users/deleteUser/${id}`);
  } catch (error) {
      console.error("Error deleting user",error)
      throw error;
    }
  },

  changePassword:async (oldPassword,newPassword,confirmNewPassword)=>{
    try {
      const user=authService.getCurrentUser();
      const userId=user.id;
      await api.put(`/users/changePassword/${userId}`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword
        }
      )
    } catch (error) {
      console.error("Error changing passowrd",error)
      throw error;
    }

  }
};

export default authService;
