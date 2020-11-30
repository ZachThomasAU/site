import React, { useState } from "react"
import { graphql } from "gatsby"
import { BlockMath } from "react-katex"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

import * as fuelCounterUpper from "./fuelCounterUpper"

export default function DayOne(data) {
  const [fuel, setFuel] = useState(0)
  const [fuel2, setFuel2] = useState(0)
  const [mass, setMass] = useState(0)
  const [mass2, setMass2] = useState(0)
  const [totalFuel, setTotalFuel] = useState(0)
  const [totalFuel2, setTotalFuel2] = useState(0)

  const handleInputChange = e => {
    if (e.target.name === "mass") {
      setMass(e.target.value)
    } else {
      setMass2(e.target.value)
    }
  }

  const doTheFuelThing = () => {
    setFuel(fuelCounterUpper.calculateFuel(mass))
  }

  const doTheFuelThing2 = () => {
    setFuel2(fuelCounterUpper.calculateFuel2(mass2))
  }

  const doPartOne = () => {
    setTotalFuel(
      fuelCounterUpper.sumFuel(data.data.file.childPlainText.content)
    )
  }

  const doPartTwo = () => {
    setTotalFuel2(
      fuelCounterUpper.sumFuel2(data.data.file.childPlainText.content)
    )
  }

  return (
    <Layout>
      <SEO title="Advent of Code 2019, Day One" />
      <Header headerText="Advent of Code 2019, Day One" />
      <p>
        So Santa is stranded! I need to calculate the total fuel requirement for
        the "Fuel Counter-Upper". The fuel required for a single module is
        calculated via the following function:
        <BlockMath math="fuel = \left\lfloor{\frac{mass}{3}}\right\rfloor - 2" />
      </p>
      <p>
        You can determine the fuel required given a specific mass by using the
        following tool:
      </p>
      <form>
        <label>
          Mass:
          <input
            type="number"
            name="mass"
            value={mass}
            onChange={handleInputChange}
          />
        </label>
        <input type="button" value="submit" onClick={doTheFuelThing} />
      </form>
      The necessary fuel for that mass is: {fuel} <br /> (negative fuel is
      instead rounded up to 0)
      <h2>Part One</h2>
      <p>
        I've been given a <a href="/advent2019/1.txt">puzzle input</a>{" "}
        containing the mass of every module I need to load onto Santa's ship.
        Santa needs me to work out the sum of the fuel requirements for each of
        those modules. Easy enough right?
      </p>
      <button onClick={doPartOne}>
        This button will calculate the total fuel requirement
      </button>
      <p>The total fuel requirement is: {totalFuel}</p>
      <h2>Part Two</h2>
      <p>
        Job's not done though. An elf in charge of the{" "}
        <i>"Rocket Equation Double-Checker"</i> correctly identifies I haven't
        accounted for the extra weight added by the fuel! So I need to add the
        extra weight of the fuel as a module itself. And then the weight of that
        fuel, and so on and so on. Recursion. Great.
      </p>
      <p>
        Any mass that requires negative fuel should be treated instead as zero
        fuel. That is if the mass is less than 6, we can cover that extra energy
        by wishing really hard, because Santa's sleigh is actually a hybrid
        engine. A...petrol...wishful-thinking...hybrid? I dunno it's magic.
      </p>
      <p>
        The mass of 1 unit of fuel is 1. Here's an updated tool calculating the
        total fuel requirement, including the added weight of the fuel, given
        some mass.
      </p>
      <form>
        <label>
          Mass:
          <input
            type="number"
            name="mass2"
            value={mass2}
            onChange={handleInputChange}
          />
        </label>
        <input type="button" value="submit" onClick={doTheFuelThing2} />
      </form>
      The necessary fuel for that mass is: {fuel2}
      <br /> <br />
      <button onClick={doPartTwo}>
        This button will calculate the total fuel requirement, including the
        extra weight from the added fuel.
      </button>
      <p>The real total fuel requirement is: {totalFuel2}</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent2019/inputs/1.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
