/* eslint-disable*/

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

/*
why is this an error?
-lines 11, 14, & 17 should say this.morning and this.name
-this is a factory function that returns an object with 4 props
and one method that logs a message when invoked
-when we call hellowVictor.greet('morning'), we are using
method execution, so our execution context is set to the calling
object itself, in this case helloVictor. if the switch statement
said ${this.morning} instead of ${morning}, Javascript would know that
we are looking for the morning property within the calling object.
instead, Javascript searches for a local or global variable named morning
and does not find any, so there is a reference error.
You don't necessarily have to say this.name, because "name" is also
the name of the parameter passed into to the factory function.
I don't totally understand it, but one of the otehr students said
closure, so i have to trust it.
*/

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
// Good Morning Victor

