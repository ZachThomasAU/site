import React from "react"
import { Link } from "gatsby"

import Container from "../../components/container"
import Header from "../../components/header"

export default function Contact() {
  return (
    <Container>
      <Link to="/">Home    </Link>
      <Link to="/about/about">    About</Link>
      <Header headerText="Contact" />
      <p>Send us a message!</p>
    </Container>
  )
}