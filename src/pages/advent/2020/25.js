import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Maffs from "../../../functions/utils/Maffs"

/**
 * ---
 * title: "Advent of Code 2020, Day Twenty-Five"
 * date: "2020-12-25"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    /*const text = [
      5764801,
      17807724,
      ""
    ]*/
    console.time("I wonder")
    const text = [
      335121,
      363891,
      ""
    ]
    const cardKey = +text[0]
    const doorKey = +text[1]
    let subject = 7
    const mod = 20201227

    // Calculate Card Loop
    let i = 0
    let val = 1
    while (true) {
      i++
      val *= subject 
      val %= mod 
      if (val === cardKey) {
        break
      }
    }
    const cardLoop = i

    // Calculate Door Loop
    i = 0
    val = 1
    while (true) {
      i++
      val *= subject 
      val %= mod 
      if (val === doorKey) {
        break
      }
    }
    const doorLoop = i

    console.log(cardLoop, doorLoop)

    // Calculate Encryption Key w/ Card Loop
    let encryptionKey = 1
    for (i=0; i < cardLoop; i++) {
      encryptionKey = Maffs.multiply(encryptionKey, doorKey.toString())
      encryptionKey = Maffs.modulo(encryptionKey, mod.toString()) 
    }
    console.log(encryptionKey)

    // Calculate Encryption Key w/ Door Loop
    encryptionKey = 1
    for (i=0; i < doorLoop; i++) {
      encryptionKey = Maffs.multiply(encryptionKey, cardKey.toString())
      encryptionKey = Maffs.modulo(encryptionKey, mod.toString()) 
    }
    console.log(encryptionKey)
    console.timeEnd("I wonder")
    
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
      <SEO title="Advent of Code 2020, Day Twenty-Five" />
      <Header headerText="Advent of Code 2020, Day Twenty-Five" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/25.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
