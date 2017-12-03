export default {
  isLogged: undefined,
  username: "",

  //cars
  allCars : [] ,
  carAddSuccess : null ,
  carUpdateSuccess : null,
  carDeleteSuccess : null ,
  //Cars Initial Data End

  //Flights Initial Data
  allFlights : [],
  flightAddSuccess : null ,
  flightUpdateSuccess : null,
  flightDeleteSuccess  : null , 
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
  hotelDeleteSuccess : null,
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
  },
  allCustomers : [],
  
  allBills : [] ,
  hotelUpdateSuccess : null,
  currentBillToUpdate : {
    bookingId : '',
	createdDate : '', 
	_id : '',
	totalAmount : '', 
	userId : '',
	listingId : '',
	listingType : '',
	userData : null	,
	listingData : null
  },
  
    revenueByType : [] ,
    orderByType : [],
    totalRevenue : 0,
    totalOrders : 0,
	revenueByCity : [],
	revenueByTopCmpny : [],
	revenueByTopCmpnyMonth : [],
	userCount : 0
}