/**
 * This Password Rule takes the first policy value as the minimum number of
 * times a term can appear in a password, and the second policy value as the
 * maximum number of times a term can appear in a password.
 *
 * This is the rule used by the Sled Rental Shop's corporate policy.
 *
 * @param {Array<String>} text - An array containing a string of each password,
 *    and the corporate policy in effect when the password was set.
 * @returns {number} the number of valid passwords in the input text.
 */
export function ruleHighLow(text) {
  let valid = 0
  text.forEach(elem => {
    if (elem === "") {
      return
    }
    const min = getFirstPolicyValue(elem)
    const max = getSecondPolicyValue(elem)
    const search = getPolicyTerm(elem)
    const password = getPassword(elem)

    for (let i = 0; i < password.length; i++) {
      let count = 0
      for (let j = 0; j < password.length; j++) {
        if (password[i] === password[j]) {
          count++
        }
      }
      if (password[i] === search && count <= max && count >= min) {
        valid++
        break
      }
    }
  })
  return valid
}

/**
 * This Password Rule expects a term to appear exactly once in the two positions
 * given by the policy. The first policy value is position one, and the second
 * policy value is position two. **REMEMBER - THE VALUE IS NOT INDEXED TO 0.**
 *
 * This is the rule used by the Official Toboggan Corporate Policy
 *
 * @param {Array<String>} text - An array containing a string of each password,
 *    and the corporate policy in effect when the password was set.
 * @returns {number} the number of valid passwords in the input text.
 */
export function ruleXorPosition(text) {
  let valid = 0
  text.forEach(elem => {
    if (elem === "") {
      return
    }
    const pos1 = getFirstPolicyValue(elem)
    const pos2 = getSecondPolicyValue(elem)
    const search = getPolicyTerm(elem)
    const password = getPassword(elem)

    if ((password[pos1] === search) ^ (password[pos2] === search)) {
      valid++
    }
  })
  return valid
}

/**
 * Gets the first value in a corporate policy instruction
 * @param {string} string - A string containing the corporate policy at the
 *    beginning of the string.
 * @returns {string} the first value in the corporate policy instruction.
 */
function getFirstPolicyValue(string) {
  return string.split("-")[0]
}

/**
 * Gets the second value in a corporate policy instruction
 * @param {string} string - A string containing the corporate policy at the
 *    beginning of the string.
 * @returns {string} the second value in the corporate policy instruction.
 */
function getSecondPolicyValue(string) {
  return string.split("-")[1].split(" ")[0]
}

/**
 * Gets the search term from a corporate policy instruction
 * @param {string} string - A string containing the corporate policy at the
 *    beginning of the string.
 * @returns {string} the term to search for in the corporate policy instruction.
 */
function getPolicyTerm(string) {
  return string.split(" ")[1][0]
}

/**
 * Gets the password from a corporate policy instruction
 * @param {string} string - A string containing a password at the end of the
 *    string.
 * @returns {string} the password to validate using the corporate policy
 *    instruction.
 */
function getPassword(string) {
  return string.split(":")[1]
}
