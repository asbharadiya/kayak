
function getCustomers(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getCustomerById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function updateCustomerById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
exports.updateCustomerById = updateCustomerById;