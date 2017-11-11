
module.exports = function(router,passport) {

	var auth = require('./auth')(passport);
	var customer = require('./customer');
	var profile = require('./profile');
	var hotel = require('./hotel');
	var flight = require('./flight');
	var car = require('./car');
	var booking = require('./booking');

	router.post('/signin', auth.signin);
	router.post('/signup', auth.signup);
	router.post('/logout', auth.logout);
	router.get('/check_session', isAuthenticated, auth.checkSession);

	//admin
	router.get('/a/customers', isAdminAuthenticated, customer.getCustomers);
	router.get('/a/customers/:id', isAdminAuthenticated, customer.getCustomerById);
	router.put('/a/customers/:id', isAdminAuthenticated, customer.updateCustomerById);
	router.post('/a/hotels', isAdminAuthenticated, hotel.addHotel);
	router.get('/a/hotels', isAdminAuthenticated, hotel.getHotels);
	router.get('/a/hotels/:id', isAdminAuthenticated, hotel.getHotelById);
	router.put('/a/hotels/:id', isAdminAuthenticated, hotel.updateHotelById);
	router.delete('/a/hotels/:id', isAdminAuthenticated, hotel.deleteHotelById);
	router.post('/a/flights', isAdminAuthenticated, flight.addFlight);
	router.get('/a/flights', isAdminAuthenticated, flight.getFlights);
	router.get('/a/flights/:id', isAdminAuthenticated, flight.getFlightById);
	router.put('/a/flights/:id', isAdminAuthenticated, flight.updateFlightById);
	router.delete('/a/flights/:id', isAdminAuthenticated, flight.deleteFlightById);
	router.post('/a/cars', isAdminAuthenticated, car.addCar);
	router.get('/a/cars', isAdminAuthenticated, car.getCars);
	router.get('/a/cars/:id', isAdminAuthenticated, car.getCarById);
	router.put('/a/cars/:id', isAdminAuthenticated, car.updateCarById);
	router.delete('/a/cars/:id', isAdminAuthenticated, car.deleteCarById);
	router.get('/a/billings', isAdminAuthenticated, booking.getBills);
	router.get('/a/billings/:id', isAdminAuthenticated, booking.getBillById);

	//user
	router.get('/c/customers/:id', isAuthenticated, profile.getProfile);
	router.put('/c/profile', isAuthenticated, profile.updateProfile);
	router.post('/c/credit_cards', isAuthenticated, profile.addCreditCard);
	router.get('/c/credit_cards', isAuthenticated, profile.getCreditCards);
	router.delete('/c/credit_cards/:id', isAuthenticated, profile.deleteCreditCardById);
	router.get('/c/hotels', isAuthenticated, hotel.getHotelsForCustomer);
	router.get('/c/flights', isAuthenticated, flight.getFlightsForCustomer);
	router.get('/c/cars', isAuthenticated, car.getCarsForCustomer);
	router.post('/c/bookings', isAuthenticated, booking.makeBooking);
	router.get('/c/bookings', isAuthenticated, booking.getBookings);
	router.get('/c/bookings/:id', isAuthenticated, booking.getBookingById);
	
	function isAuthenticated(req, res, next) {
		if(req.session.passport && req.session.passport.user._id) {
			next();
	  	} else {
			res.status(401).send();
		}
	}

	function isAdminAuthenticated(req, res, next) {
		if(req.session.passport && req.session.passport.user._id) {
			next();
	  	} else {
			res.status(401).send();
		}
	}

}