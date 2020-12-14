/*!
 * Zach's Mathematics Package (Maffs) v0.0.1
 * Copyright 2020 Zachary Thomas
 * MIT Licence
 */

/**
 * This is a recursive (read: **slow**) greatest common divisor function.
 * @param {number} a - a number.
 * @param {number} b - some other number.
 * @returns {number} the greatest common divisor of a and b.
 */
export function gcd(a, b) {
  if (!b) {
    return a
  }
  return gcd(b, a % b)
}

/**
 * This is a modular arithmetic solver. It takes some remainder R, and some
 * modulus M, and returns the first N possible solutions to the linear equation:
 *
 * ```
 * x = r (mod M)
 * ```
 *
 * Function is O(n). Always computes `4n + 2` operations.
 *
 * @param {number} r - The remainder to solve for.
 * @param {number} m - The modulus to solve for.
 * @param {number} n - The number of solutions to return.
 * @returns {Array<number>} an array of possible solutions, in order.
 */
export function modularSolutions(r, m, n) {
  let ans = []
  for (let i = 0; i < n; i++) {
    ans.push(m * i + r)
  }
  return ans
}

/**
 * Finds the modular multiplicative inverse of `a (mod m)` via brute force.
 * **Remember: An inverse only exists IFF `a` and `m` are coprime**.
 *
 * Function is O(n). At worst, `5(m-1) + 2` operations. Performs worst case if
 * no answer exists.
 * @param {number} a - Some integer.
 * @param {number} m - Some modulo.
 * @returns the multiplicative inverse, if one exists.
 */
export function modInverse(a, m) {
  a %= m
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x
    }
  }
}

/**
 * ** WARNING! THIS FUNCTION SOMETIMES HAS OFF-BY-ONE ERRORS! UNSURE WHAT
 * CAUSES THE ERRORS AT THIS STAGE **
 *
 * This is a slow Chinese Remainder Theorem function. Takes a sequence of
 * remainders, A, and a sequence of moduli, N, and returns some value X such
 * that X is congruent to each sequence of A (mod N). That is:
 * ```
 * x ≡ a_1 (mod n_1)
 * x ≡ a_2 (mod n_2)
 * x ≡ a_3 (mod n_3)
 * ```
 * and so on.
 *
 * This function is O(n). At worst `2n + 50am - 30a + 5` operations, where
 * m is the largest value in n.
 *
 * @param {Array<Number>} a - an Array of remainders.
 * @param {Array<Number>} n - an Array of moduli.
 * @returns {number} The solution to the congruence equation systems, if one
 * exists.
 */
export function crt(a, n) {
  //FIXME: I have an off-by-one error, but only sometimes!
  let sum = 0
  let prod = n.reduce((a, c) => {
    return a * c
  })
  for (let i = 0; i < a.length; i++) {
    const p = Math.floor(prod / n[i])
    const inv = modInverse(p, n[i]) ? modInverse(p, n[i]) : 1
    sum += a[i] * p * inv
  }
  return sum % prod
}
