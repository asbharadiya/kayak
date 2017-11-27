const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const addHotel = (payload , callback) => {
    fetch(api+'/a/hotels', {
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
    

export const getAllHotels = (callback) => {
    fetch(api+'/a/hotels', {
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



export const deleteHotelById = ( id , callback) => {
    fetch(api+'/a/hotels/'+id, {
        method: 'DELETE',
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


export const updateHotelById = ( obj , callback) => {
    fetch(api+'/a/hotels/'+obj._id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
} 


export const getHotelById = ( id , callback) => {
    fetch(api+'/a/hotels/'+id, {
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