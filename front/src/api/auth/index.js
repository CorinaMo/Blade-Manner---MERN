import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
const options = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const login = async (data) => {
    const { email, password } = data;
    if (!email || !password) return;
    try {
        const response = await axios.post(
            apiURL + '/auth/login',
            { email, password },
            options,
        );
        if (response.status === 200) return true;
    } catch (error) {
        console.error(error);
        return {error: error.response?.data?.error ?? 'Incorrect username or password'};
    }
};

export const logout = async () => {
    try {
        const response = await axios.get(
            apiURL + '/auth/logout',
            options,
        );
        if (response.status === 200) {
            return true;
        } else {
            return {error: 'Unknown error'};
        }
    } catch (error) {
        console.error(error);
        return {error: error.response?.data?.error ?? 'Something went wrong'};
    }
};

export const verifyUser = async () => {
    try {
        const response = await axios.get(
            apiURL + '/auth/verifyuser',
            options,
        );
        if (response.status === 200) {
            return true;
        } else {
            return {error: 'Unknown error'};
        }
    } catch (error) {
        console.error(error);
        return {error: error.response?.data?.error ?? 'Something went wrong'};
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios.post(
            apiURL + '/auth/refresh',
            options,
        );
        if (response.status === 200) {
            return true;
        } else {
            return {error: 'Unknown error'};
        }
    } catch (error) {
        console.error(error);
        return {error: error.response?.data?.error ?? 'Something went wrong'};
    }
};

export const signup = async (data) => {

    const { username, password, email } = data;
    if (!username || !password || !email) return;
    try {
        const response = await axios.post(
            apiURL + '/auth/signup',
            { username, password, email },
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
        const message = error.response?.data?.error?.startsWith('E11000 duplicate key')? 'User already exists' : error.response?.data?.error;
        return {error: message};
    }
};