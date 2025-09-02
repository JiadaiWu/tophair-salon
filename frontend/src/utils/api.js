import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout:10000,
});

export const createAppointment = async(appointmentData) => {
    try{
        console.log('Creating appointment:', appointmentData);

        const response = await api.post('/appointments/book', appointmentData);

        console.log('Appointment created successfully', response.data);

        return response.data;
    }catch(error){
        console.error('Failed to create appointment', error.response?.data||error.message);
        throw error;
    };
};

export const searchAppointments = async(searchData) => {
    try {
        console.log('Searching appointments:', searchData);
        const response = await api.post('/appointments/search', searchData);
        console.log('Search results', response.data);
        return response.data;
    }catch(error){
        console.error('Failed to seach appointments', error.response?.data|| error.message);
        throw error;
    };
};

export const testConnection = async() => {
    try {
        const response = await axios.get('htttp://localhost:5000/');
        console.log('Connection test successful:', response.data);
        return response.data;
    }catch(error){
        console.error('Connection test failed', error.message);
        throw error;
    }
};

export default api;
