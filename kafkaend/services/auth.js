var mongo = require("./mongo");
var mysql = require('./mysql');
var validator = require('validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function signin(msg, callback){
    var res = {};
    if(validator.isEmail(msg.email) && validator.isByteLength(msg.password, {min: 5})) {
        var connection = mysql.getConnection();
        console.log(connection);
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            connection.query("select id, username, email, role, password from auth_user where email =" + "'" + msg.email + "';", function (err, result) {
                connection.end();
                if (err) throw err;
                if(result[0]) {
                    var user = result[0];
                    if(user.role != msg.role) {
                        res.code = 401;
                        res.message = "Unauthorized user";
                        callback(null, res);
                    }
                    bcrypt.compare(msg.password, user.password, function(err,result) {
                            if(result) {
                                res.code = 200;
                                res.message = "Success";
                                res.data = {_id:user.id,username:user.username,role:user.role};
                                console.log(res);
                            } else {
                                res.code = 401;
                                res.message = "Invalid password";
                            }
                            callback(null, res);
                        });
                } else {
                    res.code = 401;
                    res.message = "Invalid email";
                    callback(null, res);
                }
            });
        });
    } else {
        res.code = 400;
        res.message = "Fields did not pass the validation";
        callback(null, res);
    }
}

function signup(msg, callback){
    var res = {};
    if(msg.email && msg.email !== '' 
        && msg.password && msg.password !== '') {
        //TODO: change to MySQL
        mongo.getCollection('user', function(err,coll){
            coll.findOne({email:msg.email}, function(err,user){
                if(err) {
                    res.code = 500;
                    res.message = "Internal server error";
                    callback(null, res);
                } else {
                    if (user) {
                        res.code = 400;
                        res.message = "User already exists";
                        callback(null, res);
                    } else {
                        bcrypt.hash(msg.password, saltRounds, function(err, hash) {
                            coll.insert({
                                email: msg.email,
                                password:hash,
                                is_verified:true
                            },function(err, user){
                                if (err) {
                                    res.code = 500;
                                    res.message = "Internal server error";
                                } else {
                                    res.code = 200;
                                    res.message = "Success";
                                    res.data = {_id:user.insertedIds[0],uname:msg.first_name+" "+msg.last_name};
                                }
                                callback(null, res);
                            });
                        });
                    }
                }
            });
        })
    } else {
        res.code = 400;
        res.message = "Fields missing";
        callback(null, res);
    }
}

exports.signin = signin;
exports.signup = signup;