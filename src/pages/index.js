import React from "react"
import { Link } from "gatsby"

import Container from "../components/container"
import Header from "../components/header"

export default function Home() {
  return (
    <Container>
      <Link to="/about/about">About    </Link>
      <Link to="/contact/contact">    Contact</Link>
      <Header headerText="Welcome to my site!"/>
      <p>What a world, huh?</p>
      <img
        src="https://source.unsplash.com/random/400x200"
        alt="just something random"
      />
    </Container>
  )
}
