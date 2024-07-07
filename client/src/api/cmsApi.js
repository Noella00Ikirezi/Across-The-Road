import apiClient from './apiClient';

export const insertData = async (data) => {
    try {
        const response = await apiClient.post('/insertData', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
};

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
        console.error(`Error fetching page with ID ${id}:`, error);
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