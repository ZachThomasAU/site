import React, { useState } from "react"
import { graphql } from "gatsby"
import { InlineMath } from "react-katex"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import RowanIsDumb from "../../../functions/advent/2020/runCalculator"

/**
 * ---
 * title: "Advent of Code 2020, Day One"
 * date: "2020-12-01"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(null)
  const [part2, setPart2] = useState(null)
  const [expenses, setExpenses] = useState(2)
  const [searchValue, setSearchValue] = useState(2020)
  const [answer, setAnswer] = useState(null)

  const handleInputChange = e => {
    if (e.target.name === "expenses") {
      setExpenses(e.target.value)
    } else {
      setSearchValue(e.target.value)
    }
  }

  const doPartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    let noun = 0
    let verb = 0

    while (noun < text.length - 1) {
      while (verb < text.length - 1) {
        if (+text[noun] + +text[verb] === 2020) {
          console.log("Match found! Noun:", text[noun], "Verb:", text[verb])
          setPart1(+text[noun] * +text[verb])
          return
        }
        verb++
      }
      verb = 0
      noun++
    }
  }

  const doPartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    let noun = 0
    let verb = 0
    let adj = 0

    while (noun < text.length - 1) {
      while (verb < text.length - 1) {
        while (adj < text.length - 1) {
          if (+text[adj] + +text[verb] + +text[noun] === 2020) {
            console.log(
              "Match found! Noun:",
              text[noun],
              "Verb:",
              text[verb],
              "Adj",
              text[adj]
            )
            setPart2(+text[noun] * +text[verb] * +text[adj])
            return
          }
          adj++
        }
        adj = 0
        verb++
      }
      verb = 0
      noun++
    }
  }

  const doTheThingForRowan = () => {
    setAnswer("Calculating...")
    setTimeout(() => {
      const text = data.data.file.childPlainText.content.split("\n")
      //const text = [1721, 979, 366, 299, 675, 1456]
      setAnswer(RowanIsDumb(text, expenses, searchValue))
    }, 1)
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day One" />
      <Header headerText="Advent of Code 2020, Day One" />
      <p>
        Very uncharacteristically, it turns out I've decided to go on a holiday
        for Christmas. Even more uncharacteristically instead of visiting some
        highly developed tourist hotspot, or some site of ancient Western
        Civilisation, I've decided to visit somewhere with a completely isolated
        (possibly autarkic) non-fiat currency pegged to the gold standard. How
        coins made out of gold are not transactable on a FOREX is unclear to me,
        (possibly some sort of trade embargo?), when supply seems elastic (given
        a coworker of mine has 2 such coins doing nothing in their pocket) but
        it remains the case.
      </p>
      <p>
        Much more characterstically, I've cocked up an expense report, and a
        coworker in accounting (e.g. finance) has asked for help with some data
        analysis component of their job to fix it. I'll do my job properly the
        first time one day.
      </p>
      <h2>Part One</h2>
      <p>
        <a style={{ textShadow: "none" }} href="/advent2020/1.txt">
          The expense report contains a list of expenses
        </a>
        , and they need me to find the product of the two expenses that sum to
        "2020". This is pretty trivial to do. You can reveal the answer given
        the above expense report by pressing the button below.
      </p>
      <button onClick={doPartOne}>Reveal Answer to Part One</button>
      <p>Answer is: {part1}</p>
      <h2>Part Two</h2>
      <p>
        In a near identical vein, they also need me to find the product of the
        three expenses that sum to "2020". This is almost exactly as trivial to
        do. You can, again, reveal the answer given the above expense report by
        pressing the button below.
      </p>
      <button onClick={doPartTwo}>Reveal Answer to Part Two</button>
      <p>Answer is: {part2}</p>

      <h2>Fun extra challenge</h2>
      <p>
        So naturally this was pretty easy, as expected for Day One (don't want
        to scare the beginners away on the first puzzle). As a challenge I
        decided to take it to the next level. Suppose you wanted to increase the
        number of expenses further, why not build a calculator that allows you
        to choose that input, and it will return the result (if any) no matter
        the number of expenses? Suppose further, you wanted to change the value
        to search for from 2020 to some other value? Enter the Expense Report
        Calculator! Once the Advent Calender event is over, I'll allow you to
        submit your own puzzle inputs as well.
      </p>
      <p>
        Note: this calculator is not very well optimised, and so is{" "}
        <InlineMath math="\Omega(2^n)" />. I do some trivial heuristics if you
        pick a small expenses value, or a value that is actually solvable, but
        otherwise this calculator may take a long time until I either decide to
        move it over to the server to do some fancy math magic, can be assed to
        optimise my JS spaghetti code, or just use someone elses much better
        written combinatorics JS dependency.
      </p>
      <form>
        <label>
          How many expenses should we look for?
          <input
            type="number"
            name="expenses"
            value={expenses}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          What value should we search for?
          <input
            type="number"
            name="searchValue"
            value={searchValue}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={doTheThingForRowan}>
          Calculate
        </button>
        <br />
        Answer is: {answer}
      </form>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/1.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
