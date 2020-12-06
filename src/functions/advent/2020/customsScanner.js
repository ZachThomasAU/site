/**
 * Takes in a batch of customs declaration forms, and returns the sum of the
 * number of yes responses from each group.
 * @param {Array<String>} text - A batch of customs declarations forms
 * @returns {number} the sum of all yes responses from each group.
 */
export function getAllYesResponses(text) {
  let sum = 0
  const form = createCustomsFormObject(text)
  for (const elem in form) {
    sum += Object.keys(form[elem]).length - 1
  }

  return sum
}

/**
 * Takes in a batch of customs declaration forms, and returns the sum of the
 * number of questions all respondents in a group answered yes to.
 * @param {Array<String>} text - A batch of customs declarations forms
 * @returns {number} the sum of all yes responses from each group.
 */
export function getGroupYesResponses(text) {
  let sum = 0
  const form = createCustomsFormObject(text)
  for (const elem in form) {
    for (const e in form[elem]) {
      if (form[elem][e] === form[elem].count && e !== "count") {
        sum++
      }
    }
  }

  return sum
}

/**
 * Takes in a batch of customs declaration forms, and returns a dictionary-like
 * JSON object representing the answers on those forms.
 * @param {Array<String>} text - A batch of customs declarations forms
 * @returns {object} The batch of forms as an object. <br/>
 *  `count` represents the number of respondents in the group, all other fields
 *   are the number of respondents to that specific question in the group.
 */
export function createCustomsFormObject(text) {
  let form = new Object()
  let answered = { count: 0 }
  let index = 0
  text.forEach(e => {
    if (e == "") {
      form[index] = answered
      index++
      answered = { count: 0 }
      return
    }
    for (let i = 0; i < e.length; i++) {
      if (answered[e[i]]) {
        answered[e[i]]++
      } else {
        answered[e[i]] = 1
      }
    }
    answered.count++
  })
  return form
}
