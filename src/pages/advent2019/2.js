import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

import Intcode from "../../advent2019/intcode"

/**
 * ---
 * title: "Advent of Code 2019, Day One"
 * date: "2020-11-30"
 * ---
 */
export default function DayOne(data) {
  const [GAP, setGAP] = useState("Waiting for Input...")
  const [noun, setNoun] = useState(null)
  const [verb, setVerb] = useState(null)

  const partOne = () => {
    let text = data.data.file.childPlainText.content.split(",")
    text[1] = 12
    text[2] = 2
    setGAP(Intcode(text))
  }

  const partTwo = () => {
    let text = data.data.file.childPlainText.content.split(",")
    let noun = 0
    let verb = 0
    let answer = 0

    while (noun < 100) {
      while (verb < 100) {
        text = data.data.file.childPlainText.content.split(",")
        text[1] = noun
        text[2] = verb
        answer = Intcode(text)
        if (answer === 19690720) {
          setVerb(verb)
          setNoun(noun)
          console.log("Job's done. Verb:", verb, "Noun:", noun)
          return
        }
        verb++
      }
      verb = 0
      noun++
    }
    setVerb("Could not find a solution!")
    setNoun("Could not find a solution!")
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2019"></body>
      </Helmet>
      <SEO title="Advent of Code 2019, Day Two" />
      <Header headerText="Advent of Code 2019, Day Two" />
      <p>
        The computer on Santa's spaceship, after experiencing a data overflow (a
        1202 program alarm), runs a HCF machine code instruction (the fictional
        meme one, not the real one). Not good, not good! We now need to build a
        replacement <i>"Intcode"</i> computer so we can slingshot around the
        moon!
      </p>
      <h5>Intcode Computers</h5>
      <p>
        Intcode Computers are computers that execute Intcode Programs. An
        Intcode program is a comma seperated list of integers that carries some
        sort of{" "}
        <a href="https://en.wikipedia.org/wiki/Arithmetic_logic_unit">
          ALU-like
        </a>{" "}
        instruction. The first integer in the list (address 0) contains an
        "opcode", which indicates what instruction we should be doing. The next
        few integers after the opcode are the parameters for the instruction.
        The amount of parameters an instruction has depends on the opcode. After
        completing an instruction the intcode machine then jumps forward to the
        end of the instruction to find the next opcode.
      </p>
      <h5>New Opcodes</h5>
      <p>In this task we are introduced to opcodes 1, 2 and 99.</p>
      <b>Opcode 1 - </b> Is the "add" opcode of length 4. It takes two values,
      sums them, and stores the result in a specified position.
      <ul>
        <li>[0] - The opcode (value is always 1)</li>
        <li>[1] - The position of the first value to be summed</li>
        <li>[2] - The position of the second value to be summed</li>
        <li>[3] - The position where the result should be stored</li>
      </ul>
      <b>Opcode 2 - </b> Is the "multiply" opcode of length 4. It takes two
      values, multiplies them, and then stores the result in a specified
      position.
      <ul>
        <li>[0] - The opcode (value is always 2)</li>
        <li>[1] - The position of the first value to be multiplied</li>
        <li>[2] - The position of the second value to be multiplied</li>
        <li>[3] - The position where the result should be stored</li>
      </ul>
      <b>Opcode 99 - </b> Is the "halt" opcode of length 1. It is reached when
      the program is finished and should immediately halt
      <ul>
        <li>[0] - The opcode (value is always 99)</li>
      </ul>
      <h2>Part One</h2>
      <p>
        We're given an Intcode Program as our{" "}
        <a href="/advent2019/2.txt">puzzle input</a>. This Intcode Program is
        apparently the <i>"Gravity Assist Program"</i>, the program used to
        calculate the slingshot around the moon. To restore the Gravity Assist
        Program to the state it had just before the computer halted and caught
        fire, we need to change address 1 to "12" and address 2 to "2". Now we
        run the program again and pray we get a response before the machine
        explodes.
      </p>
      <button onClick={partOne}>
        Click this button to run the Intcode Machine with the updated values
      </button>{" "}
      <br />
      Output is: {GAP}
      <h2>Part Two</h2>
      <p>
        We now learn the Gravity Assist Program's addresses 1 and 2 are the
        inputs for the program (called the "noun" and "verb", respectively).
        This program takes any input between 0 and 99 (inclusive). We need to
        find what noun and verb produce the output <b>19690720</b>. Some quick
        math tells us there are 10,000 possible inputs, so it sounds like brute
        force is a pretty expedient way to go about solving this.
      </p>
      <button onClick={partTwo}>
        Click this button to brute force the answer!
      </button>{" "}
      <br />
      Noun is: {noun}, Verb is: {verb}
      <p>
        The value we need to calculate the slingshot is 100 * the noun + the
        verb. In this case the appropriate answer is {100 * noun + verb}
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent2019/inputs/2.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
