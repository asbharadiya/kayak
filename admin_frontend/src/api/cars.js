const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const addCar = (payload , callback) =>
{
    console.log(payload) ; 
        fetch(api+'/api/cars', {
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
        console.log("Dont know what is returuning") ; 
        callback( error , {});
    });    
} 
	