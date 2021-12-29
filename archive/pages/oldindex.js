import React from "react"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <Header headerText="Welcome to my site!" />
      <p>
        It doesn't do much for now. I'm not sure what my plans are for it, if I
        have any plans for it at all. We'll see how it goes!
      </p>
      <p>
        This is definitely not a CTF. Please...{" "}
        <span password="DoYouThinkThisPassw0rdIsSecur3!?">
          DO NOT HACK THIS SITE!
        </span>
      </p>
    </Layout>
  )
}
