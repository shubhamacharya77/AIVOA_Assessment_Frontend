const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Login failed. Please check your credentials.');
    }

    return { token: data.access_token, user: data.user }; // Expected: { token, user }
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Could not connect to the server.');
    }
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_name: name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Signup failed. Please try again.');
    }

    return { token: data.access_token, user: data.user }; // Expected: { token, user }
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Could not connect to the server.');
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to fetch user info');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
