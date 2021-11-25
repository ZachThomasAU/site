import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../../components/layout"
import Header from "../../../components/header"
import SEO from "../../../components/seo"

/**
 * ---
 * title: "Advent of Code 2015, Day One"
 * date: "2021-11-21"
 * ---
 */

export default function DayOne(data) {
  const text = data.data.file.childPlainText.content.split("\n");

  return (
    <p>
      Hello, World!
    </p>
  );
}

 export const query = graphql`
 query {
   file(relativePath: { eq: "pages/advent/2015/inputs/1.txt" }) {
     id
     childPlainText {
       content
     }
   }
 }
`