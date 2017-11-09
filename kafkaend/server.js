var connection =  new require('./kafka/connection');

var auth = require('./services/auth');

var mongo = require('./services/mongo');
mongo.createConnectionPool();

var mongoWithDbPool = require('./services/mongoWithDbPool');
mongoWithDbPool.connect();

var config = require('config');
var topic_name = config.kafkaTopic;

console.log('server is running');

var producer = connection.getProducer();   
var consumer = connection.getConsumer(topic_name); 

consumer.on('message', function (message) {
    var data = JSON.parse(message.value)
    switch (data.km.value) {
        case 'signin':
            auth.signin(data.data, function(err,res){
                var payloads = [
                    {   
                        topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    //console.log(data);
                });
                return;
            });
            break;
        default:
            return;
    }
})
