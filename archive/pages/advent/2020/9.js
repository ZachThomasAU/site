import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Nine"
 * date: "2020-12-09"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      35,
      20,
      15,
      25,
      47,
      40,
      62,
      55,
      65,
      95,
      102,
      117,
      150,
      182,
      127,
      219,
      299,
      277,
      309,
      576,
    ]*/
    const preamble = 25
    let ans
    let past = []
    for (let i = 0; i < preamble; i++) {
      past.push(+text[i])
    }
    //console.log(past)
    for (let i = preamble; i < text.length; i++) {
      let found = false
      for (let j = 0; j < past.length; j++) {
        for (let k = 0; k < past.length; k++) {
          if (past[j] !== past[k]) {
            if (past[j] + past[k] === +text[i]) {
              found = true
            }
          }
        }
      }
      if (!found) {
        ans = text[i]
        break
      } else {
        past.shift()
        past.push(+text[i])
      }
    }
    setPart1(ans)
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    const invalid = 18272118
    const preamble = 25
    let ans
    let past = []
    for (let i = 0; i < preamble; i++) {
      past.push(+text[i])
    }

    for (let i = preamble; i < text.length; i++) {
      let set = []
      let sum = 0
      while (sum < invalid) {
        for (let j = i; j < text.length; j++) {
          set.push(+text[j])
          sum += +text[j]
          if (sum >= invalid) {
            break
          }
        }
        break
      }
      //console.log(sum)
      if (sum === invalid) {
        let min = invalid
        let max = 0
        for (let j = 0; j < set.length; j++) {
          if (set[j] < min) {
            min = set[j]
          }
          if (set[j] > max) {
            max = set[j]
          }
        }
        ans = min + max
        break
      }
    }
    setPart2(ans)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Nine" />
      <Header headerText="Advent of Code 2020, Day Nine" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/9.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
