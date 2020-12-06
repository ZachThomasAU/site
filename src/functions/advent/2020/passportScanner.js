/**
 * Takes a batch file of passports, and returns the number of passports with
 * the correct fields for a passport (excluding the countryID)
 *
 * @param {Array<String>} text - A batch file containing a number of strings
 *  representing passports.
 * @returns {number} the number of passports with valid fields.
 */
export function validateFields(text) {
  let count = 0
  let valid = 0

  splitPassports(text).forEach(e => {
    if (e == "") {
      if (count === 7) {
        valid++
      }
      count = 0
      return
    }
    e.forEach(e => {
      const key = e.substr(0, 3)
      if (["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].includes(key)) {
        count++
      }
    })
  })

  return valid
}

/**
 * Takes a batch file of passports, and returns the number of valid passports in
 * the batch, excluding the countryID field.
 *
 * @param {Array<String>} text - A batch file containing a number of strings
 *  representing passports.
 * @returns {number} the number of valid passports
 */
export function validateValues(text) {
  let count = 0
  let valid = 0

  splitPassports(text).forEach(e => {
    if (e == "") {
      if (count === 7) {
        valid++
      }
      count = 0
      return
    }

    e.forEach(e => {
      const key = e.split(":")[0]
      let val = e.split(":")[1]
      if (key === "byr") {
        count += validateBirthYear(val)
      }
      if (key === "iyr") {
        count += validateIssueYear(val)
      }
      if (key === "eyr") {
        count += validateExpirationYear(val)
      }
      if (key === "hgt") {
        count += validateHeight(val)
      }
      if (key === "hcl") {
        count += validateHairColour(val)
      }
      if (key === "ecl") {
        count += validateEyeColour(val)
      }
      if (key === "pid") {
        count += validatePassportID(val)
      }
    })
  })

  return valid
}

/**
 * Takes a batch file containing a number of passports, and splits each passport
 * into an array of every field and value.
 *
 * E.g. It takes some passport "iyr:1928 cid:150 pid:476113241" and splits it
 * into an array ["iyr:1928", "cid:150", "pid:476113241"].
 * @param {Array<String>} text - A batch file containing a number of strings
 *  representing passports.
 * @returns {Array<Array<String>>} An array of passports split by each field.
 */
function splitPassports(text) {
  let passports = []
  text.forEach(e => {
    passports.push(e.split(" "))
  })

  return passports
}

/**
 * Takes a value, and determines if that value is a valid birth year.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateBirthYear(val) {
  if (val.length === 4 && val >= 1920 && val <= 2002) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid issue year.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateIssueYear(val) {
  if (val.length === 4 && val >= 2010 && val <= 2020) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid expiration year.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateExpirationYear(val) {
  if (val.length === 4 && val >= 2020 && val <= 2030) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid height.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateHeight(val) {
  const unit = val.substr(-2)
  val = val.substr(0, val.length - 2)
  if (unit === "cm" && val >= 150 && val <= 193) {
    return 1
  }
  if (unit === "in" && val >= 59 && val <= 76) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid hair colour.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateHairColour(val) {
  let bool = true
  for (let i = 0; i < val.length; i++) {
    if (i === 0 && val[i] !== "#") {
      bool = false
    } else if (i !== 0) {
      if (val[i] < 0 || val[i] > 9) {
        if (!["a", "b", "c", "d", "e", "f"].includes(val[i])) {
          bool = false
        }
      }
    }
  }
  if (bool === true) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid eye colour.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateEyeColour(val) {
  if (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val)) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid passport ID.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validatePassportID(val) {
  if (val.length === 9) {
    return 1
  }
}

/**
 * Takes a value, and determines if that value is a valid Country ID.
 * @param {number} val - The value to be validated
 * @returns {number} A 1 if valid, void if invalid
 */
function validateCountryID(val) {
  // This is not required yet
}
