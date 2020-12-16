import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { saveAs } from "file-saver"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

//import json from "./cheats/15-Van_Eck_Sequence.json"

/**
 * ---
 * title: "Advent of Code 2020, Day Fifteen"
 * date: "2020-12-15"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = [0,13,16,17,1,10,6]
    let spoken = []
    let ans = 0
    let last = 0
    for (let i=0; i<2020; i++) {
      if (i < text.length) {
        ans = text[i]
        spoken.unshift(ans)

      } else {
        let count = 0
        for (let i =0; i< spoken.length; i++) {
          if (spoken[i] === ans) {
            count++
            last = i
            if (count > 1) {
              break
            }
          }
        }
        if (count === 1) {
          ans = 0
          spoken.unshift(ans)
        } else {
          ans = last
          spoken.unshift(ans)
        }
      }
    }
    setPart1(ans)
  }

  const solvePartTwo = () => {
    const max = 2
    let sequence = {}//json
    let next = sequence["Next"]
    let len = sequence["i"] + 1

    console.time("Test")
    for (let i=len; i<max + len; i++) {
      if (next in sequence) {
        let temp = next
        next = i - sequence[next]
        sequence[temp] = i
      } else {
        sequence[next] = i
        next = 0
      }
      sequence["i"] = i
    }
    sequence["Next"] = next
    console.timeEnd("Test")

    const myJson = JSON.stringify(sequence)
    const blob = new Blob([myJson], {type: "application/json"})
    saveAs(blob, "15-Van_Eck_Sequence.json")

    console.log("Up to:", sequence["i"])
    setPart2(next)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Fifteen" />
      <Header headerText="Advent of Code 2020, Day Fifteen" />

      <p>Lets Go</p>

      <button type="button" onClick={solvePartOne}>
        Do Part One
      </button>
      <p>Answer is: {part1}</p>

      <button disabled type="button" onClick={solvePartTwo}>
        Part Two is computationally expensive ATM
      </button>
      <p>Answer is: {part2}</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/cheats/15-Van_Eck_Sequence.json" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
