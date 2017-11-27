const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};


export const getAllFlights = (params, callback) => {
    fetch(api+'/c/flights'+params, {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });
}


