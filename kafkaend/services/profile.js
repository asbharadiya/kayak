
function getProfile(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function updateProfile(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function addCreditCard(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getCreditCards(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function deleteCreditCardById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.addCreditCard = addCreditCard;
exports.getCreditCards = getCreditCards;
exports.deleteCreditCardById = deleteCreditCardById;