super-prop
==========

>Attach a property accessor for the super class

Ever wanted some syntactic sugar for calling functions up the prototype chain? The usual technique of `BaseClass.prototype.someMethod.call(this)` leaves a bit to be desired. 

What does `super-prop` do?

1. Gives you sugar for calling base/super class methods
2. Gives you sugar for calling the base/super constructor
3. Lazy-loads the bindings

More importantly, what does `super-prop` look like?

```javascript
Child.prototype.validate = function() {
  // call super class's validate method
  this.super.validate();
  
  // then do my own stuff here
}
```

## Getting Started

Install `super-prop`
```
npm install super-prop
```

When creating a child class..
```javascript
var superprop = require('super-prop');

// Given you have a Parent 'class' that you are 
// inheriting from, create your Child as follows:
function Child() {
  // This will create a new property called 'super'
  // that can execute the parent methods bound to
  // the current instance
  superprop.define(this, Parent);
  
  // You can also call the super constructor
  // with sugar for Parent.call(this);
  this.super();
}
```

Now, you can simply access the base/super method via the `super` property! 
```javascript
Child.prototype.validate = function() {
  // call super class's validate method
  this.super.validate();
  
  // then do my own stuff here
}
```
Previously, you'd have to use `Parent.prototype.validate.call(this)`.  Now we can just use `this.super.validate()` to do the same thing.

##Example
```javascript
var superprop = require('super-prop')
  , util      = require('util');

// Given a parent class
function Parent() {}
Parent.prototype.greet = function() {
  console.log('Hello!');
}

// Create a child class
function Child() {
  // attaches the property 'super'
  superprop.define(this, Parent);
  
  // call the super constructor
  // which is sugar for: Parent.call(this);
  this.super();
}

// make Child inherit from Parent in standard Node fashion
util.inherits(Child, Parent);

// override greeting on child
Child.prototype.greet = function() {
  this.super.greet();
  console.log('Hola');
}

// create an instance of the child
var child = new Child();

// logs 'Hello' then 'Hola'
child.greet();
```

## Contributing
In lieu of a formal style guide please maintain consistency through the code base and add appropriate unit tests. To validate your code run `grunt validate`

