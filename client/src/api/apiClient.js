import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', token); // Add this line for debugging
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ensure it's correctly set with "Bearer" prefix
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;
