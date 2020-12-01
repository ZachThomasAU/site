import React, { useState } from "react"
import { graphql } from "gatsby"
import { BlockMath } from "react-katex"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

/**
 * ---
 * title: "Advent of Code 2020, Day One"
 * date: "2020-12-01"
 * ---
 */
export default function DayOne(data) {
  return (
    <Layout>
      <SEO title="Advent of Code 2020, Day One" />
      <Header headerText="Advent of Code 2020, Day One" />

      <p>1 Hour To Go!</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "pages/advent2020/inputs/1.txt" }) {
      id
      childPlainText {
        content
      }
    }
  }
`
