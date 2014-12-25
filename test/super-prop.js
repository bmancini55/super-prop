var util          = require('util')
  , mocha         = require('mocha')
  , chai          = require('chai')
  , superprop     = require('../lib/super-prop')
  , expect        = chai.expect
  ;

function Super() {
    this.ctorProp = 'Hello';
}

Super.prototype.cat = function() { 
  return 'black';
};


describe('super-prop', function() {


  describe('#createObj', function() {
    it('should return a function', function() {
      var result = superprop.create({}, Super);
      expect(result).to.be.a('function');
    });
    
    it('should have super methods', function() {
      var result = superprop.create({}, Super);
      expect(result.cat).to.not.be.undefined;
    });
  });


  describe('#define', function() {

    describe('called without name', function() {
      it('should define property named \'super\'', function() {
        function Child() {
          superprop.define(this, Super);
        }
        var sut = new Child();
        expect(sut.super).to.not.be.undefined;
      });
    });

    describe('called with name', function() {
      it('should define property at name specified', function() {
        function Child() {
          superprop.define(this, Super, 'superprop');
        }
        var sut = new Child();
        expect(sut.superprop).to.not.be.undefined;
        expect(sut.super).to.be.undefined;
      });
    });

  });


  describe('calling .super()', function() {
    it('should execute super constructor', function() {
      function Child() {
        superprop.define(this, Super);
        this.super();
      }
      var sut = new Child();
      expect(sut.ctorProp).to.equal('Hello');
    });
  });

  
  describe('calling .super().someMethod()', function() {
    function Child() {
      superprop.define(this, Super);
    }

    it('should execute super\'s method', function() {
      var sut = new Child();
      expect(sut.super.cat()).to.equal('black');
    });
  });


  describe('calling .someMethod()', function() {
    it('should execute child\'s method', function() {
      function Child() {
        superprop.define(this, Super);
      }

      Child.prototype.cat = function() {
        return 'brown';
      };

      var sut = new Child();
      expect(sut.cat()).to.equal('brown');
    });
  });

});