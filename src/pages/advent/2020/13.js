import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Maths from "../../../functions/utils/Math"

/**
 * ---
 * title: "Advent of Code 2020, Day Thirteen"
 * date: "2020-12-13"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    //const text = [939, "7,13,x,x,59,x,31,19"]
    console.log(text)
    const timestamp = +text[0]
    let temp = text[1].split(",")
    let buses = []
    let min = [timestamp * 2, 1]
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== "x") {
        buses.push(+temp[i])
      }
    }
    console.log(buses)
    for (let i = 0; i < buses.length; i++) {
      let e = buses[i]
      let time = e * Math.floor(timestamp / e) + e
      console.log("Bus", buses[i], "can be caught at", time)
      if (time - timestamp < min[0]) {
        min[0] = time - timestamp
        min[1] = e
      }
    }
    console.log(min)
    setPart1(min[0] * min[1])
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    //const text = [939, "1789,37,47,1889"]
    console.log(text[1])
    let temp = text[1].split(",")
    console.log(temp)
    let remainder = []
    let buses = []
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== "x") {
        buses.push(+temp[i])
        let r = (i === 0) ? 0 : +temp[i] - (i % +temp[i])
        remainder.push(r)
      }
    }
    setPart2(Maths.crt(remainder, buses))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Thirteen" />
      <Header headerText="Advent of Code 2020, Day Thirteen" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/13.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
