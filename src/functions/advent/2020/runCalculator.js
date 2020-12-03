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
  const f = (prefix, text, history) => {
    if (found || history.length >= expenses) {
      return
    }
    for (let i = 0; i < text.length - 1; i++) {
      const sum = prefix + +text[i]
      const newHistory = history.concat([+text[i]])
      if (sum === +searchValue) {
        if (newHistory.length === +expenses) {
          answer = newHistory.reduce((a, b) => {
            return a * b
          })
          found = true
        }
      }
      result.push(sum)
      f(sum, text.slice(i + 1), newHistory)
    }
  }
  f(0, text, history)
  return answer
}
