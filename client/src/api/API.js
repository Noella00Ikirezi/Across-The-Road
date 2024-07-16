import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const uploadNavbarLogo = async (formData, token) => {
    return await axios.post(`${API_BASE_URL}/navbar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const uploadFooterLogo = async (formData, token) => {
    return await axios.post(`${API_BASE_URL}/footer`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const uploadAboutImage = async (formData, authToken) => {
    return await axios.post(`${API_BASE_URL}/about/upload-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
        },
    });
};

export const saveAboutSection = async (data, authToken) => {
    return await axios.post(`${API_BASE_URL}/about/save-section`, data, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
};

export const uploadServiceImage = async (formData, authToken) => {
    const response = await axios.post(`${API_BASE_URL}/service/upload-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const saveService = async (data, authToken) => {
    const response = await axios.post(`${API_BASE_URL}/service/save`, data, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    return response.data;
};
export const uploadTeamInfo = async (data, authToken) => {
    const response = await axios.post(`${API_BASE_URL}/team/info`, data, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    return response.data;
};


export const uploadTeamMember = async (formData, authToken) => {
    const response = await axios.post(`${API_BASE_URL}/team/member`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
        },
    });
    return response.data;
};


export const deleteTeamMember = (id, authToken) => {
    return axios.delete(`${API_BASE_URL}/team/member/${id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
};


// New function to create a new page
export const createPage = async (pageData, authToken) => {
    const response = await axios.post(`${API_BASE_URL}/pages`, pageData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
    });
    return response.data;
};
