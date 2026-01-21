import axios from 'axios';
import { toast } from 'react-toastify';


// Toggle Login and Register modals

export const toggleLogin = () => {
    return {
        type: 'TOGGLE_LOGIN'
    };
}
export const toggleRegister = () => {
    return {
        type: 'TOGGLE_REGISTER'
    };
}

//Register action 
export const registerUser = (userData) => {
    return async () => {
        try {
            const response = await axios.post('/api/users/register', userData);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Registration Error:', error);
            //error.response.data.message-> string
            // error.response.data.errors-> array 
            const {message, errors} = error.response.data;
            if ( errors && Array.isArray(errors)) {
                errors.forEach(err => toast.error(err.msg));    
            } else {
                toast.error(message);
              
            }
            throw new Error(message || 'Registration failed');
        }
    };

}; 
//Login action
export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/users/login', userData);
            const { token, user, message } = response.data;
            // Savea token to localStorage
            localStorage.setItem('token', token);
            dispatch ({
                type: 'LOGIN_SUCCESS',
                payload: user
            });
            toast.success(message);
        }
        catch (error) {
            console.error('Login Error:', error);
            const {message, errors} = error.response.data;
            if ( errors && Array.isArray(errors)) {
                errors.forEach(err => toast.error(err.msg));    
            } else {
                toast.error(message);
              
        }
            throw new Error(message || 'Login failed');
        }
    };
};
//logout action
export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT_SUCCESS'
        });
        toast.success('Logged out successfully');
    };
};

//get current user action
export const getCurrentUser = () => {
    return async (dispatch) => {        
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const response = await axios.get('/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = response.data;
            dispatch({
                type: 'GET_CURRENT_USER',
                payload: user

            });
        } catch (error) {
            console.error('Get Current User Error:', error);
            // optionally handle error

        }
    
    };
};