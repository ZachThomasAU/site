import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as PasswordValidator from "../../../functions/advent/2020/passwordValidator"
import { InlineMath } from "react-katex"

/**
 * ---
 * title: "Advent of Code 2020, Day Two"
 * date: "2020-12-02"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(0)
  const [part2, setPart2] = useState(0)
  const [num1, setNum1] = useState("1")
  const [num2, setNum2] = useState("1")
  const [character, setCharacter] = useState("a")
  const [password, setPassword] = useState("password1")
  const [rule, setRule] = useState("HighLow")
  const [isValid, setIsValid] = useState(null)

  const handleInputChange = e => {
    if (e.target.name === "num1") {
      setNum1(e.target.value)
    } else if (e.target.name === "num2") {
      setNum2(e.target.value)
    } else if (e.target.name === "character") {
      setCharacter(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    } else {
      setRule(e.target.value)
    }
  }

  const validateData = e => {
    if (e.target.name === "num1" && e.target.value < 1) {
      setNum1(1)
    } else if (e.target.name === "num2" && e.target.value < 1) {
      setNum2(1)
    } else if (
      e.target.name === "character" &&
      !e.target.value.match(/^[A-Za-z]+$/)
    ) {
      setCharacter("a")
    }
  }

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(PasswordValidator.ruleHighLow(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(PasswordValidator.ruleXorPosition(text))
  }

  const validatePassword = () => {
    const text = [num1 + "-" + num2 + " " + character + ": " + password]
    let valid
    if (rule === "HighLow") {
      valid = PasswordValidator.ruleHighLow(text)
    } else {
      valid = PasswordValidator.ruleXorPosition(text)
    }
    if (valid === 1) {
      setIsValid("Valid")
    } else if (valid === 0) {
      setIsValid("Not Valid")
    } else {
      setIsValid("Error!")
    }
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Two" />
      <Header headerText="Advent of Code 2020, Day Two" />

      <p>
        Alright, so I'm being frugal, and decide to avoid catching an uber to
        the airport. Apparently the best way to get from my place to the airport
        is via toboggan, so naturally renting a toboggan is probably worth the
        fee, instead of hitting up my mate for a lift to the airport.
      </p>

      <p>
        Less frugally I decide to rent this toboggan three days before my flight
        takes off (or maybe I'm just putting in a reservation for a toboggan?).
        In classic December-mayhem fashion the{" "}
        <i>North Pole Toboggan Rental Shop</i> has had some database corruption
        problem.
      </p>

      <p>
        Now this clerk serving me at the toboggan rental shop is probably an
        underpaid casual, hasn't been adequately trained, and just wants to get
        the job done without much care for the company itself. Therefore, they
        decide to do the entirely responsible thing of handing over, to me,{" "}
        <a href="2.txt" style={{ textShadow: "none" }}>
          their entire password database
        </a>
        ; containing not only every employee's (and by the looks of things, past
        employee's) passwords, but also the corporate password policy from the
        time the password was set. I definitely won't abuse this later.
      </p>

      <p>
        A password policy contains two numeric values, and one alphabetic
        character. At least for now, it appears that the alphabetic character is
        searched for in the password, and the numeric values are used to create
        some criteria the results of that search must conform to.
      </p>

      <h2>Part One</h2>
      <p>
        The clerk needs me to tell them how many of the passwords are still
        possibly valid passwords. Why they want this instead of how many
        passwords I can determine for certain are invalid is unclear.
      </p>
      <p>
        They inform me the password policy demands a specific character must
        appear at least <InlineMath math="x" /> amount of times (the first
        numeric), and must appear no more than <InlineMath math="y" /> amount of
        times (the second numeric).
      </p>
      <p>
        This was a bit deceptive at first, and so took me a little bit longer
        than yesterday, but ultimately was still pretty trivial to solve. You
        can reveal the answer given the database above by clicking the button.
      </p>
      <button type="button" onClick={solvePartOne}>
        Reveal Answer to Part One
      </button>
      <p>Answer is: {part1}</p>

      <h2>Part Two</h2>
      <p>
        Turns out this doofus just told me the corporate password policy from
        his last job - at the sled rental place down the street. Why they can
        recall the password policy from their previous job is unclear, perhaps
        they had a similar incident there, and also gave some stranger a bunch
        of confidential security information. Maybe that's why they needed to
        find a new job. I assume cashiering for vehicle rental shops is not so
        competitive they were poached. Why else would they need to find another
        job in an almost identical entry level position for a firm on the same
        street?
      </p>
      <p>
        So anyway, the actual policy provides two positions in the password (the
        numeric values), and demands a specific character must appear in one of
        those positions, but not both. This is actually easier to solve for, and
        you can reveal the answer for the provided password database by clicking
        the button.
      </p>
      <button type="button" onClick={solvePartTwo}>
        Reveal Answer to Part Two
      </button>
      <p>Answer is: {part2}</p>

      <h2>Fun extra challenge</h2>
      <p>
        I'm anticipating this password validator, or some variant of it, may
        need to be reused or iterated upon in future challenges. To catalogue
        its development over time I'm going to leave a record of the validators
        functions from day 2. You can give this validator two numeric values,
        one alphabetic character, a password, and a rule to apply, and it will
        determine if the password is valid or not.
      </p>
      <form>
        <label>
          Numeric Value 1:
          <input
            type="number"
            min="1"
            name="num1"
            value={num1}
            onChange={handleInputChange}
            onBlur={validateData}
          />
        </label>
        <label style={{ paddingLeft: 5 }}>
          Numeric Value 2:
          <input
            type="number"
            min="1"
            name="num2"
            value={num2}
            onChange={handleInputChange}
            onBlur={validateData}
          />
        </label>
        <br />
        <label>
          Alphabetic Character:
          <input
            name="character"
            maxLength="1"
            value={character}
            onChange={handleInputChange}
            onBlur={validateData}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Policy:
          <select name="rule" value={rule} onBlur={handleInputChange}>
            <option value="HighLow">Sled Rental Shop's Corporate Policy</option>
            <option value="XOR">Official Toboggan Corporate Policy</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={validatePassword}>
          Validate
        </button>
      </form>
      <p>Password is: {isValid}</p>
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
