/*
 * @module       :: basic-async
 * @description  :: take only functions as argument execute them
 *                  and send back to a last param callback the array
 *                  of all responses from all param functions.
 * @NOTABENE     :: All function passed into async should have function (cb)
 *                  as there declaration.
 *                  cb() must be executed, otherwise the async will not be
 *                  executed.
 *                  All functions will be sent back into the Array() by the order
 *                  they are passed to async;
 * @arguments    :: only functions
 * @lastArgument :: callback(Array());
 */


module.exports = function () {
  var Events    = require('events');
  var events    = new Events.EventEmitter();
  var fctDone   = 0;
  var sendRes   = [];

  // -1 coz of the callback
  var fctNumber = arguments.length - 1;
  var cb = arguments[fctNumber];

  events.on("data", function () {
    fctDone++;
    if (fctDone === fctNumber) {
      events.emit("end");
    }
  });

  events.on("end", function () {
    events.removeAllListeners("end");
    events.removeAllListeners("data");
    return cb(sendRes);
  });

  for (var i = 0; i < fctNumber; i++) {
    (function (arguments, i) {
      arguments[i](function () {
        var res = [];
        for (var j = 0; j< arguments.length; j++) {
          res.push(arguments[j]);
        }
        sendRes[i] = res;
        events.emit("data");
      });
    }(arguments, i))
  }

};
