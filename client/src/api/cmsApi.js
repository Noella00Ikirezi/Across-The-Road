import apiClient from './apiClient';



export const fetchAllPages = async () => {
    try {
        const response = await apiClient.get('/fetchAllPages');
        return response.data;
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw error;
    }
};

export const fetchPageById = async (id) => {
    try {
        const response = await apiClient.get(`/pages/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching page by ID:', error);
        throw error;
    }
};



export const fetchPagesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/pages/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching pages for user ID ${userId}:`, error);
        throw error;
    }
};
