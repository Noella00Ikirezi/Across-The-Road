import apiClient from './apiClient';


export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    console.log("Full response received:", response.data);

    if (!response.data.token || !response.data.user) {
      console.error('Response missing token or user:', response.data);
      throw new Error("Missing token or user from the response");
    }

    const { token, user } = response.data;

    // Store token and user ID in localStorage (if needed, can be done here or in the calling component)
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);

    return { token, user };
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw new Error('Failed to log in: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const register = async (credentials) => {
  try {
    const response = await apiClient.post('/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data);
    throw new Error('Failed to register: ' + (error.response?.data.message || error.message));
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    await apiClient.post('/logout');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to log out: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await apiClient.post('/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error.response?.data);
    throw new Error('Failed to reset password: ' + (error.response?.data.message || error.message));
  }
};


export const getProfile = async () => {
  try {
    console.log('Fetching profile');
    const response = await apiClient.get('/profile');
    console.log('Profile fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error.response?.data);
    throw new Error('Failed to fetch profile: ' + (error.response?.data.message || error.message));
  }
};


export const updateProfile = async (profileData) => {
  try {
    console.log('Updating profile with data:', profileData);
    const response = await apiClient.put('/profile', profileData);
    console.log('Profile update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error.response?.data);
    throw new Error('Failed to update profile: ' + (error.response?.data.message || error.message));
  }
};

export const getAllUsers = async (authToken) => {
  try {
    const response = await apiClient.get('/users', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};