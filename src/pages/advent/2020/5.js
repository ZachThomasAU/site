import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

import * as Manifest from "../../../functions/advent/2020/manifestCalculator"
import { BlockMath } from "react-katex"

/**
 * ---
 * title: "Advent of Code 2020, Day Five"
 * date: "2020-12-05"
 * ---
 */
export default function DayOne(data) {
  const [part1, setPart1] = useState(null)
  const [part2, setPart2] = useState(null)
  const [seat, setSeat] = useState("FFFFFFFLLL")
  const [seatID, setSeatID] = useState(null)

  const handleInputChange = (e) => {
    const val = e.target.value
    const validR = ["F", "B"]
    const validC = ["L", "R"]
    let allow = true 
    for (let i=0; i < val.length; i++) {
      if (i < 7 && !validR.includes(val[i])) {
        allow = false
      }
      if (i >= 7 && !validC.includes(val[i])) {
        allow = false
      }
    }

    if (allow) {
      setSeat(val)
    }
  }

  const solvePartOne = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart1(Manifest.getHighestSeatID(text))
  }

  const solvePartTwo = () => {
    const text = data.data.file.childPlainText.content.split("\n")
    setPart2(Manifest.getEmptySeatID(text))
  }

  const calcSeatID = () => {
    if (seat.length < 10) {
      setSeatID("Seat number must be 10 characters long")
    } else {
      setSeatID(Manifest.getSeatID(seat))
    }
  }

  return (
    <Layout>
      <Helmet>
        <body class="advent2020" />
      </Helmet>
      <SEO title="Advent of Code 2020, Day Five" />
      <Header headerText="Advent of Code 2020, Day Five" />

      <p>
        Okay, so we got through airport security, but I somehow lost my boarding
        pass. How this is possible in the <i>anno domini</i> 2020 is completely
        foreign to me. Surely I, the hacker who repeatedly solves near
        world-ending programming problems and saves christmas in mere minutes,
        am storing the boarding pass on my phone e-wallet, right?
      </p>

      <p>
        Anyway, my luddite parallel universe self has lost their boarding pass.
        To compound matters, my past has come back to haunt me. The flight
        attendants are overwhelmed fixing my previous unethical hacking
        exploits, and so cannot help me with my conundrum. I need to quickly
        whip up an application to work out where my seat is, before I face
        certain societal condemnation due to holding up the line in an aeroplane
        aisle. I've spent so many years saving Christmas, I'll be damned if I
        slightly inconvenience some Karen, and ruin everyone around her's
        holiday when she decides to repeatedly remind them of that rude stranger
        who couldn't find their seat on the plane.
      </p>

      <p>
        The airline prints our seat number on the boarding pass using
        <i>Binary Space Partitioning</i>. That is to say the three least
        significant bits (representing the seat column) show Rs and Ls (Rights
        and Lefts), representing 1s and 0s respectively, and the 7 most
        significant bits show Bs and Fs (Backs and Fronts), representing 1s and
        0s respectively, to display the seat in binary. To help us find our seat
        we quickly devise some unexplained method of photographing all the other
        passengers boarding passes to make our own{" "}
        <a href="5.txt">makeshift flight manifest</a>.
      </p>

      <p>
        Finally, each seat has a "SeatID", which is the decimal value of the
        row, multiplied by 8, plus the decimal value of the column. Or:
        <BlockMath math="r * 8 + c" />
        Wait... That's just the base-10 value of the whole string! So the seatID
        is actually just the decimal value of the whole binary number. Sneaky!
      </p>

      <h2>Part One</h2>
      <p>
        Before determining which boarding pass is missing from our flight
        manifest, we need to first do a sanity check, and determine what the
        highest seatID is on our manifest. Once we understand that the seatID is
        just the decimal representation of the seat, this is pretty easy to
        solve. You can reveal the answer given the above manifest by pressing
        the button below.
      </p>
      <button type="button" onClick={solvePartOne}>
        Reveal Answer to Part One
      </button>
      <p>Answer is: {part1}</p>

      <h2>Part Two</h2>
      <p>
        Having confirmed that looks right, we can now proceed with determining
        which seat is ours. This flight doesn't seat all the seats at the very
        front and very back of the plane, and so our missing seat must be the
        seat that does not appear on the flight manifest, and that is also not
        at the beginning or the end of the plane. You can reveal which seat is
        ours by pressing the button below. 
      </p>
      <button type="button" onClick={solvePartTwo}>
        Reveal Answer to Part Two
      </button>
      <p>Answer is: {part2}</p>

      <h2>Fun Extra Challenge</h2>
      <p>
        Humans aren't robots you know! I made a little web app where you can put
        your seat number into the form below, and it will return what seat
        number (SeatID) that seat is. Lets hope the SeatIDs are also printed on
        the aircraft. 
      </p>
      <form>
        <label>
          Seat number: {" "}
          <input name="seat" value={seat} onChange={handleInputChange} maxLength="10"/>
          {" "} (In binary space partition format)
        </label>
        <br/>
        <button type="button" onClick={calcSeatID}>Convert</button>
        <br/>
        SeatID: {seatID}
      </form>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent/2020/inputs/5.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
