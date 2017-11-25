export default {
  isLogged: undefined,
  username: "",

  //cars
  allCars : [] ,
  carAddSuccess : null ,
  carUpdateSuccess : null,
  carDeleteSuccess : null ,
  currentCarToUpdate : {
                    carQuantity : 0 ,
                    carType : '',
                    carName : '',
                    occupancy : '',
                    luggage : "NO" ,
                    dailyRentalValue : 0,
                    serviceStartDate : '',
                    serviceEndDate : ''
  },
  //Cars Initial Data End

  //Flights Initial Data
  allFlights : [],
  flightAddSuccess : null ,
  flightUpdateSuccess : null,
  currentFlightToUpdate : {
                flightNumber : '' ,
                airline : '' ,
                source : '' ,
                destination : '',
                arrival : '' ,
                departure : '',
                serviceStartDate : '',
                serviceEndDate : '',
                class : '',
                price : 0,
                seats : 0,
  },

  //Flights Initial Data End


  
  allHotels : [] ,
  hotelAddSuccess : null ,
  hotelUpdateSuccess : null,
  currentHotelToUpdate : {
    hotelName : '',
    hotelAddress : '', 
    hotelCity : '',
    hotelState : '', 
    hotelZip : '',
    hotelStar : '',
    hotelRating : '',
    hotelPhoneNumber : '',
    hotelEmail : '',
    hotelRooms : []
  }
}