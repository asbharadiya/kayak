var analyticsModel = require('../models/analytics.js');

var filename = 'logger/analyticsLogger.log';
var fs = require('fs');
var readline = require('readline');
var fileCursor = {
  x: 0,
  y: 0
};


const pauseInterval = 200;

var isPaused = false;

var results;

function processClickPerPage(lineObj, callback) {
  //console.log('record Click Page' + fileCursor.y);
  if(lineObj.message.type = 'clicksPerPage') {
    if(results.clicksPerPage[lineObj.message.page]) {
      results.clicksPerPage[lineObj.message.page].push({'timestamp': lineObj.message.time});
    } else {
      results.clicksPerPage[lineObj.message.page] = [{'timestamp' : lineObj.message.time}];
    }
  }
  callback;
}

function processListingView(lineObj) {
  listingName = lineObj.message.name
  listingName= listingName.replace(/ /g,"_");
  console.log(listingName);
  if(results.viewsPerListing.cars[listingName]) {
    results.viewsPerListing.cars[listingName].push({'timestamp' : lineObj.message.time});
  } else {
    results.viewsPerListing.cars[listingName] = [];
    results.viewsPerListing.cars[listingName].push({'timestamp' : lineObj.message.time});
  }

}

function readEachLine(line, callback) {
//  console.log('reading line function' + fileCursor.y);
  var lineObj = JSON.parse(line);
  if(lineObj.message.type === 'clicksPerPage') {
    processClickPerPage(lineObj, function() {
      //callback;
    });
  } else if (lineObj.message.type === 'listingView') {
    processListingView(lineObj, function() {

    });
  }
}

function run(callback) {
  results = {
    clicksPerPage: {

    },
    viewsPerListing: {
      cars : {

      }
    }
  };
  var rl = readline.createInterface({
    input: fs.createReadStream(filename)
  })

  rl.on('line', (line) => {
    //rl.pause();
    console.log('reading line' + fileCursor.y);
    readEachLine(line, function() {
      fileCursor.y++;
    });
  })
  rl.on('close',(line) => {
    console.log('file cursar at',fileCursor);
    //clearInterval(intervalHandler);
    console.log('---------------------------------------------- '+
    '\n-------------------Summary--------------------'+
    '\n---------------------------------------------- ');
    analyticsModel.remove({}, function() {
      var newAnalytics = new analyticsModel({"results": results});
      newAnalytics.save();
      callback;
    });
  });


  //var intervalHandler = setInterval(toggleReader,pauseInterval,rl);

  function toggleReader(rl) {
    if (isPaused) {
      rl.resume();
      isPaused = false;
      console.log('---------------------------------------------- '+
      '\n-----------------------resuming----------------------- '+isPaused+
      '\n---------------------------------------------- ');
    }
    else {
      rl.pause();
      isPaused = true;
      console.log('---------------------------------------------- '+
      '\n-----------------------pausing----------------------- '+isPaused+
      '\n---------------------------------------------- ');
    }
  }
}


exports.run = run;
