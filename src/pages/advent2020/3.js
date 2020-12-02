import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Three"
 * date: "2020-12-03"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    // const text = data.data.file.childPlainText.content.split("\n")
    setPart1(part1 + 1)
  }

  const solvePartTwo = () => {
    // const text = data.data.file.childPlainText.content.split("\n")
    setPart2(part2 + 1)
  }

  return (
    <Layout>
      <SEO title="Advent of Code 2020, Day Three" />
      <Header headerText="Advent of Code 2020, Day Three" />

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
    file(relativePath: { eq: "pages/advent2020/inputs/3.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
