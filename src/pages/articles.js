import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"
import Header from "../components/header"

export default function Articles(data) {
  console.log(data.data)
  return (
    <Layout>
      <div>
        <Header headerText="Articles" />
        <p>This is a list of all the articles on this site</p>
        <h4>{data.data.allMarkdownRemark.totalCount} Posts</h4>
        {data.data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              <a href="">{node.frontmatter.title} </a>
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
