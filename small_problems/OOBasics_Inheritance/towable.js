/*
Part One
Using the following code, create a towMixin mixin that
contains a method named tow that returns
"I can tow a trailer!" when invoked.
Include the mixin in the Truck class.

*/

// const towMixin = {
//   tow() {
//     console.log("I can tow a trailer!");
//   }
// };

// class Truck {
//   constructor() {
//     Object.assign(this, towMixin);
//     // includes methods from towmixin in every object
//   }
// }

// // or alternatively
// // Object.assign(Trick.prototype, towMixin);
// // better for memory because stored in prototype

// class Car {}

// let truck = new Truck();
// truck.tow();


/*
Part Two
Using the following code, create a class named Vehicle
that, upon instantiation, assigns the passed in argument
to year property.
Both Truck and Car should inherit from Vehicle

-create vehicle class
-constructor takes one argument, year
*/

const towMixin = {
  tow() {
    return "'I can tow a trailer!'";
  }
};

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year);
    Object.assign(this, towMixin);
  }
}

class Car extends Vehicle {}

let truck = new Truck(2002);
console.log(truck.year);
console.log(truck.tow());

let car = new Car(2015);
console.log(car.year);