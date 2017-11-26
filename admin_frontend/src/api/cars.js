const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const addCar = (data , callback) => {
    fetch(api+'/a/cars', {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...headers
        },
        body: data
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


export const updateCarById = ( obj , callback) => {
    fetch(api+'/a/cars/'+obj._id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            ...headers
        },
        body: JSON.stringify(obj)
    }).then(res => {
        callback( null , res.json());
    }).catch(error => {
        callback( error , {});
    });    
} 


export const getCarById = ( id , callback) => {
    fetch(api+'/a/cars/'+id, {
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