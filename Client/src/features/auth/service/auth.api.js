import axios from 'axios';

const api=axios.create({
    baseURL:  import.meta.env.VITE_API_URL,
    withCredentials: true
});

export async function loginUser({email,password}) {
    try {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function registerUser({username,email,password}) {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;
    }
    catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        const response = await api.post('/api/auth/logout');
        return response.data;
    }
    catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

export async function getProfile() {
    try {
        const response = await api.get('/api/auth/profile');
        return response.data;
    }
    catch (error) {
        console.error('Get profile error:', error);
        throw error;
    }
}