import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import { User, LoginCredentials, SignupCredentials } from '../lib/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user_info');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(credentials);
      
      // Store token and user info in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_info', JSON.stringify(response.user));
      
      setUser(response.user);
      router.push('/');
      
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.signup(credentials);
      
      // Store token and user info in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_info', JSON.stringify(response.user));
      
      setUser(response.user);
      router.push('/'); // Redirect to home page after successful signup
      
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during signup';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  };

  const getUserId = () => {    
    if (user) {
      return user.userId;
    }
    return null;
  };

  return {
    user,
    token: getToken(),
    userId: getUserId(),
    loading,
    error,
    login,
    signup,
    logout,
  };
};
