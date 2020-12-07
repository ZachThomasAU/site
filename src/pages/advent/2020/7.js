import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Scanner from "../../../functions/advent/2020/luggageScanner"

/**
 * ---
 * title: "Advent of Code 2020, Day Seven"
 * date: "2020-12-07"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")

    setPart1(Scanner.countContainsColour(text, ""))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
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

    let ans = 0
    for (const elem in bags.shinygoldbags) {
      ans += countBags(elem, bags) * +bags.shinygoldbags[elem]
    }
    setPart2(ans)
  }

  function countBags(bag, bags) {
    let count = 1
    for (const elem in bags[bag]) {
      count += countBags(elem, bags) * +bags[bag][elem]
    }
    return count
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Seven" />
      <Header headerText="Advent of Code 2020, Day Seven" />

      <p>Let's do the thing!</p>

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
    file(relativePath: { eq: "pages/advent/2020/inputs/7.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
