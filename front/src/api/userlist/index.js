import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
const options = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

export const getList = async () => {
    try {
        const response = await axios.get(
            apiURL + '/list',
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const putList = async (item) => {
    if ( !item ) return;
    try {
        await axios.put(
            apiURL + '/list',
            { item },
            options,
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteListItem = async (api_id) => {
    if ( !api_id ) return;
    try {
        const res = await axios.delete(
            apiURL + '/list',
            {...options, data:{ api_id }},
        );
        if (res.status === 200) {
			return true;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};