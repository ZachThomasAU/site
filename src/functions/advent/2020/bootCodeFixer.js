import * as _ from "lodash"

/**
 *
 * @param {*} text
 */
export function getAccumulatorOnRepeat(text) {
  const boot = getBootCode(text)
  let accumulator = 0
  let haveRun = []

  for (let i = 0; i < boot.length; i++) {
    if (haveRun.includes(i)) {
      break
    }
    const op = boot[i][0]
    const arg = +boot[i][1]

    if (op === "nop") {
      haveRun.push(i)
    } else if (op === "acc") {
      haveRun.push(i)
      accumulator += arg
    } else {
      haveRun.push(i)
      i += arg - 1
    }
  }
  return accumulator
}

/**
 *
 * @param {*} text
 */
export function fixCorruptedBootcode(text) {
  const boot = getBootCode(text)
  return recursionFunction(boot, [])
}

/**
 *
 * @param {*} boot
 * @param {*} list
 */
function recursionFunction(boot, list) {
  let newBoot = boot
  let accumulator = 0
  let haveRun = []
  let terminates = true

  // Update the boot code
  if (!_.isEqual(list, [])) {
    let last
    while (true) {
      last = list.pop()
      if (boot[last][0] === "nop" && boot[last][1] !== 1) {
        newBoot[last][0] = "jmp"
        break
      } else if (boot[last][0] === "jmp" && boot[last][1] !== 1) {
        newBoot[last][0] = "nop"
        break
      }
    }
  } else {
    list = haveRun
  }

  // Do the thing
  for (let i = 0; i < newBoot.length; i++) {
    if (haveRun.includes(i)) {
      terminates = false
      break
    }
    const op = newBoot[i][0]
    const arg = +newBoot[i][1]

    if (op === "nop") {
      haveRun.push(i)
    } else if (op === "acc") {
      haveRun.push(i)
      accumulator += arg
    } else {
      haveRun.push(i)
      i += arg - 1
    }
  }

  if (terminates === false) {
    accumulator = recursionFunction(boot, list)
  }
  return accumulator
}

/**
 *
 * @param {*} text
 */
function getBootCode(text) {
  let boot = []
  for (let i = 0; i < text.length; i++) {
    boot.push(text[i].split(" "))
  }
  return boot
}
