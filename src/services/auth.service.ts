import { AuthResponse, LoginCredentials, SignupCredentials } from '../lib/types/auth';
import { API_ENDPOINTS } from '../lib/constants/api';

class AuthService {
  private baseUrl: string;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error('API URL not found in environment variables');
    }
    this.baseUrl = baseUrl;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const queryParams = new URLSearchParams({
        email: credentials.email,
        password: credentials.password
      });
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}?${queryParams}`, {
        method: 'GET'
      });      
      if (!response.ok) {
        const error = await response.json(); 
        throw new Error(error.message || 'Failed to login');
      }
      const data: AuthResponse = await response.json();      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign up');
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  }
}

export const authService = new AuthService();
