/**
 * This calculator takes in an array representing some biome of a toboggan
 * slope, and some x and y values representing the angle you will be riding your
 * toboggan down the slope. The calculator then returns the number of trees you
 * can expect to bring you to a sudden arboreal stop along that slope.
 *
 * @param {Array<String>} text - An array representing the vertical shape of the
 *    biome.
 * @param {number} x - the gradient along the x-axis
 * @param {number} y - the gradient along the y-axis
 * @returns {number} the amount of trees you will encounter along the provided
 *    slope.
 */
export function slopeCalculator(text, x, y) {
  let j = 0
  let count = 0
  for (let i = 0; i < text.length; i += y) {
    if (j >= text[i].length) {
      j -= text[i].length
    }
    if (text[i][j] === "#") {
      count++
    }
    j += x
  }
  return count
}
