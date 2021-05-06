//Practice Problems: Implicit and Explicit Function
// Execution Contexts


// What will the following code output?
// Try to determine the results without running the code.

function func() {
  return this;
}

let context = func();
console.log(context);
// logs global object
// the implicit context for a regular function
// is the global object


// What will the following code output?
// Explain the difference, if any, between this output
// and that of problem 1.

let obj = {
  func: function() {
    return this;
  },
};

context = obj.func();
console.log(context);
// logs {func: [Function: func]}
// this logs the value assign to obj
// because the method is invoked with method invocation
// and the execution context for method invocation
// is implicitly the object on which the method is called


// What will the following code output?
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();
// logs 'Hello from the global scope!'
// the context for the regular function call here is the
// global object. since message is a global variable
// (because it was declared without a key word)
// it logs the value assigned to 'message'

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;
foo.deliverMessage();
// logs 'Hello from the function scope!'
// this created a new property in the foo object
// and assigned it the value of the deliveryMessage function
// since feliver message is called on the foo object
// using method invocation, the execution context is
// again implicitly the object on which it is called


// What built-in methods have we learned about that
// we can use to specify a function's execution context
// explicitly?

// call and apply


// Take a look at the following code snippet.
// Use call to invoke the add method but with foo
// as execution context. What will this return?
foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add: function() {
    return this.a + this.b;
  },
};

console.log(bar.add.call(foo));
// logs 3
// it takes the add method, but calls it with foo as the execution context
// so this.a refers to foo.a, rather than bar.a
// to log 'abcdef', i would have to call
console.log(bar.add());