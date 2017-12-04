var assert = require('assert');
var express = require('express');
var app = express();
var request = require('supertest');
var assert = require('chai').assert;

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

describe('http tests without auth', function(){
	
	before(function() {
 
	});
	 
	after(function() {
	 
	});

	it('ADMIN should be able to login with correct details', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .post('/signin')
	        .send({
	        	email:"admin@gmail.com",
        		password:"ankit"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	it('ADMIN should not be able to login with wrong details', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .post('/signin')
	        .send({
	        	email:"admin@gmail.com",
        		password:"abc"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 400);
	            done();
	        });
	});
	
	it('CLIENT should be able to login with correct details', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .post('/signin')
	        .send({
	        	email:"aa@aa.com",
        		password:"abc@123"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	it('CLIENT should not be able to login with wrong details', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .post('/signin')
	        .send({
	        	email:"aa@aa.com",
        		password:"abc"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 400);
	            done();
	        });
	});
	
	it('CLIENT should get error while signup with wrong data', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .post('/signup')
	        .send({
	        	email:"aa@aa.com",
        		password:"abc"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 400);
	            done();
	        });
	});
	
	const username = Math.random()+"@admin.com";
	it('CLIENT should not get error while signup with correct data', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .post('/signup')
	        .send({
	        	email:username,
        		password:"abc@123",
        		firstName:"Sample",
        		lastName:"Sample"
	        })
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	it('CLIENT/ADMIN should logout', function (done)  {
	    chai.request('http://localhost:3002/api/v1')
	        .post('/logout')
	        .send()
	        .end(function(err, res) {
	         	 
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	
  
});

describe('ADMIN http tests with auth', function(){
	
	

	var cookie = '';
	

	before(function() {
		
	});
	 
	after(function() {
	 
	});
	
	it('ADMIN LOGIN', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .post('/signin')
	        .send({
	        	email:"admin@gmail.com",
        		password:"ankit"
	        })
	        .end(function(err, res) {
	        	cookie = res.headers['set-cookie'][0].split(';')[0];
	        	console.log('Cookie : '+ cookie)
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	it('ADMIN Passport check session', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/check_session')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get listing of all cars', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/cars')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get listing of all flights', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/flights')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get listing of all hotels', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/hotels')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get listing of all customers', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/customers')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get revenue based on type', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/revenueByType')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get revenue based on Top Companies', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/revenueByTopCmpny')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('ADMIN should get revenue based on City', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/revenueByCity')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	
	it('ADMIN should get User Analytics data', function (done)  {
	    chai.request('http://localhost:3002/api/v1/a')
	        .get('/userAnalytics')
	        .set('Cookie', cookie)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	
	
});

describe('CLIENT http tests with auth', function(){
	
	

	var cookie = '';
	

	before(function() {
		
	});
	 
	after(function() {
	 
	});
	
	var cookie2 = '';
	
	it('CLIENT LOGIN', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .post('/signin')
	        .send({
	        	email:"aa@aa.com",
        		password:"abc@123"
	        })
	        .end(function(err, res) {
	        	cookie2 = res.headers['set-cookie'][0].split(';')[0];
	        	console.log('Cookie : '+ cookie2)
	            assert.equal(res.status, 200);
	            done();
	        });
	});
	
	it('CLIENT should get All Credit card details', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .get('/credit_cards')
	        .set('Cookie', cookie2)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	it('CLIENT should get Hotel listings', function (done)  {
	    chai.request('http://localhost:3002/api/v1/c')
	        .get('/hotels')
	        .set('Cookie', cookie2)
	        .send()
	        .end(function(err, res) {
	         	
	            assert.equal(res.status, 200);
	            
	            done();
	        });
	});
	
	
});