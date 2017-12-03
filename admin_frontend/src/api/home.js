const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const getRevenueByType = (callback) => {
    fetch(api+'/a/revenueByType', {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
}
export const getRevenueByCity = (callback) => {
    fetch(api+'/a/revenueByCity', {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
}
export const getRevenueByTopCmpny = (callback) => {
    fetch(api+'/a/revenueByTopCmpny', {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
}