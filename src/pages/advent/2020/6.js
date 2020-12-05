import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Six"
 * date: "2020-12-06"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    // const text = data.data.file.childPlainText.content.split("\n")
    setPart1(doPartOne())
  }

  function doPartOne(text) {
    return part1 + 1
  }

  const solvePartTwo = () => {
    // const text = data.data.file.childPlainText.content.split("\n")
    setPart2(part2 + 1)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Six" />
      <Header headerText="Advent of Code 2020, Day Six" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/6.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
