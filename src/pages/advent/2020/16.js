import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Sixteen"
 * date: "2020-12-16"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    let rules = []
    let values = []
    let nearbyTickets = []
    let errors = []
    let index = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "") {
        index = i + 1
        break
      }
      let breaks = text[i].split(" ")
      values.push(breaks[1].split("-"))
      values.push(breaks[3].split("-"))
    }
    for (let i = 0; i < values.length; i++) {
      let a = +values[i][0]
      let b = +values[i][1]
      console.log("Adding", a, "to", b)
      while (a <= b) {
        if (!rules.includes(a)) {
          rules.push(a)
        }
        a++
      }
    }
    console.log(rules)
    for (let i = index; i < text.length; i++) {
      if (i === index) {
        i += 4
      }
      nearbyTickets.push(text[i].split(","))
    }

    for (let i = 0; i < nearbyTickets.length; i++) {
      let e = nearbyTickets[i]
      for (let j = 0; j < e.length; j++) {
        if (!rules.includes(+e[j])) {
          errors.push(+e[j])
        }
      }
    }
    console.log(errors)
    let ans = errors.reduce((a, b) => {
      return a + b
    })
    setPart1(ans)
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content
    /*const text =
      "class: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19\n\nyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9\n"*/
    const groups = text.trim().split(/\n{2,}/)
    const rulesText = groups[0].split(/\n/)
    const tickets = [groups[1].split(/\n/)[1].split(/,/).map(Number)]
    const ticketsText = groups[2].split(/\n/)
    ticketsText.shift()

    // Build list of tickets
    for (let i=0; i<ticketsText.length; i++) {
      tickets.push(ticketsText[i].split(/,/).map(Number))
    }
    const myTicket = tickets[0]
    
    // Build list of rules
    let rules = {}
    for (let i=0; i<rulesText.length; i++) {
      const rule = rulesText[i]
      let [name, ranges] = rule.split(/: /)
      ranges = ranges.split(/ or /)
      rules[name] = rules[name] || []
      rules[name].push(ranges[0].split(/-/))
      rules[name].push(ranges[1].split(/-/))
    }

    const allFieldNames = Object.keys(rules)
    console.log(allFieldNames)
    let candidates = Array.from({ length: tickets[0].length }, () => [
      ...allFieldNames,
    ])

    tickets.forEach(values =>
      values.forEach((v, ind) => {
        candidates[ind] = candidates[ind].filter(name =>
          rules[name].some(([low, high]) => v >= low && v <= high)
        )
      })
    )

    do {
      const found = candidates
        .filter(options => options.length === 1)
        .map(options => options[0])
      candidates = candidates.map(options =>
        options.length === 1
          ? options
          : options.filter(name => !found.includes(name))
      )
      if (found.length === allFieldNames.length) break
    } while (true)

    const result = candidates.reduce(
      (acc, [name], ind) =>
        name.startsWith("departure") ? acc * myTicket[ind] : acc,
      1
    )
    setPart2(result)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Sixteen" />
      <Header headerText="Advent of Code 2020, Day Sixteen" />

      <p>Lets Go</p>

      <button type="button" onClick={solvePartOne}>
        Do Part One
      </button>
      <p>Answer is: {part1}</p>

      <button disabled type="button" onClick={solvePartTwo}>
        Temporarily Broken
      </button>
      <p>Answer is: {part2}</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/16.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
