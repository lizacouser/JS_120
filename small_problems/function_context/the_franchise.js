
// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object?
// Try fixing this problem by taking advantage of JavaScript
// lexical scoping rules.

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + ' ' + number;
//     });
//   },
// };

// this doesn't work because this on line 18 is a reference to the global
// object. even though allMovies is being invoked using method
// invocation, the function that uses the "this" keyword is being called as
// a function by map, therefore the execution context is the global object.
// a fix with lexical scoping rules looks like this:
// ***"we'll solve it by employing the lexical scoping of JavaScript to our
// advantage; specifically, the rule that a variable defined in an outer
// scope is available to an inner scope:"***

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     let self = this;
//     return [1, 2, 3].map(function(number) {
//       return self.name + ' ' + number;
//     });
//   },
// };

/*
We solved the problem by taking advantage of lexical scoping and
introducing a new variable self. Solve the same problem again
by passing a hard-bound anonymous function to map.
*/

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

console.log(franchise.allMovies());

/*
Another solution is to use an arrow function as a callback
to map method call, as with arrow functions this is lexically bound:

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(number => {
      return `${this.name} ${number}`;
    });
  },
};
*/