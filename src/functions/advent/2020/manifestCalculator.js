/**
 * Takes a flight manifest of boarding passes, and returns the highest seat ID
 * on the manifest.
 * @param {Array<String>} text - the flight manifest of boarding passes.
 * @returns {number} the highest seat ID on the manifest.
 */
export function getHighestSeatID(text) {
  let high = 0
  text.forEach(e => {
    const seatID = getSeatID(e)
    if (seatID > high) {
      high = seatID
    }
  })
  return high
}

/**
 * Takes a flight manifest of boarding passes, and returns the first seat ID 
 * unexpectedly missing from the manifest. 
 * @param {Array<String>} text - the flight manifest of boarding passes.
 * @returns {number} the first missing seat ID on the manifest.
 */
export function getEmptySeatID(text) {
  let seats = []
  for (let i = 0; i <= 0b1111111111; i++) {
    seats.push(i)
  }

  text.forEach(e => {
    const seatID = getSeatID(e)
    seats.splice(seats.indexOf(seatID), 1)
  })

  for (let i = 1; i < seats.length; i++) {
    if (seats[i] !== seats[i - 1] + 1) {
      return seats[i]
    }
  }
}

/**
 * Takes a seat value from a boarding pass, that represents the seat number
 * using binary space partitioning, and returns that seat number in decimal.
 * @param {string} seat - A seat number represented by binary space partitioning.
 * @returns {number} the seat number
 */
export function getSeatID(seat) {
  seat = seat.replace(/[FL]/g, 0).replace(/[BR]/g, 1)
  return parseInt(seat, 2)
}
