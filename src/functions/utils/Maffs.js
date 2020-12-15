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
 * **WARNING! IF THE SUM OF THE SERIES A[i]e[i] IS A BIG_NUM, THEN THIS DOES
 * NOT WORK (YET...). TUNE BACK LATER TO SEE IF WE HAVE IT FIXED!**
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
  //FIXME: This still doesn't work for BIG_NUMs. 
  let sum = "0"
  let prod = n.reduce((b, c) => {
    return multiply(b.toString(), c.toString())
  })

  for (let i = 0; i < a.length; i++) {
    console.log("Solving x ≡", a[i], "mod", n[i])
    const p = Math.floor(prod / n[i])
    const inv = modInverse(p, n[i]) ? modInverse(p, n[i]) : 1
    //console.log("Sum:", sum)
    //console.log("adding...", a[i] * p * inv)
    sum = add(sum, (a[i] * p * inv).toString())
  }
  console.log(sum, prod)
  return modulo(sum, prod)
}

/**
 * This function adds VERY large numbers, avoiding JavaScripts erroneous
 * rounding. This function is not the most performative way to add strings,
 * merely the safest. If you want to add two small strings, consider using a
 * less operations intense function. 
 * 
 * **Note - the numbers you're adding must be in string format. Naturally, that
 * is how we avoid JS's rounding.**
 * @param {String} str1 - the first number to be added, preferably the larger.
 * @param {String} str2 - the second number to be added, preferably the smaller.
 * @returns {Stirng} the sum of the two numbers, as a string. 
 */
export function add(str1, str2) {
  let sum = ""
  let str1Len = str1.length
  let str2Len = str2.length
  let carry = 0

  if (str2Len > str1Len) {
    let temp = str2
    str2 = str1 
    str2Len = str2.length
    str1 = temp
    str1Len = str1.length
  }

  for (let i=0; i<str1.length; i++) {
    let a = parseInt(str1[str1Len - 1 - i])
    let b = parseInt(str2[str2Len - 1 - i])
    b = (b) ? b : 0
    let temp = (carry + a + b).toString()
    let digitSum = temp[temp.length - 1]
    carry = parseInt(temp.substr(0, temp.length - 1))
    carry = (carry) ? carry : 0

    // Zach DO NOT change this! Think about it, you need to add the sum to the
    // end of the string, so sum += is going to reverse the string!
    sum = (i === str1Len - 1) ? temp + sum : digitSum + sum
  }

  return sum
}

/**
 * This function multiplies VERY large numbers, avoiding JavaScripts erroneous
 * rounding. This function is not the most performative way to multiply strings,
 * merely the safest. If you want to add multiply small strings, consider using 
 * a less operations intense function. 
 * 
 * **Note - the numbers you're multiplying must be in string format. Naturally, 
 * that is how we avoid JS's rounding.**
 * @param {String} str1 - the first number to be multiplied, preferably the 
 *  larger.
 * @param {String} str2 - the second number to be multiplied, preferably the 
 *  smaller.
 * @returns {Stirng} the product of the two numbers, as a string. 
 */
export function multiply(str1, str2) {
  let str1Len = str1.length
  let str2Len = str2.length

  if (str2Len > str1Len) {
    let temp = str2
    str2 = str1 
    str2Len = str2.length
    str1 = temp
    str1Len = str1.length
  }

  let prod = new Array(str1Len).fill("")

  for (let i=0; i<str1Len; i++) {
    let a = parseInt(str1[str1Len - 1 - i])
    let carry = 0
    for (let j=0; j<i; j++) {
      prod[i] += "0"
    }
    console.log("Beginning product", i, "with base of", prod[i])
    for (let j=0; j<str1Len; j++) {
      let b = parseInt(str2[str2Len - 1 - j])
      b = (b) ? b : 1
      let temp = (a * b + carry).toString()
      console.log("solving", a, "*", b, "+", carry, "=", temp)
      let digitSum = temp[temp.length - 1]
      carry = parseInt(temp.substr(0, temp.length - 1))
      carry = (carry) ? carry : 0
      prod[i] = (j === str1Len - 1) ? temp + prod[i]: digitSum + prod[i]
    }
    console.log("product", i, "=", prod[i])
  }

  return prod.reduce((a,b) => {
    return add(a, b)
  })
}

/**
 * This function finds the remainder of VERY large numbers, avoiding JavaScripts
 * erroneous rounding. This function is not the most performative way to find
 * perfrom modular arithmetic on a string, merely the safest. If you want to mod
 * a small string with a small modulus, consider using a less operations intense 
 * function. 
 * 
 * **Note - the numbers you're computing must be in string format. Naturally, 
 * that is how we avoid JS's rounding.**
 * @param {String} str - The number to be operated on. 
 * @param {String} divisor - The modulus to operate with.
 * @returns {String} - The congruence of str (mod divisor), as a string. 
 */
export function modulo(str, divisor) {
  let temp = ""
  for (let i=0; i< str.length; i++) {
    temp += str[i]
    let r = temp % divisor
    temp = r.toString(10)
  }
  return temp / 1
}
