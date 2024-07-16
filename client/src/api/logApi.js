import apiClient from './apiClient';

export const logActivity = async (activity) => {
    try {
        const user = localStorage.getItem('userName');
        const response = await apiClient.post('/logs', { user, activity }); // Ensure the endpoint matches the server-side route
        return response.data;
    } catch (error) {
        console.error('Error logging activity:', error);
        throw error;
    }
};
