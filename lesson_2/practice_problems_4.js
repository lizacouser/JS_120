// 1.
// The code below should output "Christopher Turk is a
// Surgeon". Without running the code, what will it output?
// If there is a difference between the actual and desired
// output, explain the difference.
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
// ANSWER: This will not work as intended.
// because turk.getDescription is passed into the function logReturnVal
// as an argument, and it's executed on line 18 as a function
// the implicit execution context is the global object, rather than
// the 'turk' object. Since the global object doesn't have the properties
// "firstName", "lastName" etc, this.firstName etc. will evaluate to undefined.
// line 22 will log "undefined undefined is a undefined"

/* Official answer
When we pass turk.getDescription to logReturnVal as an argument,
we remove the method from its context. As a result, when we
execute it as func, this points to the global object rather
than turk. Since global doesn't have properties defined for
firstName, lastName, or occupation, the output isn't what we expect.
*/


// 2.
// Modify the program from the previous problem so that
// logReturnVal accepts an additional context argument.
// If you then run the program with turk as the
// context argument, it should produce the desired output.
let turk2 = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                + this.occupation + '.';
  }
};

function logReturnVal2(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal2(turk2.getDescription, turk2);


// 3.
// Suppose that we want to extract getDescription from turk,
// but we always want it to execute with turk as its execution
// context. How would you modify your code to do that?
let turk3 = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                + this.occupation + '.';
  }
};

let getTurkDescription = turk3.getDescription.bind(turk3);
getTurkDescription();


// 4.
// Consider the following code:
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
// Will this code produce the following output? Why or why not?
// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

// ANSWER: No.
// The execution context for seriesTitle is the global object
// not TESGames. This is because the anonymous function using
// this.seriesTitle is being call by forEach, whose implicit context is
// the global object. This will output:
// undefined: Arena
// undefined: Daggerfall
// etc.

// 5.
// Use let self = this; to ensure that TESgames.listGames
// uses TESGames as its context and logs the proper output.
const TESgames2 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames2.listGames();


// 6.
// The forEach method provides an alternative way to supply
// the execution context for the callback function. Modify
// the program from the previous problem to use that technique
// to produce the proper output:
const TESgames3 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames3.listGames();

// 7.
// Use an arrow function to achieve the same result:
const TESgames4 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames4.listGames();

// 8.
// Consider the following code:
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
// What will the value of foo.a be after this code runs?

// ANSWER: 0
// the implicit execution context for increment is the global object
// because it is invoked as a function on line 158.
// the computer will search for the propoerty "a" in the global object
// and will return undefined. each time incrementA is called,
// it will be attempting to increment the global property a, rather than
// foo.a, so foo.a will remain unchanged.

// 9.
// Use one of the methods we learned in this lesson to invoke
// increment with an explicit context such that foo.a gets
// incremented with each invocation of incrementA.
let foo2 = {
  a: 0,
  incrementA: function() {
    let increment = () => {
      this.a += 1;
    };

    increment();
  }
};

foo2.incrementA();
foo2.incrementA();
foo2.incrementA();