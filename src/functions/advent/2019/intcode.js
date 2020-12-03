/**
 * Runs an Intcode Program on an Intcode Computer.
 *
 * @param {string} input - The full Intcode Program to be run.
 * @returns {number} the value at position 0 after the program halts.
 */
export default function Intcode(input) {
  let program = input
  if (typeof program == "string") {
    program = input.split(",")
  }
  let pos = 0

  while (true) {
    if (program[pos] === "1") {
      program = one(program, pos)
      pos += 4
    } else if (program[pos] === "2") {
      program = two(program, pos)
      pos += 4
    } else if (program[pos] === "99") {
      return program[0]
    }
    //console.log(program)
  }
}

/**
 * The "Add" opcode. Takes two values, sums them, and stores the result in a
 * specified position.
 * @param {Array<String>} program - The Intcode Program
 * @param {string} pos - The current position in the program
 * @returns {Array<String>} The updated program
 */
function one(program, pos) {
  const output = program[pos + 3]
  program[output] = +program[program[pos + 1]] + +program[program[pos + 2]]
  return program
}

/**
 * The "Multiply" opcode. Takes two values, multiplies them, and stores the
 * result in a specified position.
 * @param {Array<String>} program - The Intcode Program
 * @param {string} pos - The current position in the program
 * @returns {Array<String>} The updated program
 */
function two(program, pos) {
  const output = program[pos + 3]
  program[output] = +program[program[pos + 1]] * +program[program[pos + 2]]
  return program
}
