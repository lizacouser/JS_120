/*
-rewrite constructors as classes
-
*/

// function Person() {
// }
// Person.prototype.greeting = function(text) {
//   console.log(text);
// };

class Person {
  greeting(text) {
    console.log(text);
  }
}

// function Shouter() {
//   Person.call(this);
// }
// Shouter.prototype = Object.create(Person.prototype);
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// };

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.