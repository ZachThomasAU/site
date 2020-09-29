import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import styles from "./about.module.css"
import Layout from "../../components/layout"
// import Header from "../../components/header"
import SEO from "../../components/seo"

console.log(styles)

const User = props => (
  <div className={styles.user}>
    <Img
      fixed={props.avatar}
      className={styles.avatar}
      alt="photo of Zach Thomas"
    />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

export default function About({ data }) {
  return (
    <Layout>
      <SEO title="About" />
      <h1>About {data.site.siteMetadata.title} </h1>
      <p>This is a site that doesn't do much for now.</p>
      <User
        username="Zach Thomas"
        avatar={data.file.childImageSharp.fixed}
        excerpt="Hi, I'm Zach Thomas. I made the site!"
      />
    </Layout>
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
