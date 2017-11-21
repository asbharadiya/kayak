SET mongoLocation="L:\mongodb\"
SET kafkaLocation="L:\sjsu\cmpe273\kafka_2.11-0.9.0.0\"
SET kayakLocation="L:\sjsu\cmpe273\workSpace\kayak\"

rd /s /q "%kafkaLocation%data\kafka"

rd /s /q "%kafkaLocation%data\zookeeper\version-2"

rd /s /q "%kafkaLocation%data\Zookeeper"

start cmd.exe /K "cd %mongoLocation%bin && mongod.exe --dbpath ..\data\db"

start cmd.exe /K "cd %kayakLocation%admin_frontend && npm run start"

timeout /t 10

start cmd.exe /K "cd %kafkaLocation%bin\windows && zookeeper-server-start.bat ../../config/zookeeper.properties"

timeout /t 10

start cmd.exe /K "cd %kafkaLocation%bin\windows && kafka-server-start.bat ../../config/server.properties"

timeout /t 10

start cmd.exe /K "cd %kafkaLocation%bin\windows && kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic kayak"

timeout /t 10

start cmd.exe /K "cd %kafkaLocation%bin\windows && kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic"

timeout /t 10

start cmd.exe /K "cd %kayakLocation%backend && nodemon app.js"

start cmd.exe /K "cd %kayakLocation%kafkaend && nodemon server.js"