import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as _ from "lodash"
import * as Scanner from "../../../functions/advent/2020/gridCoords"

/**
 * ---
 * title: "Advent of Code 2020, Day Eleven"
 * date: "2020-12-11"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(Scanner.partOne(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
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
          if (e[i] === "L") {
            let count = 0
            //Left
            let dist = i - 0
            for (let k = 1; k <= dist; k++) {
              if (e[i - k] === "#") {
                count++
                break
              } else if (e[i - k] === "L") {
                break
              }
            }

            //right
            dist = e.length - i
            for (let k = 1; k <= dist; k++) {
              if (e[i + k] === "#") {
                count++
                break
              } else if (e[i + k] === "L") {
                break
              }
            }

            //front-left
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i - k] === "#") {
                  count++
                  break
                } else if (front[i - k] === "L") {
                  break
                }
              }
            }

            //front
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i] === "#") {
                  count++
                  break
                } else if (front[i] === "L") {
                  break
                }
              }
            }

            //front-right
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i + k] === "#") {
                  count++
                  break
                } else if (front[i + k] === "L") {
                  break
                }
              }
            }

            //back-left
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i - k] === "#") {
                  count++
                  break
                } else if (back[i - k] === "L") {
                  break
                }
              }
            }

            //back
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i] === "#") {
                  count++
                  break
                } else if (back[i] === "L") {
                  break
                }
              }
            }

            //back-right
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i + k] === "#") {
                  count++
                  break
                } else if (back[i + k] === "L") {
                  break
                }
              }
            }

            if (count === 0) {
              plan[j] = plan[j].substr(0, i) + "#" + plan[j].substr(i + 1)
            }
          } else if (e[i] === "#") {
            let count = 0
            //Left
            let dist = i - 0
            for (let k = 1; k <= dist; k++) {
              if (e[i - k] === "#") {
                count++
                break
              } else if (e[i - k] === "L") {
                break
              }
            }

            //right
            dist = e.length - i
            for (let k = 1; k <= dist; k++) {
              if (e[i + k] === "#") {
                count++
                break
              } else if (e[i + k] === "L") {
                break
              }
            }

            //front-left
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i - k] === "#") {
                  count++
                  break
                } else if (front[i - k] === "L") {
                  break
                }
              }
            }

            //front
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i] === "#") {
                  count++
                  break
                } else if (front[i] === "L") {
                  break
                }
              }
            }

            //front-right
            dist = j - 0
            for (let k = 1; k <= dist; k++) {
              let front = newPlan[j - k]
              if (front !== undefined) {
                if (front[i + k] === "#") {
                  count++
                  break
                } else if (front[i + k] === "L") {
                  break
                }
              }
            }

            //back-left
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i - k] === "#") {
                  count++
                  break
                } else if (back[i - k] === "L") {
                  break
                }
              }
            }

            //back
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i] === "#") {
                  count++
                  break
                } else if (back[i] === "L") {
                  break
                }
              }
            }

            //back-right
            dist = newPlan.length - j
            for (let k = 1; k <= dist; k++) {
              let back = newPlan[j + k]
              if (back !== undefined) {
                if (back[i + k] === "#") {
                  count++
                  break
                } else if (back[i + k] === "L") {
                  break
                }
              }
            }

            if (count >= 5) {
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
    setPart2(count)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Eleven" />
      <Header headerText="Advent of Code 2020, Day Eleven" />

      <p>Lets Go</p>

      <button type="button" onClick={solvePartOne}>
        Do Part One
      </button>
      <p>Answer is: {part1}</p>

      <button type="button" onClick={solvePartTwo}>
        Do Part Two
      </button>
      <p>Answer is: {part2}</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/11.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
