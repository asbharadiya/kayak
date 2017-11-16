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
	

export const getAllCars = (callback) => {
    fetch(api+'/a/cars', {
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



export const deleteCarById = ( id , callback) => {
    console.log( api+'/a/cars/'+id ) ; 
    fetch(api+'/a/cars/'+id, {
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