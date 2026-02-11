import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const result = await apiLogin({ email, password });
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async ({ email, password, firstName, lastName }) => {
    const result = await apiRegister({ email, password, firstName, lastName });
    if (result.success && result.data) {
      setUser({
        id: result.data.userId,
        email: result.data.email,
      });
    }
    return result;
  };

  const signOut = async () => {
    await apiLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
