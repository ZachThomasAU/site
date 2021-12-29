import React, { useState } from "react"

import Layout from "../components/layout"
import Header from "../components/header"

export default function Admin() {
  const [password, setPassword] = useState(null)

  const handleInput = event => {
    setPassword(event.target.value)
  }

  const doCTF = event => {
    event.preventDefault()
    if (password === "DoYouThinkThisPassw0rdIsSecur3!?") {
      alert("This actually isn't a CTF. You just wasted your time...")
    } else {
      alert("Incorrect password dummy")
    }
  }

  return (
    <Layout>
      <Header headerText="Admin Login" />
      <p>
        Wait hold on. You're not supposed to be here! Phew, lucky I stored my
        password in a really secure place, so you'll never be able to get passed
        this screen.
      </p>
      <form onSubmit={doCTF}>
        <label>
          Admin Password:
          <input type="password" onChange={handleInput} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}
