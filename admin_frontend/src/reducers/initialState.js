
export default {
  isLogged: undefined,
  username: "",
  
  // Cars Initial Data
  allCars : [] ,
  carAddSuccess : null ,
  carUpdateSuccess : null,
  currentCarToUpdate : {
  							carQuantity : 0 ,
  							carType : '',
  							carName : '',
  							occupancy : '',
  							luggage : "NO" ,
  							dailyRentalValue : 0
  						},
  //Cars Initial Data End

  //Flights Initial Data
  allFlights : [],
  flightAddSuccess : null ,
  flightUpdateSuccess : null,
  currentFlightToUpdate : {
                lightNumber : '' ,
                airline : '' ,
                source : '' ,
                destination : '',
                arrival : '' ,
                departure : '',
                serviceStartDate : '',
                serviceEndDate : '',
                class : '',
                price : '',
                seats : '',
  }

  //Flights Initial Data End
}