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

    emitter.on('testEvent', function(item) {
      console.log('yay#######');
      return Promise.resolve(item);
    });

    emitter.emitThen('testEvent', 'resolved')
      .then(function(item) {
        console.log('here is item ', item);
        item[0].should.equal('resolved');
        return 'foo';
      })
      .then(function() {
        done();
      });

      
  });

});
