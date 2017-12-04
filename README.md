# kayak
Prototype of Kayak.com for CMPE273 fall-17 group project

To run this application, follow the following steps:

* Start the MongoDB server
* Follow the kafkascript file in the root directory to start the Zookeeper and Kafka server on your machine. Also follow the insturctions in this file to create Kafka topics

* If your using remote MongoDB, change DB configuration in following files accordingly
  ```sh
  kafkaend/config/dev.json
  kafkaend/config/default.json
  
  backend/config/dev.json
  backend/config/default.json
  ```
* In a new terminal, install all dependencies for the kafka backend server and start it
  ```sh
  cd kafkaend
  npm install
  npm start
  ```
* In a new terminal, install all dependencies for the main backend server and start it
  ```sh
  cd backend
  npm install
  npm start
  ```
* In a new terminal, install all dependencies for the frontend server and start it
  ```sh
  cd frontend
  npm install
  npm start
  ```
* In a new terminal, install all dependencies for the admin server and start it
  ```sh
  cd backend
  npm install
  npm start
  Would you like to run the app on another port instead? (Y/n)
  Y
  ```  
  
* Start the MySQL server 

* Run the SQL file on the MySQL client to create the database and the default schema - The file can be found on 
  db_schema/mysql_kayak.sql
  
Default admin credentials are: 
email:- admin@gmail.com
password:- admin@kayak
  
  
To run the mocha tests for the REST APIs, follow following steps: 

* First run kafka backend server in test mode
  ```sh
  cd kafkaend
  npm install
  npm test
  ```

* Then in a new terminal, run backend server tests
  ```sh
  cd backend
  npm install
  npm test
  ```
