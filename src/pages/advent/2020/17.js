import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import {cloneDeep} from "lodash"

/**
 * ---
 * title: "Advent of Code 2020, Day Seventeen"
 * date: "2020-12-17"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    //const text = data.data.file.childPlainText.content.split("\n")
    const text = [
      ".#.",
      "..#",
      "###",
    ]

    /* eslint-disable */
    // This is bad, old code. It is generally not wise to modify these variables
    // inside an anonymous arrow function. DO NOT REUSE. 
    let pocket = doSetup(text)

    let ans = 0
    for (let i = 0; i<6; i++) {
      let newPocket = cloneDeep(pocket)
      ans = 0
      pocket.forEach((z, zi) => {
        z.forEach((y, yi) => {
          y.forEach((x, xi) => {
            const count = getActive(pocket,zi,yi,xi)
            if (x === "#" && count !== 2 && count !== 3) {
              //console.log("Changing # to . at Z =", zi - 6)
              newPocket[zi][yi][xi] = "."
            } else if (x === "#") {
              ans++
            } else if (x === "." && count === 3) {
              //console.log("Changing . to # at Z =", zi - 6)
              newPocket[zi][yi][xi] = "#"
              ans++
            }
          })
        })
      }) 
      pocket = newPocket
    }

    /* eslint-enable */

    setPart1(ans)
  }

  function getActive(pocket, z, y, x) {
    let count = 0
    for (let i=-1; i<2; i++) {
      for (let j=-1; j<2; j++) {
        for (let k=-1; k<2; k++) {
          if (typeof pocket[z+i] !== "undefined") {
            if (typeof pocket[z+i][y+j] !== "undefined") {
              if (pocket[z+i][y+j][x+k] === "#") {
                //console.log("Incrementing on:",z+i, y+j, x+k)
                count++
              }
            }
          }
        }
      }
    }

    if (pocket[z][y][x] === "#") {
      //console.log("Decrementing on:",z,y,x)
      count--
    }
    return count
  }

  function doSetup(text) {
    let mid = Math.ceil(text.length/2)-1
    let max = text.length
    let countH = 0
    let pocket = []
    for (let i=0; i<13; i++) {
      let plane = []
      for (let j=0; j<20; j++) {
        let row = []
        let countW = 0
        for (let k=0; k<20; k++) {
          if (k === 10-mid+countW && countW < max && i===6 && j===10-mid+countH && countH < max) {
            if (text[countH][countW] === "#") {
              //console.log("Pushing # to", i,j,k)
            }
            row.push(text[countH][countW])
            countW++
          } else {
            row.push(".")
          }
        }
        if (j === 10-mid+countH && countH < max && i===6) {
          countH++
        }
        plane.push(row)
      }
      pocket.push(plane)
    }
    //console.log("Setup is:", pocket)
    return pocket
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
      <SEO title="Advent of Code 2020, Day Seventeen" />
      <Header headerText="Advent of Code 2020, Day Seventeen" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/17.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
