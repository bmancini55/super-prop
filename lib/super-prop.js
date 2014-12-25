var util = require('util');

/** 
 * Attaches a `super` property to an object
 * that contains the methods on the supplied
 * Type bound to the current instance.
 *
 * @api public
 * @param {Object} scope - the instance to 
 *  bind methos to
 * @param {Function} Type - the prototype
 *  of the super Type
 * @param {String} [name] - the name of the
 *  property, defaults to 'super'
 */
function define(scope, Type, name) {
  var propName        = name || 'super'
    , propInernalName = '_' + propName;

  Object.defineProperty(scope, propName, {
    writeable: false,
    get: function() {
      if(!this[propInernalName]) {
        this[propInernalName] = create(this, Type);
      }
      return this[propInernalName];
    }
  });
}

/**
 * Creates an object containing methods
 * of the specificed proptotype that will be
 * bound to the supplied scope. This function
 * also creates a constructor property that is
 * a function call for the supplied prototype
 *
 * @api public
 * @param {Object} scope - the instance to 
 *  bind methos to
 * @param {Function} Type - the prototype
 *  of the super Type
 */
function create(scope, Type) {

  // make result the constructor
  var result = function() {
    Type.call(scope);
  };

  // attach methods to result
  for(var key in Type.prototype) {
    if(typeof Type.prototype[key] === 'function') {
      result[key] = Type.prototype[key].bind(scope);
    }
  }

  return result;
}


module.exports = {
  define: define,
  create: create
};

