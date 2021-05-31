/* eslint-disable no-unused-vars */
// Practice Problems
// If we have a Car class and a Truck class, how can you use
// the Speed object as a mix-in to make them goFast? How can
// you check whether your Car or Truck can now go fast?
const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

Object.assign(Car.prototype, Speed);
let car = new Car();
car.goFast();

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Truck.prototype, Speed);

let truck = new Truck();
truck.goFast();

// In the last question, we used a mix-in named Speed that contained
// a goFast method. We included the mix-in in the Car class and then
// called the goFast method from an instance of the Car class. You
// may have noticed that the string printed when we call goFast
// includes the name of the type of vehicle we are using.
// How is that done?
// Solution
// This works for a few reasons:
// 1) we call goFast using method invocation, which sets the execution context
// for goFast to be the calling object (truck/car). so in goFast, when we
// log this.constructor.name, we are getting the name property on the
// constructor of the calling object car.
// 2) the constructor of car is automatically set to Car when we create the
// object car using class notation and the new keyword.
// 3) javascript automatically assigns a name property to all functions
// declared using a function definition?


// Ben and Alyssa are working on a vehicle management system. Thus far,
// they have created classes named Auto and Motorcycle to represent
// automobiles and motorcycles. After they noticed that the information
// and calculations performed were common to both vehicle types, they
// decided to break out the commonality into a separate class named
// WheeledVehicle. Their code, thus far, looks like this:

// WV has TP, inflate, and range
// Auto is a wheeled vehicle with specific args
// motorcycle is a wheeled vehicle with specific args
// catamaran is not a wheeled vehicle,
// but it wants to do range and has the args:
// propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter

// so we just do vehicle
// with non-tire stuff
// and then have tire stuff as a mix in

const WithTires = {
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
};

class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}


class WheeledVehicle extends Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter, tirePressure) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.tires = tirePressure;
  }
}

Object.assign(WheeledVehicle.prototype, WithTires);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super(50, 25.0, [30,30,32,32]);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super(80, 8.0, [20,20]);
  }
}

class Catamaran extends Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter, propellerCount, hullCount) {
    super(kmTravelledPerLiter, fuelCapInLiter);

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

// This new class doesn't fit well with our existing class hierarchy:
// Catamarans don't have tires, and aren't wheeled vehicles. However,
// we still want to share the code for tracking fuel efficiency and
// range. Modify the class definitions and move code into a mix-in,
// as needed, to share code between the Catamaran and the wheeled
// vehicle classes.

// Given Solution
/*
const Moveable = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
};

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

Object.assign(WheeledVehicle.prototype, Moveable);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, Moveable);
*/