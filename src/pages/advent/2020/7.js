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
    setPart1(Scanner.countContainsColour(text, "shinygold"))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(Scanner.countInsideColour(text, "shinygold"))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Seven" />
      <Header headerText="Advent of Code 2020, Day Seven" />

      <p>
        Normally I fly with airlines that connect my flights for me, to avoid
        uncomfortable issues like luggage transfers. For some reason I have not
        done so this time, and so have to transfer my luggage to my connecting
        flight. This is further complicated by a truly archaic,{" "}
        <a href="https://www.youtube.com/watch?v=Trju1ACo4PA&feature=youtu.be&ab_channel=Rezmic">
          Spongebob-esque
        </a>{" "}
        aviation regulation mandating that certain colour bags <b>must</b>{" "}
        contain a specific number of other coloured bags inside them. Truly
        perverse.
      </p>

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
