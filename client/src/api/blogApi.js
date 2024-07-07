import apiClient from './apiClient';

export const getAllPosts = async (authToken) => {
    try {
        const response = await apiClient.get('/posts', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (post) => {
    const response = await apiClient.post('/posts', post);
    return response.data;
};

export const updatePost = async (id, post) => {
    const response = await apiClient.put(`/posts/${id}`, post, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deletePost = async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
};

export const createComment = async (comment) => {
    const response = await apiClient.post('/comments', comment);
    return response.data;
};

export const getAllComments = async (authToken) => {
    try {
        const response = await apiClient.get('/comments', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
