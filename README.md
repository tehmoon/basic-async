# Basic Async module

This is a basic asynchronous functions module based on event.EventEmitter for nodejs. 
  
## Install

```!bash
npm install --save git://github.com/tehmoon/basic-async.git
```
  
## Example
```!javascript
var async = require("basic-async");

var doSomething = function (fctName, cb) {
  var timeout = Math.floor((Math.random() * 5) * 1000);

  console.log("Function " + fctName + " will take: " + Math.floor(timeout / 1000) + " seconds to execute.");

  setTimeout(function () {
    cb(null, "blih");
  }, timeout);
};

var fct1 = function (cb) {
  doSomething("fct1", function (err, data) {
    console.log("fct1 took: " + Math.floor(((new Date() - date) / 1000)) + " seconds to execute.");
    cb(err, data);
  });
};

var fct2 = function (cb) {
  doSomething("fct2", function (err, data) {
    console.log("fct2 took: " + Math.floor(((new Date() - date) / 1000)) + " seconds to execute.");
    cb(err, data);
  });
};

var fct3 = function (cb) {
  doSomething("fct3", function (err, data) {
    console.log("fct3 took: " + Math.floor(((new Date() - date) / 1000)) + " seconds to execute.");
    cb(err, data);
  });
};

var date = new Date();

async(fct1, fct2, fct3, function (array) {
  // Output is sorted the way that functions are passed to async
  var outputFct1 = array[0];
  var outputFct2 = array[1];
  var outputFct3 = array[2];

  console.log(outputFct1);
  console.log(outputFct2);
  console.log(outputFct3);

  console.log("Everything has executed in: " + Math.floor(((new Date() - date) / 1000)) + " seconds.");
});


```
