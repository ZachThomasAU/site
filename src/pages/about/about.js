import React from "react"

import styles from "./about.module.css"
import Layout from "../../components/layout"
import Header from "../../components/header"

console.log(styles)

const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="user's avatar" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

export default function About() {
  return (
    <Layout>
      <Header headerText="About" />
      <p>This is a site that doesn't do much for now.</p>
      <User
        username="Zach Thomas"
        avatar="https://avatars.githubusercontent.com/ZachThomasAU"
        excerpt="Hi, I'm Zach Thomas. I made the site!"
      />
    </Layout>
  )
}