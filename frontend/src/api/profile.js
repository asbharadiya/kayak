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
    
export const updateUserProfile = (payload , callback) => {
    console.log('API')
    console.log(payload)
    fetch(api+'/c/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
}

export const getCreditCards = () =>
    fetch(api+'/c/credit_cards', {
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

export const addCreditCard = (payload) =>
    fetch(api+'/c/credit_cards', {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        return error;
    });