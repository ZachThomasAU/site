import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day Fourteen"
 * date: "2020-12-14"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
      "mem[8] = 11",
      "mem[7] = 101",
      "mem[8] = 0",
      "",
    ]*/
    let program = []
    text.forEach(e => {
      program.push(e.split(" "))
    })
    let memory = {}
    let mask = {}
    for (let i = 0; i < program.length; i++) {
      const e = program[i]
      let bin = new Array(36).fill(0)
      if (e[0] === "mask") {
        mask = {}
        for (let j = 0; j < e[2].length; j++) {
          if (e[2][j] !== "X") {
            mask[j] = +e[2][j]
          }
        }
      } else if (e[0].substr(0,3) == "mem") {
        const mem = +e[0].replace(/\D/g, "")
        const val = reverseString(parseInt(e[2]).toString(2))
        for (let j = 0; j < val.length; j++) {
          bin[35 - j] = +val[j]
        }
        for (const e in mask) {
          bin[e] = mask[e]
        }
        let num = parseInt(bin.join(""), 2)
        memory[mem] = num
      }
    }
    let ans = 0
    for (const e in memory) {
      ans += memory[e]
    }
    setPart1(ans)
  }

  function reverseString(str) {
    if (str === "") {
      return ""
    } else {
      return reverseString(str.substr(1)) + str.charAt(0)
    }
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "mask = 000000000000000000000000000000X1001X",
      "mem[42] = 100",
      "mask = 00000000000000000000000000000000X0XX",
      "mem[26] = 1",
      "",
    ]*/
    let program = []
    text.forEach(e => {
      program.push(e.split(" "))
    })
    let memory = {}
    let mask = {}
    for (let i = 0; i < program.length; i++) {
      const e = program[i]
      let bin = new Array(36).fill(0)
      if (e[0] === "mask") {
        mask = {}
        for (let j = 0; j < e[2].length; j++) {
          if (e[2][j] !== "X") {
            mask[j] = +e[2][j]
          } else {
            mask[j] = e[2][j]
          }
        }
      } else if (e[0].substr(0,3) == "mem") {
        const mem = reverseString(parseInt(e[0].replace(/\D/g, "")).toString(2))
        const val = parseInt(e[2])
        for (let j = 0; j < mem.length; j++) {
          bin[35 - j] = +mem[j]
        }
        for (const e in mask) {
          if (mask[e] !== 0) {
            bin[e] = mask[e]
          }
        }
        recursiveFunction(bin, val, memory)
      }
    }
    let ans = 0
    for (const e in memory) {
      ans += memory[e]
    }
    setPart2(ans)
  }

  function recursiveFunction(bin, val, memory) {
    let newBin = []
    bin.forEach(e => {
      newBin.push(e)
    })
    for (let i=0; i<newBin.length; i++) {
      if (newBin[i] === "X") {
        newBin[i] = 0
        recursiveFunction(newBin, val, memory)
        newBin[i] = 1
      }
    }
    let mem = parseInt(newBin.join(""), 2)
    memory[mem] = val
    return
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Fourteen" />
      <Header headerText="Advent of Code 2020, Day Fourteen" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/14.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
