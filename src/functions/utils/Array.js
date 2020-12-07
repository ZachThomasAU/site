/**
 * Evaluates if two arrays are equal or not. Will not work if the array contains
 * an object, because `{1,2} === {1,2}` will evaluate `false`. **Because of this
 * you should only use this util if you CANNOT import lodash**
 *
 * ```javascript
 * equals([1,2,3], [1,2,3]);          // true
 * equals([1,2,3], [4,5,6]);          // false
 * equals([{1: 2}, 3], [{1: 2}, 3]);  // false
 * ```
 *
 * @param {Array} a - The first array to be evaluated
 * @param {Array} b - The second array to be evaluated
 * @returns {bool} `true` if `a` and `b` are equal; otherwise, `false`
 */
export function equals(a, b) {
  return (
    isArray(a) &&
    isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

/**
 * The `Array.of()` method creates a new `Array` instance from a variable number
 * of arguments, regardless of number or type of the arguments.
 *
 * The difference between `Array.of()` and the `Array` constructor is in the
 * handling of integer arguments: `Array.of(7)` creates an array with a single
 * element, `7`, whereas `Array(7)` creates an empty array with a `length`
 * property of `7`.
 *
 * ```javascript
 * Array.of(7);   // [7]
 * Array(7);      // array of 7 empty slots
 * ```
 *
 * @param {*} elementN - Elements used to create the array.
 * @returns {Array} a new `Array` instance
 */
export function of() {
  return Array.prototype.slice.call(arguments)
}

/**
 * The `Array.isArray()` method determines whether the passed value is an
 * `Array`.
 *
 * ```javascript
 * Array.isArray([1,2,3]);    // true
 * Array.isArray({foo: 123}); // false
 * Array.isArray('foobar');   // false
 * Array.isArray(undefined);  // false
 * ```
 *
 * @param {*} value - the value to be checked
 * @returns {bool} `true` if the value is an Array; otherwise, `false`
 */
export function isArray(value) {
  return Array.isArray(value)
}

/**
 * The `Array.from()` static method creates a new, shallow copied `Array`
 * instance from an array-like or iterable object.
 *
 * ```javascript
 * Array.from('foo');               // Array ["f", "o", "o"]
 * Array.from([1,2,3], x=> x + x)   // Array [2, 4, 6]
 * ```
 *
 * @param {*} iterable - An array-like or iterable object to convert to an
 *  array.
 * @returns {Array} A new `Array` instance
 */
export function from(arg) {
  let O = Object(arg)
  let len = O.length >>> 0
  let A = {}
  let k = 0

  while (k < len) {
    let kValue
    if (k in O) {
      kValue = O[k]
      A[k] = kValue
    }
    k++
  }
  return A
}
