var mocha   = require('mocha');
var should  = require('should');
var Promise = require('bluebird');

describe('emitThen', function() {

  it('should run the function when emitThen is called', function(done) {
    var EventEmitter = require('events').EventEmitter;
    var Emitter = function() {
      EventEmitter.apply(this, arguments);
    };
    
    Emitter.prototype = Object.create(require('../index.js')(EventEmitter.prototype));
  
    var emitter = new Emitter();

    console.log(emitter)
    
    emitter.on('testEvent', function(item) {
      return Promise.resolve(item);
    });

    emitter.emitThen('testEvent', 'resolved')
      .then(function(item) {
        item[0].should.equal('resolved');
        done();
      });
  });

});
