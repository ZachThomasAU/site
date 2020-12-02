import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Two"
 * date: "2020-12-02"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc",
      "10-12 a: aaaaaaaaaaba",
    ]*/
    let valid = 0
    text.forEach(elem => {
      if (elem === "") {
        return
      }
      let min = elem.split("-")
      let max = min[1].split(" ")
      min = min[0]
      max = max[0]
      let search = elem.split(" ")
      search = search[1][0]
      let password = elem.split(":")[1]

      for (let i = 0; i < password.length; i++) {
        let count = 0
        for (let j = 0; j < password.length; j++) {
          if (password[i] === password[j]) {
            count++
          }
        }
        if (password[i] === search && count <= max && count >= min) {
          //console.log(password, "is valid")
          valid++
          break
        }
      }
    })

    setPart1(valid)
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc",
      "10-12 a: aaaaaaaaaaba",
    ]*/
    let valid = 0
    text.forEach(elem => {
      if (elem === "") {
        return
      }
      let min = elem.split("-")
      let max = min[1].split(" ")
      min = min[0]
      //console.log("Min is:", min)
      max = max[0]
      let search = elem.split(" ")
      search = search[1][0]
      let password = elem.split(":")[1]

      let count = 0
      if (password[min] === search) {
        count++
      }
      if (password[max] === search) {
        count++
      }
      if (count === 1) {
        valid++
      }
    })

    setPart2(valid)
  }

  return (
    <Layout>
      <SEO title="Advent of Code 2020, Day Two" />
      <Header headerText="Advent of Code 2020, Day Two" />

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
    file(relativePath: { eq: "pages/advent2020/inputs/2.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
