import * as _ from "lodash"
import { indexOf, isArray } from "lodash"

/**
 * Takes a list of navigation instructions, and a starting direction, and
 * returns the manhattan distance between a vehicles starting location and
 * ending location based on a cardinal navigator ruleset. That is, all actions
 * move the vehicle, with action "R" and "L" changing the direction the vehicle
 * is facing instead of the position of the vehicle.
 * @param {Array<String>} text - The list of navigation instructions.
 * @param {String} starting - The cardinal direction the vehicle is facing.
 * @returns {number} the Manhattan distance between the end location and the
 *  starting position.
 */
export function cardinalNavigator(text, starting) {
  let direction = typeof starting === "undefined" ? "E" : starting
  let ship = [0, 0]
  let cardinals = ["N", "E", "S", "W"]
  if (!cardinals.includes(direction)) {
    throw new Error("Starting MUST be a cardinal direction!")
  }

  for (let i = 0; i < text.length; i++) {
    let act = text[i][0]
    let val = +text[i].substr(1)
    if (act === "F") {
      act = direction
    }

    if (act === "N") {
      ship[1] += val
    } else if (act === "S") {
      ship[1] -= val
    } else if (act === "E") {
      ship[0] += val
    } else if (act === "W") {
      ship[0] -= val
    } else {
      if (act === "L" && val !== 180 && val !== 0) {
        val += 180
      }
      val %= 360
      let index = indexOf(cardinals, direction)
      if (val === 90) {
        direction = cardinals[(index + 1) % 4]
      } else if (val === 180) {
        direction = cardinals[(index + 2) % 4]
      } else if (val === 270) {
        direction = cardinals[(index + 3) % 4]
      }
    }
  }

  return Math.abs(ship[0]) + Math.abs(ship[1])
}

/**
 * Takes a list of navigation instructions, and returns the manhattan distance
 * between a vehicles starting location and ending location based on a waypoint
 * navigator ruleset. That is, all actions other than action "F" move a
 * waypoint marker, and the action "F" moves the vehicle in the direction of
 * the waypoint.
 * @param {Array<String>} text - The list of navigation instructions.
 * @param {Array<number>} starting - The starting position of the waypoint
 * @returns {number} the Manhattan distance between the end location and the
 *  starting position.
 */
export function waypointNavigator(text, starting) {
  let waypoint = typeof starting === "undefined" ? [0, 0] : starting
  let ship = [0, 0]
  if (!isArray(waypoint) || !(waypoint.length === 2)) {
    throw new Error("Starting MUST be a cartesian coordinate in an array!")
  }

  for (let i = 0; i < text.length; i++) {
    const act = text[i][0]
    let val = +text[i].substr(1)
    const x = waypoint[0]
    const y = waypoint[1]

    if (act === "F") {
      ship[0] += x * val
      ship[1] += y * val
    } else if (act === "N") {
      waypoint[1] += val
    } else if (act === "S") {
      waypoint[1] -= val
    } else if (act === "E") {
      waypoint[0] += val
    } else if (act === "W") {
      waypoint[0] -= val
    } else {
      if (act === "L" && val !== 180 && val !== 0) {
        val += 180
      }
      val %= 360
      if (val === 90) {
        waypoint = [y, -x]
      } else if (val === 180) {
        waypoint = [-x, -y]
      } else if (val === 270) {
        waypoint = [-y, x]
      }
    }
  }
  return Math.abs(ship[0]) + Math.abs(ship[1])
}

/**
 *
 * @param {*} text
 */
export function partOne(text, target) {
  let fill = "."
  if (target === ".") {
    fill = "_"
  }

  let plan = []
  text.forEach(e => {
    plan.push(e)
  })

  while (true) {
    let newPlan = []
    plan.forEach(e => {
      newPlan.push(e)
    })

    for (let j = 0; j < newPlan.length; j++) {
      let e = newPlan[j]
      for (let i = 0; i < e.length; i++) {
        let left = e[i - 1]
        let right = e[i + 1]
        let front = newPlan[j - 1]
        if (front === undefined) {
          front = new Array(e.length).fill(fill)
        }
        let back = newPlan[j + 1]
        if (back === undefined) {
          back = new Array(e.length).fill(fill)
        }

        if (e[i] === "L") {
          if (
            left !== "#" &&
            right !== "#" &&
            front[i - 1] !== "#" &&
            front[i] !== "#" &&
            front[i + 1] !== "#" &&
            back[i - 1] !== "#" &&
            back[i] !== "#" &&
            back[i + 1] !== "#"
          ) {
            plan[j] = plan[j].substr(0, i) + "#" + plan[j].substr(i + 1)
          }
        } else if (e[i] === "#") {
          let count = 0
          if (right === "#") {
            count++
          }
          if (left === "#") {
            count++
          }
          if (front[i - 1] === "#") {
            count++
          }
          if (front[i] === "#") {
            count++
          }
          if (front[i + 1] === "#") {
            count++
          }
          if (back[i - 1] === "#") {
            count++
          }
          if (back[i] === "#") {
            count++
          }
          if (back[i + 1] === "#") {
            count++
          }
          if (count >= 4) {
            plan[j] = plan[j].substr(0, i) + "L" + plan[j].substr(i + 1)
          }
        }
      }
    }
    if (_.isEqual(plan, newPlan)) {
      break
    }
  }

  let count = 0
  plan.forEach(e => {
    for (let i = 0; i < e.length; i++) {
      if (e[i] === "#") {
        count++
      }
    }
  })

  return count
}

/**
 *
 * @param {*} text
 */
export function scanAdjacent(plan, row, col, target) {
  let count = 0
  for (let i = row - 1; i < row + 2; i++) {
    for (let j = col - 1; j < col + 2; j++) {
      try {
        if (plan[i][j] === target) {
          count++
        }
      } catch (e) {
        // plan[i] is undefined, so target cannot be there. Therefore, do nothing.
      }
    }
  }
  if (plan[row][col] === target) {
    count--
  }
  return count
}

/**
 *
 */
function lookNW() {}
