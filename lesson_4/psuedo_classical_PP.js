// Practice Problem
// Consider the following code:
function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};


// What happens in each of the following cases?
// Try to answer without running the code.

// Case 1
let hello1 = new Hello();
hello1.hi();
// logs hello

// Case 2
let hello2 = new Hello();
hello2.bye();
// typeError there's no function bye()

// Case 3
let hello3 = new Hello();
hello3.greet();
// log undefined

// Case 4
let hello4 = new Hello();
hello4.greet('Goodbye');
// logs Goodbye

// Case 5
Hello.hi();
// typeError, hi isn't a method on the Hello constructor,
// or on the constructor's prototype chain, it's stored
// in the prototype object of the constructor