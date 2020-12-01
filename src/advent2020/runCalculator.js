/**
 * Oi Rowan is really fucking stupid isn't he?
 * @param {*} text
 * @param {*} expenses
 * @param {*} searchValue
 */
export default function runCalculator(text, expenses, searchValue) {
  let result = []
  let history = []
  let answer = "Could not find value!"
  let found = false
  const f = function (prefix, chars, history) {
    if (found) {
      return
    }
    if (history.length >= expenses) {
      return
    }
    for (let i = 0; i < chars.length - 1; i++) {
      const sum = prefix + +chars[i]
      //console.log("Summing", prefix, "with", chars[i])
      const newHistory = history.concat([+chars[i]])
      if (sum === +searchValue) {
        // console.log("MATCH FOUND! EUREKA! History is:", newHistory)
        if (newHistory.length === +expenses) {
          answer = newHistory.reduce((a, b) => {
            return a * b
          })
          found = true
        }
      }
      result.push(sum)
      f(sum, chars.slice(i + 1), newHistory)
    }
  }
  f(0, text, history)
  return answer
}

function combine(prefix, chars) {}
