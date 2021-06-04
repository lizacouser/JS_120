/*
Implement an ancestors method that returns the prototype chain (ancestors)
of a calling object as an array of object names. Here's an example output:

P:
-input n/a
-output prototype chain of calling object as an array of object names

E:
-see below

D:
-input n/a
-output array of strings
-internal objects

A:
-define a method
-create an empty array
-while getPrototypeOf(this) is not equal to itself
-add getPrototypeOf(this).name to array
-change this to its orprotype
-print array
*/


// function ancestors() {
//   let ancestorList = [];

//   let self = this;
//   while (self !== Object.getPrototypeOf(self)) {
//     ancestorList.push(Object.getPrototypeOf(self));
//     self = Object.getPrototypeOf(self);
//   }

//   console.log(ancestorList);
// }

// recursive suggestion
Object.prototype.ancestors = function ancestors() {
  let ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
};

// name property added to make objects easier to identify
let foo = {
  name: 'foo',

//   ancestors() {
//     let ancestorList = [];

//     let ancestor = Object.getPrototypeOf(this);
//     while (Object.getPrototypeOf(ancestor) !== null) {
//       ancestorList.push(ancestor.name);
//       ancestor = Object.getPrototypeOf(ancestor);
//     }
//     ancestorList.push('Object.prototype');

//     console.log(ancestorList);
//   }
};

let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';


qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']