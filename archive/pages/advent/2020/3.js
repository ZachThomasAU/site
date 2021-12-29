import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import { slopeCalculator } from "../../../functions/advent/2020/slopeCalculator"
import { InlineMath } from "react-katex"

/**
 * ---
 * title: "Advent of Code 2020, Day Three"
 * date: "2020-12-03"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(null)
  const [part2, setPart2] = useState(null)
  const [xAxis, setXAxis] = useState(0)
  const [yAxis, setYAxis] = useState(1)
  const [crashes, setCrashes] = useState(0)

  const handleInputChange = e => {
    if (e.target.name === "xaxis") {
      setXAxis(e.target.value)
    } else {
      setYAxis(e.target.value)
    }
  }

  const validateData = e => {
    if (e.target.name === "xaxis" && e.target.value < 0) {
      setXAxis(0)
    } else if (e.target.name === "yaxis" && e.target.value < 1) {
      setYAxis(1)
    }
  }

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(slopeCalculator(text, 3, 1))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(
      slopeCalculator(text, 1, 1) *
        slopeCalculator(text, 3, 1) *
        slopeCalculator(text, 5, 1) *
        slopeCalculator(text, 7, 1) *
        slopeCalculator(text, 1, 2)
    )
  }

  const calculateCrashes = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setCrashes(slopeCalculator(text, +xAxis, +yAxis))
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Three" />
      <Header headerText="Advent of Code 2020, Day Three" />
      <p>
        My rental toboggan secured, and having had my fill of missing flights
        because I leave for the airport too late, I decide to take off for the
        airport a few days early. Lets see if I can still manage to show up
        barely 15 minutes before boarding closes anyway.
      </p>
      <p>
        As I flagged earlier, I'm being frugal, so it seems appropriate at this
        point to rent the cheapest possible toboggan - it is very restricted in
        its movement. It can only follow very strict, rational gradients.
      </p>
      <p>
        We have a bit of an issue though. The slope to the airport is riddled
        with trees! I need to work out how many trees I'm going to crash into on
        my way to the airport. The geology of the north pole apparently forces
        trees to grow on fixed, equidistant coordinates, and the geography of
        the north pole apparently populates their trees according to fixed
        horizontal biomes. That is, the horizontal tree pattern loops infinitely
        (or at least for a long time, and at least the entirety of the slope for
        our travel purposes.)
      </p>
      <p>
        <a href="3.txt">
          This is the biome of the slope we're travelling along
        </a>
        , where the top left of the biome is where we are now, and the bottom of
        the biome is the coast (where the airport is). Or, at least the end of
        the slope, where we will move on to the next place on our journey to the
        coast.
      </p>
      <h2>Part One</h2>
      <p>
        To start with we're going to calculate how many trees we will crash into
        if we choose the gradient "Right 3, Down 1". That is, our gradient is 3.
        You can reveal the answer by pressing the button below.
      </p>
      <button type="button" onClick={solvePartOne}>
        Reveal Answer To Part One
      </button>
      <p>Answer is: {part1}</p>
      <h2>Part Two</h2>
      <p>
        Wow that's a lot of crashes! Now we re-evaluate if we choose the
        gradients 1 (1 right, 1 down), 3 (3 right, 1 down), 5 (5 right, 1 down),
        7 (7 right, 1 down) or <InlineMath math="\frac{1}{2}" /> (1 right, 2
        down). We then want to find the product of all of those gradients. You
        can reveal the answer by pressing the button below.
      </p>
      <button type="button" onClick={solvePartTwo}>
        Reveal Answer To Part Two
      </button>
      <p>Answer is: {part2}</p>
      <h3>Fun extra challenge</h3>
      <p>
        Wow that's a lot of crashes, we're going to have a bad time no matter
        what gradient we choose. So I built a calculator to determine how many
        crashes we'll get for any gradient we could choose.
      </p>
      <form>
        <label>
          X-Axis gradient (How far right do we turn?):
          <input
            type="number"
            name="xaxis"
            value={xAxis}
            onChange={handleInputChange}
            onBlur={validateData}
          ></input>
        </label>
        <br />
        <label>
          Y-Axis gradient (How far down do we turn?):
          <input
            type="number"
            name="yaxis"
            value={yAxis}
            onChange={handleInputChange}
            onBlur={validateData}
          ></input>
        </label>
        <br />
        <button type="button" onClick={calculateCrashes}>
          Calculate Crashes
        </button>
      </form>
      With that gradient you will crash {crashes} times. <br />
      x-axis: {xAxis} <br />
      y-axis: {yAxis}
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/3.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
