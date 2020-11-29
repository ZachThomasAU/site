import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
// import layoutStyles from "./layout.module.css"

import "katex/dist/katex.min.css"
import "katex/dist/katex.mjs"
import "katex/dist/contrib/auto-render.mjs"

const ListLink = props => (
  <li style={{ display: "inline-block", marginRight: "1rem" }}>
    <Link to={props.to} activeStyle={{ backgroundImage: "none" }}>
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
        max-width: 1080px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <header>
        <Link to="/" style={{ textShadow: "none", backgroundImage: "none" }}>
          <h3
            css={css`
              display: inline;
              marginbottom: ${rhythm(2)};
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <ul style={{ listStyle: "none", float: "right" }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/articles">Blog</ListLink>
          <ListLink to="/about/about">About</ListLink>
          <ListLink to="/contact/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
