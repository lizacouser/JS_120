// Practice Problems: Object Prototypes

// What will the following code log to console? Explain why it logs that value.
// Try to answer without running the code.
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo); // 2 (1 + 1)

// Since baz is initialized using the Object.create function and is passed
// the variable qux as an argument, baz creates a new object whose dunder
// prototype is assigned to baz.
// in line 7 we use dot notation to reference the property foo of baz.
// The computer first checks to see if baz has its own property 'foo'.
// Since that returns undefined, javascript then looks for the
// property 'foo' within the object's prototype (whose reference is
// assigned to the dunder prototype key in baz--in this case qux).
// The program finds a property named 'foo' in  'qux' which has the
// value 1, so baz.foo evaluates to 1. qux.foo is just a normal
// object reference, so it also evaluates to 1. 1 + 1 is 2.


// What will the following code log to console? Explain why it logs that value.
// Try to answer without running the code.
qux = { foo: 1 };
baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo); // 3 (2 + 1)
// This is almost identical to the prevoius example, but has one key
// difference in line 26. line 26 uses dot notation to assign the value 2
// to the property 'foo' in baz. in javascript, when you assign a property
// value in an object with a prototype, it will assign it to the objects
// OWN property, not to a prototype property. since baz does not have its
// OWN property 'foo' (as seen with baz.hasOwnProperty('foo') // false)
// the assignment on line 26 creates a new property in baz, despite the fact
// that its prototype 'qux' has a property of that same name.
// on line 28, baz.foo evaluates to 2, since its own property takes
// precedence over the prototype property. qux.foo is remains unchanged
// so 3 (2 + 1) is logged to the console.


// What will the following code log to the console? Explain why it logs that
// value. Try to answer without running the code.
qux = { foo: 1 };
baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo); // 4
// like in the previous snippets, this code creates two objects, qux
// and baz. baz is declared using the Object.create function, and passed
// a reference to 'qux' as an argument, thereby assigning that reference
// to the dunder property __prototype__ of baz. One line 46, the value of
// qux.foo is changed to 2, which also changes the value of foo in the
// reference associated with baz.__prototype__. baz.__prototype__.foo and
// qux.foo both point to the same value, 2, so baz.foo + qux.foo evaluates
// to 4.


// As we saw in problem 2, the following code creates a new property in the baz
// object instead of assigning the property in the prototype object.
qux = { foo: 1 };
baz = Object.create(qux);
baz.foo = 2;

// Write a function that searches the prototype chain of an object for a
// given property and assigns it a new value. If the property does not
// exist in any of the prototype objects, the function should do nothing.
// The following code should work as shown:

function assignProperty(obj, property, value) {
  // for each level of the chain, until the prototype is null
  // check for property
  // change the value
  let searchObj = obj;
  while (Object.getPrototypeOf(searchObj) !== null) {
    if (searchObj.hasOwnProperty(property)) {
      searchObj[property] = value;
      break;
    }
    searchObj = Object.getPrototypeOf(searchObj);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false


// Consider the following two loops:
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

// If foo is an arbitrary object, will these loops always log the same results
// to the console? Explain why they do or do not. If they don't always log the
// same information, show an example of when the results differ.

// They do not always log the same results.
// A for-in loop logs all properties of an object, INCLUDING the properties
// of its prototype object.
// Object.keys() logs only an object's own properties, and ignores
// the properties of its prototype object.
// see below example:

let protoFoo = {cat: 'Fluffy', dog: 'Spike'};
let foo = Object.create(protoFoo);
foo.horse = 'Penny';

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
// horse: 'Penny'
// cat: 'Fluffy'
// dog: 'Spike'

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

// horse: 'Penny'


// How do you create an object that doesn't have a prototype? How can you
// determine whether an object has a prototype?

// you can create an object that doesn't have a prototype by
// directly setting an object's prototype to null:
let noProtoObj = Object.create(null);

// you can check for a prototype using Object.getPrototypeOf()
Object.getPrototypeOf(noProtoObj) === null; // true
Object.getPrototypeOf(fooA) === null; // false