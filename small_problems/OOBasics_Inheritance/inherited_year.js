/*

P:
-create two classes, Truck & Car
-both inherit from Vehicle
-change code so that creating a new Truck
automatically invokes startEngine
-allow Truck to accept a second argument upon instantiation.
-name the parameter bedType and implement the modification
so that Car continues to only accept on argument
-modify the truck class so the start engine takes a string

*/

// class Vehicle {
//   constructor(year) {
//     this.year = year;
//   }
// }

// class Truck extends Vehicle {
//   constructor(year, bedType) {
//     super(year);
//     this.bedType = bedType;
//     this.startEngine();
//   }

//   startEngine() {
//     console.log('Ready to go!');
//   }
// }

// class Car extends Vehicle {
//   // constructor(year) {
//   //   super(year);
//   // }
//   // you don't need this to make the problem work

// }

// let truck = new Truck(2003, 'Short');
// console.log(truck.year); // 2003
// console.log(truck.bedType); // 2003

// let car = new Car(2015);
// console.log(car.year); // 2015

class Vehicle {
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  startEngine(speed) {
    return super.startEngine() + ` Go ${speed}, please!`;
  }
}

let truck1 = new Truck();
console.log(truck1.startEngine('fast'));

let truck2 = new Truck();
console.log(truck2.startEngine('slow'));