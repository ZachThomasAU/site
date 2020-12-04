import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
/* eslint-disable no-unused-vars */
import {InlineMath, BlockMath} from "react-katex"
/* eslint-enable no-unused-vars */

import { rhythm } from "../utils/typography"

import "katex/dist/katex.min.css"

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
        <Link to="/" style={{ backgroundImage: "none" }}>
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
          <ListLink to="/advent">Advent</ListLink>
          <ListLink to="/articles">Blog</ListLink>
          <ListLink to="/about/about">About</ListLink>
          <ListLink to="/contact/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
