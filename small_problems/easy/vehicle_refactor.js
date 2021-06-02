/*
-refactor to come from a common class
-common properties:
  -make, model
-common methods:
  -getWheels
  -info

-differences:
  -number of wheels
  -truck has a payload

E:
let car = new Car("Honda", "CRV");
let motorcycle = new Motorcycle("Harley", "Davidson");
let truck = new Truck("Chevy", "Silverado");

console.log(car.getWheels())
console.log(motorcycle.getWheels())
console.log(truck.getWheels())
console.log(car.info())
console.log(motorcycle.info())
console.log(truck.info())
console.log(car.payload)
console.log(motorcycle.payload)
console.log(truck.payload)

D:
-strings, classes, functions, objects

A:
-make vehicle class with make and model properties
-add wheels property
-instantiate getWheels and info methods
*/
class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

let car = new Car("Honda", "CRV");
let motorcycle = new Motorcycle("Harley", "Davidson");
let truck = new Truck("Chevy", "Silverado", 42);

console.log(car.getWheels());
console.log(motorcycle.getWheels());
console.log(truck.getWheels());
console.log(car.info());
console.log(motorcycle.info());
console.log(truck.info());
console.log(car.payload);
console.log(motorcycle.payload);
console.log(truck.payload);