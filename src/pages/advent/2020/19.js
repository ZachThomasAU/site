import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Nineteen"
 * date: "2020-12-19"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    //const text = data.data.file.childPlainText.content.split("\n")
    const text = [
      "0: 4 1 5",
      "1: 2 3 | 3 2",
      "2: 4 4 | 5 5",
      "3: 4 5 | 5 4",
      '4: "a"',
      '5: "b"',
      "",
      "ababbb",
      "bababa",
      "abbbab",
      "aaabbb",
      "aaaabbb",
      "",
    ]
    const rules = {}
    let index = 0
    for (let i = 0; i < text.length; i++) {
      const e = text[i]
      if (e === "") {
        index = i + 1
        break
      }
      const temp = e.split(/: /)
      const rule = temp[1].split(/ /)
      rules[temp[0]] = rule
    }

    let messages = []
    for (let i = index; i < text.length - 1; i++) {
      messages.push(text[i])
    }

    let valid = []
    let master = rules["0"]
    console.log(valid)
    setPart1(part1 + 1)
  }

  const solvePartTwo = () => {
    //const text = data.data.file.childPlainText.content.split("\n")
    setPart2(part2 + 1)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Nineteen" />
      <Header headerText="Advent of Code 2020, Day Nineteen" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/19.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
