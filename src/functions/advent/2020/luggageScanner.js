import * as _ from "lodash"

/**
 * Takes an aviation regulations luggage rules list describing the rules
 * about bags and their contents, and a colour to search for, and returns the
 * number of bags that can contain that colour bag, or contain a bag that
 * contains that colour bag and so on.
 * @param {Array<String>} text - the list of aviation rules about luggage
 * @param {string} colour - the colour of the bag to search for
 * @returns {number} - the number of bags that can eventually contain that bag.
 */
export function countContainsColour(text, colour) {
  let bags = {}

  for (let i = 0; i < text.length; i++) {
    const first = text[i].split(" ")
    let name = ""
    let contains = false
    let count = 0
    let counting = false
    let containing = ""
    for (let j = 0; j < first.length; j++) {
      if (first[j] === "contain") {
        bags[name] = {}
        contains = true
      } else if (contains === false) {
        name += first[j]
      } else {
        if (first[j] === "bag." || first[j] === "bags.") {
          containing += "bags"
          bags[name][containing] = count
          break
        } else if (first[j] === "bag," || first[j] === "bags,") {
          containing += "bags"
          bags[name][containing] = count
          containing = ""
          count = 0
          counting = false
        } else if (counting === true) {
          containing += first[j]
        } else {
          if (first[j] === "no") {
            break
          }
          count = first[j]
          counting = true
        }
      }
    }
  }

  let shiny = []
  let oldshiny = []
  for (const elem in bags) {
    if ("shinygoldbags" in bags[elem]) {
      shiny.push(elem)
    }
  }

  shiny = checkrun(shiny, oldshiny, bags)
  console.log(shiny)
  return shiny.length
}

function checkrun(shiny, oldshiny, bags) {
  if (!_.isEqual(shiny, oldshiny)) {
    let temp = []
    for (let i = 0; i < shiny.length; i++) {
      if (!oldshiny.includes(shiny[i])) {
        temp.push(shiny[i])
        oldshiny.push(shiny[i])
      }
    }

    for (let i = 0; i < temp.length; i++) {
      for (const elem in bags) {
        if (temp[i] in bags[elem]) {
          if (!shiny.includes(elem)) {
            shiny.push(elem)
          }
        }
      }
    }

    if (_.isEqual(shiny, oldshiny)) {
      shiny = checkrun(shiny, oldshiny, bags)
    }
  }
  return shiny
}
