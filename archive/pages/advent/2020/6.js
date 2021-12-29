import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Scanner from "../../../functions/advent/2020/customsScanner"

/**
 * ---
 * title: "Advent of Code 2020, Day Six"
 * date: "2020-12-06"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(null)
  const [part2, setPart2] = useState(null)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(Scanner.getAllYesResponses(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(Scanner.getGroupYesResponses(text))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Six" />
      <Header headerText="Advent of Code 2020, Day Six" />

      <p>
        Prepared at any moment for a catastrophic disaster to occur mid flight,
        I am relived to find myself in no imminent danger for at least the time
        being. Lets not jinx the next flight though.
      </p>

      <p>
        My, presumably elfish-only language speaker, co-passenger next to me
        however does have an issue. They're struggling with the language barrier
        and have asked me for some help filling out their customs declaration.
        After offering them some support, basically every other passenger on the
        flight clamours over to ask me for help as well.
      </p>

      <p>
        The way it works is that each group of travellers fills out a customs
        form, and they need to answer 26 questions (numbered <i>a</i> through to{" "}
        <i>z</i>) on behalf of the group as a whole. I've{" "}
        <a href="6.txt">batched all of the groups answers together</a>, and need
        to fill out a form for each group given their responses.
      </p>

      <h2>Part One</h2>
      <p>
        I quickly skim the customs forms and determine if anyone in the group
        answers "Yes" to a question, I mark that answer "Yes" on the customs
        form. Seems simple enough.
      </p>
      <p>
        For fun, I then sum the number of questions each group answers "Yes" to
        on their customs form. You can reveal that number by pressing the button
        below
      </p>
      <button type="button" onClick={solvePartOne}>
        Reveal Answer to Part One
      </button>
      <p>Answer is: {part1}</p>

      <h2>Part Two</h2>
      <p>
        Whoops! I guess I misread the instructions, I'm actually suppsoed to
        mark "Yes" on the customs form if <b>everyone</b> in the group answers
        "Yes" to a question.
      </p>
      <p>
        Easy enough fix, you can reveal the new sum of the "Yes" answers by
        pressing that button below.
      </p>
      <button type="button" onClick={solvePartTwo}>
        Reveal Answer to Part Two
      </button>
      <p>Answer is: {part2}</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/6.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
