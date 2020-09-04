import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
// import layoutStyles from "./layout.module.css"

const ListLink = props => (
  <li style={{ display: "inline-block", marginRight: "1rem" }}>
    <Link to={props.to} style={{ textShadow: "none" }}>
      {props.children}
    </Link>
  </li>
)

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div 
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <header>
        <Link to="/" style={{ textShadow: "none", backgroundImage: "none" }}>
          <h3  
            css={ css`
              display: inline;
              marginBottom: ${rhythm(2)};
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <ul style={{ listStyle: "none", float: "right" }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/about">About</ListLink>
          <ListLink to="/contact/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
