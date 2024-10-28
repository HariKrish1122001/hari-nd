import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_URL,
});

// Function to get all licenses
export const getLicenses = async () => {
    try {
        const response = await apiClient.get('/license');
        return response.data;
    } catch (error) {
        console.error('Error fetching licenses:', error);
        throw error; // rethrow the error for further handling
    }
};

// Function to get a single license by ID
export const getLicense = async (licenseID) => {
    try {
        const response = await apiClient.get('/license', { params: { licenseID } });
        return response.data;
    } catch (error) {
        console.error(`Error fetching license ${licenseID}:`, error);
        throw error;
    }
};

// Function to create a new license
export const createLicense = async (licenseData) => {
    try {
        const response = await apiClient.post('/license', licenseData);
        return response.data;
    } catch (error) {
        console.error('Error creating license:', error);
        throw error;
    }
};

// Function to update an existing license
export const updateLicense = async (id, licenseData) => {
    try {
        const response = await apiClient.put(`/license/one/${id}`, licenseData);
        return response.data;
    } catch (error) {
        console.error(`Error updating license ${id}:`, error);
        throw error;
    }
};

// Function to remove GUID from a license
export const removeGUID = async (id) => {
    try {
        const response = await apiClient.patch(`/license/one/${id}/removeGUID`);
        return response.data;
    } catch (error) {
        console.error(`Error removing GUID from license ${id}:`, error);
        throw error;
    }
};

// Function to delete a license
export const deleteLicense = async (id) => {
    try {
        const response = await apiClient.delete(`/license/two/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting license ${id}:`, error);
        throw error;
    }
};

// Login function
export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Register function
export const registerUser = async (username, email, password) => {
    try {
        const response = await apiClient.post('/register', { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Logout function
export const logoutUser = async () => {
    try {
        const response = await apiClient.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
};
