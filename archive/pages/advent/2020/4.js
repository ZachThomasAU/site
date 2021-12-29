import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Scanner from "../../../functions/advent/2020/passportScanner"

/**
 * ---
 * title: "Advent of Code 2020, Day Four"
 * date: "2020-12-04"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(null)
  const [part2, setPart2] = useState(null)

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(Scanner.validateFields(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(Scanner.validateValues(text))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Four" />
      <Header headerText="Advent of Code 2020, Day Four" />

      <p>
        I knew it! I absolutely knew it! There's a massive line at airport
        security, and despite leaving two days before my plane takes off,
        there's <b>STILL</b> a risk I'm going to miss my flight!
      </p>

      <p>
        Also, in an eerily close-to-home turn of fortune, in this fictional
        world I still forget my passport at home! Only this time, instead of
        missing my trip and committing insurance fraud, I commit some even more
        ethically grey hacking. We're in the middle of a global pandemic, but I
        decide I'm more important than the biosecurity of the entire planet, and
        so I breach the security in the passport detectors to allow myself (and
        who knows how many others) illegitimate access to international travel.
      </p>

      <h5>Defining a Passport</h5>
      <p>
        This might come up again, so I figured I'd detail exactly what a
        passport object looks like. A passport contains the following
        information:
        <ol>
          <li>
            <b>Birth Year</b>
            <ul>
              <li>
                Identified with the code <code>byr</code>
              </li>
              <li>Must be exactly four digits long</li>
              <li>Must be at least 1920</li>
              <li>Must be at most 2002</li>
            </ul>
          </li>

          <li>
            <b>Issue Year</b>
            <ul>
              <li>
                Identified with the code <code>iyr</code>
              </li>
              <li>Must be exactly four digits long</li>
              <li>Must be at least 2010</li>
              <li>Must be at most 2020</li>
            </ul>
          </li>

          <li>
            <b>Expiration Year</b>
            <ul>
              <li>
                Identified with the code <code>eyr</code>
              </li>
              <li>Must be exactly four digits long</li>
              <li>Must be at least 2020</li>
              <li>Must be at most 2030</li>
            </ul>
          </li>

          <li>
            <b>Height</b>
            <ul>
              <li>
                Identified with the code <code>hgt</code>
              </li>
              <li>Must be a number followed by the letters "cm" or "in"</li>
              <li>
                If the height is in centimetres, must be between 150 and 193
              </li>
              <li>If the height is in inches, must be between 59 and 76</li>
            </ul>
          </li>

          <li>
            <b>Hair Colour</b>
            <ul>
              <li>
                Identified with the code <code>hcl</code>
              </li>
              <li>
                Must begin with a "#", followed by exactly a hexadecimal of
                exactly 6 characters in length (e.g. "#000" is invalid).
              </li>
            </ul>
          </li>

          <li>
            <b>Eye Colour</b>
            <ul>
              <li>
                Identified with the code <code>ecl</code>
              </li>
              <li>
                Must be exactly one of: "amb", "blu", "gry", "grn", "hzl", "oth"
              </li>
            </ul>
          </li>

          <li>
            <b>Passport ID</b>
            <ul>
              <li>
                Identified with the code <code>pid</code>
              </li>
              <li>Must be a number, exactly nine digits long.</li>
              <li>Includes leading 0's</li>
            </ul>
          </li>

          <li>
            <b>Country ID</b>
            <ul>
              <li>
                Identified with the code <code>cid</code>
              </li>
              <li>No other information is known about this field</li>
            </ul>
          </li>
        </ol>
      </p>

      <h2>Part One</h2>
      <p>
        So, although I left my passport up the toboggan slope, I have got my
        North Pole Credentials. The North Pole Credentials have <i>almost</i>{" "}
        the same information on them as a passport, even including my passport
        number (in this world, a 'Passport ID'), they're just missing my
        'Country ID' (presumably my nationality, or my passport's country of
        origin)
      </p>

      <p>
        My hack for Part One then is to simply alter the passport scanner to
        accept any document that has all of the required fields, except for the
        country ID. I've been provided with a{" "}
        <a href="4.txt">Batch File of all the travellers passports</a>, and I
        need to determine how many are valid with my new verification criteria.
      </p>

      <p>Like always, you can reveal the answer using the button below</p>

      <button type="button" onClick={solvePartOne}>
        Reveal Answer to Part One
      </button>
      <p>Answer is: {part1}</p>

      <h3>Part Two</h3>
      <p>
        Uh-oh! They're onto me! The security agents have correctly identified
        the passport scanner is letting through travellers with invalid values.
        Given the number of people using invalid passports (as opposed to
        invalid documents), it seems passport fraud is a serious issue in the
        North Pole. Makes one wonder why their passport scanners are so
        vulnerable to attack.
      </p>

      <p>
        Regardless, I need to quickly add some data validation to this passport
        scanner before I spend the next half of my sad life in the North Pole
        equivalent of Gitmo. You can reveal how many actual passports are valid
        (after excluding the <code>cid</code> field) by pressing the button
        below.
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
    file(relativePath: { eq: "pages/advent/2020/inputs/4.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
