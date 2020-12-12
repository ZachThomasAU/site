import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Scanner from "../../../functions/advent/2020/gridCoords"

/**
 * ---
 * title: "Advent of Code 2020, Day Twelve"
 * date: "2020-12-12"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(Scanner.cardinalNavigator(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    //const text = ["F10", "N3", "F7", "R90", "F11"]
    setPart2(Scanner.waypointNavigator(text, [10, 1]))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Twelve" />
      <Header headerText="Advent of Code 2020, Day Twelve" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/12.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
