// 1 What does the following code log to the console?
// Try to answer without running the code.
// Can you explain why the code produces the output it does?

let RECTANGLE = { 
  // object literal with two methods, area & perimeter
  // both use this
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

// Rectangle constructor, two parameters
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area(); // called using method, RECTANGLE doesn't have width & height yet
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);  // logs NaN
console.log(rect1.perimeter); // logs NaN

// 2 How would you fix the problem in the code from problem 1?
// set prototype object of the constructor to
// RECTANGLE2, and inherit those methods
// then you can either console.log(rect2.area()),
// or set this.area to this.area() within the constructor
// another option is to just use RECTANGLE.area.call(this),
// and forget about inheritance stuff

let RECTANGLE2 = { 
  // object literal with two methods, area & perimeter
  // both use this
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

// Rectangle constructor, two parameters
function Rectangle2(width, height) {
  this.width = width;
  this.height = height;
  this.area = this.area();
  this.perimeter = this.perimeter();
}

Rectangle2.prototype = RECTANGLE2;

rect1 = new Rectangle2(2, 3);

console.log(rect1.area);  // logs 6
console.log(rect1.perimeter); // logs 10

// 3 Write a constructor function called Circle that
// takes a radius as an argument. You should be able to
// call an area method on any objects created by the
// constructor to get the circle's area. Test your
// implementation with the following code:

// define a constructor that takes one arg
// create a method within constructor that gets area using pi r ^2
// but the circle hsouldn't have its own property

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
}

let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2); // => 28.27
b.area().toFixed(2); // => 50.27
a.hasOwnProperty('area'); // => false


// 4 What will the following code log to the console and why?
function Ninja() {
  this.swung = true;  // property on constructor
}

let ninja = new Ninja();
// creates new object
// sets prototype of object to Ninja.prototype
// set this of object to itself
// returns the new object ninja

Ninja.prototype.swingSword = function() {
  return this.swung;
};
// adds method to Ninja.prototype that returns the
// value assigned to the swung property on the instance

console.log(ninja.swingSword()); // logs true?

// 5 What will the following code output and why?
// Try to answer without running the code.
function Ninja2() {
  this.swung = true;
}

ninja = new Ninja2();

Ninja2.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword()); // also logs true? NO!
// TypeError, ninja.swingSword is not a function
// this is because we're reassigning Ninja.prototype, rather
// than mutating. since we change Ninja2's prototype after creating ninja,
// ninja's prototype points to a different object than Ninja2.prototype


// 6 Implement the method described in the comments below:
function Ninja3() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
Ninja3.prototype.swing = function() {
  this.swung = true;
  return this;
}

let ninjaA = new Ninja3();
let ninjaB = new Ninja3();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`


// 7 In this problem, we'll ask you to create a new
// instance of an object, without having direct access
// to the constructor function:

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
ninjaB = new ninjaA.constructor();
// object.create() doesn't work cuz it'll put a copy of swung into
// prototype object instead of ninjaB object

console.log(ninjaA.constructor === ninjaB.constructor) // => true

// 8 Since a constructor is just a function, you can call it
// without the new operator. However, that can lead to unexpected
// results and errors, especially for inexperienced programmers.
// Write a constructor function that you can use with or without
// the new operator. The function should return the same result
// with either form. Use the code below to check your solution:
// function User(first, last) {
//   this.name = first + " " + last;
//   return this;
// }
// ^^ mine doesn't work cuz it doesn't do any of the functionality of the
// new keyword.

// or
function User(first, last) {
  if (this instanceof User) {
    this.name = first + " " + last;
  } else {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

// SCOPE-SAFE CONSTRUCTOR