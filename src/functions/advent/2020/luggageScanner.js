import * as _ from "lodash"

/**
 * Takes an aviation regulations luggage rules list describing the rules
 * about bags and their contents, and a colour to search for, and returns the
 * number of bags that contain that colour bag, or contain a bag that
 * contains that colour bag and so on.
 * @param {Array<String>} text - the list of aviation rules about luggage
 * @param {string} colour - the colour of the bag to search for
 * @returns {number} - the number of bags that can eventually contain that bag.
 */
export function countContainsColour(text, colour) {
  const bags = createBagsObject(text)
  return getAncestors(getParents([colour], bags), bags).length
}

/**
 * Takes an aviation regulations luggage rules list describing the rules
 * about bags and their contents, and a colour to search for, and returns the
 * number of bags that are contained in that colour bag. **Note: This calculates
 * the number of bags inside the bags, inside the colour and so on. This is not
 * just a surface-level calculator.**
 * 
 * @param {Array<String>} text - the list of aviation rules about luggage
 * @param {string} colour - the colour of the bag to search for
 * @returns {number} - the number of bags that are contained in that bag.
 */
export function countInsideColour(text, colour) {
  const bags = createBagsObject(text)
  return countBags(colour, bags) - 1
}

/**
 * Takes an aviation regulations luggage rules list and returns a bags object
 * describing the rules for each colour of bag in JSON.
 * @param {Array<String>} text - The rules list.
 * @returns {object} a bags JSON object.
 */
function createBagsObject(text) {
  let bags = {}

  for (let i = 0; i < text.length; i++) {
    const first = text[i].split(" ")
    let contains = false,
      counting = false,
      name = "",
      containing = "",
      count = 0

    for (let j = 0; j < first.length; j++) {
      if ( (first[j] === "bag" || first[j] === "bags") && contains === false) {
        // Do nothing
      } else if (first[j] === "contain") {
        bags[name] = {}
        contains = true
      } else if (contains === false) {
        name += first[j]
      } else {
        if (first[j] === "bag." || first[j] === "bags.") {
          bags[name][containing] = count
          break
        } else if (first[j] === "bag," || first[j] === "bags,") {
          bags[name][containing] = count
          containing = ""
          count = 0
          counting = false
        } else if (counting === true) {
          containing += first[j]
        } else if (first[j] === "no") {
          break
        } else {
          count = first[j]
          counting = true
        }
      }
    }
  }
  return bags
}

/**
 * Takes some list of bags, and a bags object, and returns all of those bags
 * parents, grandparents, and so on. 
 * @param {Array<String>} list - A list of bags to find the ancestors of. 
 * @param {object} bags - A bags object. 
 * @returns the ancestors of all of the bags in the provided list. 
 */
function getAncestors(list, bags) {
  let parents = getParents(list, bags)
  if (!_.isEqual(parents, [])) {
    parents = getAncestors(parents, bags)
  }
  return _.concat(list, _.difference(parents, list))
}

/**
 * Takes some list of bags, and a bags object, and returns all of those bags
 * parents. **Note: This only returns the immediate parents of the bags, if you
 * want to find all of the Ancestors (parents, grandparents, etc.), use 
 * `getAncestors()` instead**. 
 * @param {Array<String>} list - A list of bags to find the parents of. 
 * @param {object} bags - A bags object. 
 * @returns the immediate parents of all of the bags in the provided list. 
 */
function getParents(list, bags) {
  let parents = []

  for (let i = 0; i < list.length; i++) {
    for (const elem in bags) {
      if (list[i] in bags[elem]) {
        if (!parents.includes(elem)) {
          parents.push(elem)
        }
      }
    }
  }

  return parents
}

/**
 * Takes the colour of a bag, and a bags object, and counts the number of bags 
 * inside that bag colour, plus the original bag itself. That is, if the bag 
 * contains no other bags, the count will be `1`. 
 * @param {string} bag - the bag to count inside of.
 * @param {object} bags - a bags object
 */
function countBags(bag, bags) {
  let count = 1
  for (const elem in bags[bag]) {
    count += countBags(elem, bags) * +bags[bag][elem]
  }
  return count
}
