const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const getUserDetails = () =>
	fetch(api+'/c/profile', {
	    method: 'GET',
	    headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        
	}).then(res => {
		return res.json();
	}).catch(error => {
        return error;
    }); 