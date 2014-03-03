var Promise = require('bluebird');
var _       = require('underscore');

module.exports = function(EventEmitter) {
  
  var emitThen = function(event, args) {
    args = Array.prototype.slice(arguments, 1);
    //create the storeage place for the events
    //this._events[event] = this._events[event] || [];
    return Promise
      .bind(this)
      .thenReturn(this._events[event] || [])
      .map(function (handler) {
        return handler.apply(handler.context || this, args);
      })
      .thenReturn(null);
  };
  EventEmitter.emitThen = emitThen;
  
  return EventEmitter;
};







