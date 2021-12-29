import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as _ from "lodash"

/**
 * ---
 * title: "Advent of Code 2020, Day Ten"
 * date: "2020-12-10"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    let adapters = []
    text.forEach(e => {
      adapters.push(+e)
    })
    adapters.push(_.max(adapters) + 3)
    adapters = _.sortBy(adapters)
    let one = []
    let two = []
    let three = []

    for (let i = 0; i < adapters.length; i++) {
      const diff = adapters[i + 1] - adapters[i]
      if (diff === 3) {
        three.push(i)
      } else if (diff === 2) {
        two.push(i)
      } else if (diff === 1) {
        one.push(i)
      }
    }

    setPart1(one.length * three.length)
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    let adapters = []
    text.forEach(e => {
      adapters.push(+e)
    })
    adapters.push(_.max(adapters) + 3)
    adapters = _.sortBy(adapters)

    let ans = new Array(adapters.length).fill(0)
    ans[0] = 1

    for (let i = 0; i < adapters.length - 1; i++) {
      for (let j = i + 1; j < i + 4; j++) {
        if (adapters[j] <= adapters[i] + 3) {
          ans[j] += ans[i]
        }
      }
    }
    setPart2(ans[ans.length - 1])
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Ten" />
      <Header headerText="Advent of Code 2020, Day Ten" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/10.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
