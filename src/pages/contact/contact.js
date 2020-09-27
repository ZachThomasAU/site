import React from "react"

import Layout from "../../components/layout"
import Header from "../../components/header"
import SEO from "../../components/seo"

export default function Contact() {
  return (
    <Layout>
      <SEO title="Contact ZacharyThomas.me" />
      <Header headerText="Contact" />
      <p>Send me a message!</p>

      <h3>Website Things</h3>
      <p>
        If you have thoughts about the site, security vulnerabilities, or bugs
        then please contact me{" "}
        <a href="mailto:website@zacharythomas.me">here</a>.
      </p>

      <h3>Writing Things</h3>
      <p>
        If you want to contact me regarding writing related stuff (books,
        screenplays, etc.) then please contact me{" "}
        <a href="mailto:writing@zacharythomas.me">here</a>.
      </p>

      <h3>Esports Things</h3>
      <p>
        If you want to contact me regarding esports related stuff then please
        contact me <a href="mailto:esports@zacharythomas.me">here</a>.
      </p>
    </Layout>
  )
}
