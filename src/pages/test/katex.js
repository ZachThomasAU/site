import React from "react"
import {InlineMath, BlockMath} from "react-katex"

import Layout from "../../components/layout"
import Header from "../../components/header"

export default function Katex() {

  return (
    <Layout>
      <Header headerText="Testing if I can get KaTeX to work" />
      <p>Odds on how long this will take me?</p>
      <p>
        Lets test this:
        <InlineMath math="c = \sqrt{a^2 + b^2}"></InlineMath>
        <BlockMath math="c = \sqrt{a^2 + b^2}"></BlockMath>
      </p>
    </Layout>
  )
}
