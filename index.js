var Promise = require('bluebird');
var _       = require('underscore');

module.exports = function(EventEmitter) {

  var emitThen = function(type) {
    var er, handler, len, args, i, listeners;

    if (!this._events)
      this._events = {};

    // If there is no 'error' event listener then throw.
    if (type === 'error' && !this._events.error) {
      er = arguments[1];
      if (this.domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event.');
        er.domainEmitter = this;
        er.domain = this.domain;
        er.domainThrown = false;
        this.domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw Error('Uncaught, unspecified "error" event.');
      }
      return false;
    }

    handler = this._events[type];

    if (util.isUndefined(handler))
      return false;

    if (this.domain && this !== process)
      this.domain.enter();

    if (util.isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          handler.apply(this, args);
      }
    } else if (util.isObject(handler)) {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];

      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }

    if (this.domain && this !== process)
      this.domain.exit();

    return true;
  };

  EventEmitter.emitThen = emitThen;



  return EventEmitter;
};







