
module.exports = function(router,passport) {

	var auth = require('./auth')(passport);
	var customer = require('./customer');
	var profile = require('./profile');
	var hotel = require('./hotel');
	var flight = require('./flight');
	var car = require('./car');
	var booking = require('./booking');


    router.post('/logout', auth.logout);

    //admin
	router.post('/a/signin', auth.adminSignIn);
	router.get('/a/check_session', isAdminAuthenticated, auth.checkSession);

	router.get('/a/customers', customer.getCustomers);
	router.get('/a/customers/:id', customer.getCustomerById);
	router.delete('/a/customers/:id', customer.deleteCustomersById);

	router.post('/a/hotels', hotel.addHotel);
	router.get('/a/hotels', hotel.getHotels);
	router.get('/a/hotels/:id', hotel.getHotelById);
	router.put('/a/hotels/:id', hotel.updateHotelById);
	router.delete('/a/hotels/:id', hotel.deleteHotelById);

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
	router.post('/c/signin', auth.customerSignIn);
    router.post('/c/signup', auth.signup);
    router.get('/c/check_session', isAuthenticated, auth.checkSession);

	router.get('/c/profile', isAuthenticated, profile.getProfile);
	router.put('/c/profile', isAuthenticated, profile.updateProfile);
	router.post('/c/credit_cards', isAuthenticated, profile.addCreditCard);
	router.get('/c/credit_cards', isAuthenticated, profile.getCreditCards);
	router.delete('/c/credit_cards/:id', isAuthenticated, profile.deleteCreditCardById);
	router.get('/c/hotels', hotel.getHotelsForCustomer);
	router.get('/c/flights', flight.getFlightsForCustomer);
	router.get('/c/cars', car.getCarsForCustomer);
	router.post('/c/bookings', isAuthenticated, booking.makeBooking);
	router.get('/c/bookings', isAuthenticated, booking.getBookings);
	router.get('/c/bookings/:id', isAuthenticated, booking.getBookingById);
	
	function isAuthenticated(req, res, next) {
		if(req.session.passport && req.session.passport.user._id && req.session.passport.user.role === 'USER') {
			next();
	  	} else {
			res.status(401).send();
		}
	}

	function isAdminAuthenticated(req, res, next) {
	    if(req.session.passport && req.session.passport.user._id && req.session.passport.user.role === 'ADMIN') {
			next();
	  	} else {
			res.status(401).send();
		}
	}

}
