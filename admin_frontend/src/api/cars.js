const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const addCar = (payload) =>
	fetch(api+'/api/cars', {
	    method: 'POST',
        credentials: 'include',
        headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
	}).then(res => {
		return res.json();
	}).catch(error => {
        return error;
    });