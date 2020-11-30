/**
 * Takes the mass of a module and returns the amount of fuel required for the
 * module.
 * @param {number} mass - The mass of the module
 * @returns {number} The amount of fuel required for the module.
 */
export function calculateFuel(mass) {
  const fuel = Math.max(0, Math.floor(mass / 3) - 2)
  // console.log("Fuel is:", fuel)
  return fuel
}

/**
 * Takes the mass of a module and returns the amount of fuel required for the
 * module, accounting for the extra mass of the fuel.
 * @param {number} mass - The mass of the module
 * @returns {number} The amount of fuel required for the module.
 */
export function calculateFuel2(mass) {
  let fuel = calculateFuel(mass)
  let totalFuel = fuel

  while (fuel > 5) {
    fuel = calculateFuel(fuel)
    totalFuel += fuel
  }

  return totalFuel
}

/**
 * Takes some puzzle input with a list of masses of modules, and returns the
 * sum of their fuel requirements.
 * @param {string} input - The puzzle input as a string
 * @returns {number} The total fuel required for all the modules on the spacecraft
 */
export function sumFuel(input) {
  let sum = 0
  const text = input.split("\n")
  text.forEach(module => {
    sum += calculateFuel(module)
  })
  return sum
}

/**
 * Takes some puzzle input with a list of masses of modules, and returns the
 * sum of their fuel requirements.
 * @param {string} input - The puzzle input as a string
 * @returns {number} The total fuel required for all the modules on the spacecraft
 */
export function sumFuel2(input) {
  let sum = 0
  const text = input.split("\n")
  text.forEach(module => {
    sum += calculateFuel2(module)
  })
  return sum
}
