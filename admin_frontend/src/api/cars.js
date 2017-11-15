const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const addCar = (payload , callback) => {
    fetch(api+'/a/cars', {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload : payload)
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
} 
	