
function addFlight(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getFlights(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getFlightById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function updateFlightById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function deleteFlightById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getFlightsForCustomer(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.addFlight = addFlight;
exports.getFlights = getFlights;
exports.getFlightById = getFlightById;
exports.updateFlightById = updateFlightById;
exports.deleteFlightById = deleteFlightById;
exports.getFlightsForCustomer = getFlightsForCustomer;