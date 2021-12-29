import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../../src/utils/typography"

import Layout from "../components/layout"
import Header from "../../src/components/header"
import SEO from "../../src/components/seo"

export default function Articles(data) {
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <Header headerText="Blog" />
        <p>I'm Zach Thomas, and you're on my blog! </p>
        <p>
          I started this blog as a way to keep track of a challenge I made to
          myself while sitting at home during the COVID-19 Pandemic back in 2020
          - to write something new every single day.
        </p>
        <p>
          Since then its grown to do literally nothing else. It's still the
          start of the blog's life, thanks for coming by to visit in its
          infancy!
        </p>
        <p>
          I'm an Australian, and so all posts are written in Australian English.
          Favourite is not a typo, and neither is Gaol. Regardless, I sometimes
          use 'z' instead of 's' like an American, so please forgive me for
          writing 'realize' on occasion. Emails/Tweets correcting my
          <i> Americanized</i> spelling are encouraged, emails correcting my
          Australian spelling are not.
        </p>
        <p>
          Feedback is welcome, but responses are not prompt. I promise I read
          everything that is sent to me, and I'll get back to you eventually.
        </p>
        <h4>{data.data.allMarkdownRemark.totalCount} Posts</h4>
        {data.data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
