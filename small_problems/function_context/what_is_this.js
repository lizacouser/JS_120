/* eslint-disable */

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// what is logged?
// NaN

// Anywhere outside a function, the keyword this
// is bound to the global object.
// If the keyword is used inside a function,
// then its value depends on how the function was invoked.

