import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../../components/seo"
import * as styles from "./about.module.css"

export default function About({ data }) {
  return (
    <body>
      <SEO title="About" />
      <h1>About Me</h1>
      <p>This is a site that doesn't do much for now.</p>
    </body>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "images/ZachThomasAU.jpg" }) {
      childImageSharp {
        fixed {
          src
        }
      }
    }
  }
`
