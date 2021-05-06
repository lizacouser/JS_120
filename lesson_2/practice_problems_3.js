// 1. What method can we use to bind a function permanently to
// a particular execution context?
// ANSWER: Object.prototype.bind()

// 2. What will the following code log to the console?
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

// ANSWER: doesn't log anything, just returns a new function that
// whose execution context is permanently set to obj
// if you were to call foo.bind(obj)(), then
// 'Javascript' would be logged to the console.

// What will the following code output?
obj = {
  a: 2,
  b: 3,
};

function foo2() {
  return this.a + this.b;
}

let bar = foo2.bind(obj);

console.log(foo2());
console.log(bar());

// ANSWER:
// NaN
// 5
// on line 33, the return value of foo2() is logged to the console.
// since foo2() is being called as a function, its implicit execution context
// is the global object. since a and b are not defined properties of the
// global object, foo2() returns undefined + undefined, which evaluates to
// NaN. On line 34 however, we call bar(), whose execution context
// is the object 'obj' assigned on line 22. this is because on line 31,
// we use the bind method to permanently set the execution context of bar
// to be 'obj'.
// follow up question: what happens when obj is modified?
// follow up answer: that's fine. the object isn't frozen. 
// bar() would just evaluate to 6


// What will the code below log to the console?
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo3() {
  console.log(this.message);
}

let bar2 = foo3.bind(positivity);

negativity.logMessage = bar2;
negativity.logMessage();

// ANSWER: 'Javascript makes sense!'
// because on line 53, the bind method is used to permanently set
// the execution context for bar2, to be the object 'positivity'
// even when the method is called from the 'negativity' object,
// the explicit execution context is still 'positivity'


// What will the code below output?
obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo4() {
  console.log(this.a);
}

let bar3 = foo4.bind(obj);

bar3.call(otherObj);

// ANSWER:
// this code will still log 'amazebulous' because on line 89, the execution
// context of bar3 was permanently set to 'obj' using the bind method.
// The context will always be 'obj', even if you use apply, or call