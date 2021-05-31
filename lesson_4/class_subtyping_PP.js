// Practice Problems: Subtyping with Classes
// Suppose we have the following classes:
class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

// What would happen if we added a play method to the Bingo class,
// keeping in mind that there is already a method of this name in
// the Game class from which the Bingo class inherits?
// Explain your answer. What do we call it when we define a
// method like this?

// Solution
// if we define a method in the subclass Bingo that already is
// defined in the parent class, the method in the
// child class will override the method in the parent class.
// METHOD OVERRIDING
// if we called play on an instance of Bingo, JS runtime would
// first look for the method within the instance object itself
// then go to the object's prototype, which in this case
// would point to Bingo.prototype, to search for the method.
// when we declared a method play in the Bingo class, that method
// was stored in the Bingo constructor's prototype object.
// When javascript searches that prototype object, it will find
// the method play, and execute it within the execution context
// of the calling object. Since the method was found in the Bingo
// prototype object, JS no longer needs to search up the prototypal
// chain for the method, so the play method defined in the Game class
// will be ignored/overridden.


// Let's practice creating a class hierarchy.
// Create a class named Greeting that has a single method named greet.
// The method should take a string argument, and it should print that
// argument to the console.

// Now, create two more classes that inherit from Greeting:
// one named Hello, and the other Goodbye. The Hello class
// should have a hi method that takes no arguments and
// logs "Hello". The Goodbye class should have a bye method
// that logs "Goodbye". Use the greet method from the Greeting
// class when implementing Hello and Goodbye; don't call
// console.log from either Hello or Goodbye.

// Solution
class Greeting {
  // constructor() {}

  greet(message) {
    console.log(message);
  }
}

class Hello extends Greeting {
  // constructor() {
  //   super();
  // }

  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  // constructor() {
  //   super();
  // }
  bye() {
    this.greet('Goodbye');
  }
}

let hello = new Hello();
let goodbye = new Goodbye();
let greeting = new Greeting();

hello.hi(); // logs hello
goodbye.bye();  // logs goodbye
greeting.greet('sup'); //logs sup
goodbye.greet('hey'); // logs hey

//greeting.bye(); // type error
//hello.bye();  // type error