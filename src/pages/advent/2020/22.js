import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import {isEqual, clone} from "lodash"

/**
 * ---
 * title: "Advent of Code 2020, Day Twenty-Two"
 * date: "2020-12-22"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "Player 1:",
      "9",
      "2",
      "6",
      "3",
      "1",
      "",
      "Player 2:",
      "5",
      "8",
      "4",
      "7",
      "10",
      ""
    ]*/

    // Setup decks
    let cards = []
    let deck = []
    text.forEach(e => {
      if (e === "") {
        cards.push(deck)
        deck = []
      } else if (!isNaN(e)) {
        deck.push(+e)
      }
    })
    console.log(cards)

    // Play the game
    let i = 1
    while (cards[0].length > 0 && cards[1].length > 0) {
      const p1 = cards[0]
      const p2 = cards[1]
      console.log("-- Round", i, "--")
      console.log("Player 1's deck:", p1)
      console.log("Player 2's deck:", p2)
      console.log("Player 1 plays:", p1[0])
      console.log("Player 2 plays:", p2[0])
      if (p1[0] > p2[0]) {
        console.log("Player 1 wins the round!")
        p1.push(p1[0])
        p1.shift()
        p1.push(p2.shift())
      } else if (p2[0] > p1[0]) {
        console.log("Player 2 wins the round!")
        p2.push(p2[0])
        p2.shift()
        p2.push(p1.shift())
      }
      i++
    }

    // Compute the score
    const winner = (cards[0].length > 0) ? cards[0] : cards[1]
    const len = winner.length
    let score = 0
    winner.forEach((card, index) => {
      score += card * (len - index)
    })
    setPart1(score)
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    /*const text = [
      "Player 1:",
      "9",
      "2",
      "6",
      "3",
      "1",
      "",
      "Player 2:",
      "5",
      "8",
      "4",
      "7",
      "10",
      ""
    ]*/
    /*const text = [
      "Player 1:",
      "43",
      "19",
      "",
      "Player 2:",
      "2",
      "29",
      "14",
      ""
    ]*/

    // Setup decks
    let cards = []
    let deck = []
    text.forEach(e => {
      if (e === "") {
        cards.push(deck)
        deck = []
      } else if (!isNaN(e)) {
        deck.push(+e)
      }
    })
    console.log(cards)

    // Play the game
    let game = 1
    //let i = 1
    let history = []
    while (cards[0].length > 0 && cards[1].length > 0) {
      const p1 = cards[0]
      const p2 = cards[1]
      //console.log("-- Round", i, "(Game " + game + ")--")
      //console.log("Player 1's deck:", p1)
      //console.log("Player 2's deck:", p2)
      //console.log("Player 1 plays:", p1[0])
      //console.log("Player 2 plays:", p2[0])

      // Infinite Game Prevention Rule
      for (let k = 0; k < history.length; k++) {
        if (isEqual(history[k][0], p1) && isEqual(history[k][1], p2)) {
          //console.log("Infinite Game Prevention Rule Triggered")
          //console.log("History:", history[k][0], history[k][1])
          //console.log("Decks:", p1, p2)
          //console.log("Repeated on round", k+1)
          cards[1] = []
        }
      }
      history.push([clone(p1), clone(p2)])

      if (p1[0] < p1.length && p2[0] < p2.length) {
        //console.log("Playing a sub-game to determine the winner...")
        let bool = combat(p1.slice(1, p1[0]+1), p2.slice(1, p2[0]+1), game)
        if (bool) {
          //console.log("Player 1 wins round", i, "of game", game + "!")
          p1.push(p1[0])
          p1.shift()
          p1.push(p2.shift())
        } else {
          //console.log("Player 2 wins round", i, "of game", game + "!")
          p2.push(p2[0])
          p2.shift()
          p2.push(p1.shift())
        }
      } else if (p1[0] > p2[0]) {
        //console.log("Player 1 wins the round!")
        p1.push(p1[0])
        p1.shift()
        p1.push(p2.shift())
      } else if (p2[0] > p1[0]) {
        //console.log("Player 2 wins the round!")
        p2.push(p2[0])
        p2.shift()
        p2.push(p1.shift())
      }
      i++
    }

    // Compute the score
    const winner = (cards[0].length > 0) ? cards[0] : cards[1]
    console.log("Winner is: " + winner)
    const len = winner.length
    let score = 0
    winner.forEach((card, index) => {
      score += card * (len - index)
    })

    setPart2(score)
  }

  function combat(p1, p2, game) {
    game++
    //console.log("=== Game", game, "===")
    //let i = 1
    let history = []
    while (p1.length > 0 && p2.length > 0) {
      //console.log("-- Round", i, "(Game " + game + ")--")
      //console.log("Player 1's deck:", p1)
      //console.log("Player 2's deck:", p2)
      //console.log("Player 1 plays:", p1[0])
      //console.log("Player 2 plays:", p2[0])

      // Infinite Game Prevention Rule
      for (let k = 0; k < history.length; k++) {
        if (isEqual(history[k][0], p1) && isEqual(history[k][1], p2)) {
          //console.log("Infinite Game Prevention Rule Triggered")
          //console.log("History:", history[k][0], history[k][1])
          //console.log("Decks:", p1, p2)
          //console.log("Repeated on round", k+1)
          return true
        }
      }
      history.push([clone(p1), clone(p2)])
      
      // Play the game
      if (p1[0] < p1.length && p2[0] < p2.length) {
        //console.log("Playing a sub-game to determine the winner...")
        let bool = combat(p1.slice(1, p1[0]+1), p2.slice(1, p2[0]+1), game)
        if (bool) {
          //console.log("Player 1 wins round", i, "of game", game + "!")
          p1.push(p1[0])
          p1.shift()
          p1.push(p2.shift())
        } else {
          //console.log("Player 2 wins round", i, "of game", game + "!")
          p2.push(p2[0])
          p2.shift()
          p2.push(p1.shift())
        }
      } else if (p1[0] > p2[0]) {
        //console.log("Player 1 wins the round!")
        p1.push(p1[0])
        p1.shift()
        p1.push(p2.shift())
      } else if (p2[0] > p1[0]) {
        //console.log("Player 2 wins the round!")
        p2.push(p2[0])
        p2.shift()
        p2.push(p1.shift())
      }
      i++
    }
    return (p1.length > 0) ? true : false
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Twenty-Two" />
      <Header headerText="Advent of Code 2020, Day Twenty-Two" />

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
    file(relativePath: { eq: "pages/advent/2020/inputs/22.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
