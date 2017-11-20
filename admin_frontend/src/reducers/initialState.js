
export default {
  isLogged: undefined,
  username: "",
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
    hotelEmail : ''
  }
}