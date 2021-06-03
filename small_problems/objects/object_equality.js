/*
P:
-write a function to determine if two objects have the same key value pairs
-two object args
-return true if object have same key/value pairs

E:
-same keys, different values
-same values, different keys
-same keys & values, different pairings
-same keys and values, different order
-empty objects
-arrays as values...
-we're not going to worry about non-enumerable or prototype chain

D:
-input objects
-output boolean
-internal arrays?

A:
-declare function with two object args
-iterate through keys in obj1
  -check if obj2 has own property
    -if not return false
  -check if their values match (look out for arrays in this step)
    -if not return false
  -add to list of checked properties
-are there any properties in obj2 that haven't been added
to the matchedProperties list? if so, return false
*/

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  let matchingProperties = [];
  for (let key in obj1) {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) return false;
    if (obj1[key] !== obj2[key]) return false;
    matchingProperties.push(key);
  }

  for (let key in obj2) {
    if (!matchingProperties.includes(key)) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo'}, {a: 'bar'}));                      // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'bar', b: 'foo'}));  // false
console.log(objectsEqual({a: 'foo'}, {b: 'foo'}));                      // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: 'bar', a: 'foo'}));  // true
console.log(objectsEqual({a: 'foo'}, {a: 'foo', b: 'bar'}));            // false
console.log(objectsEqual({a: ['foo']}, {a: ['foo']}));                  // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

// -we're not going to worry about non-enumerable or prototype chain or deep equality

// alt solution:
function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}
