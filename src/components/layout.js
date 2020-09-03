import React from "react"
import { Link } from "gatsby"

import layoutStyles from "./layout.module.css"

const ListLink = props => (
  <li style={{ display: 'inline-block', marginRight: '1rem'}}>
    <Link to={props.to} style={{ textShadow: 'none' }}>
      {props.children}
    </Link>
  </li>
)

export default function Layout({ children }) {
  return (
    <div className={layoutStyles.layout}>
      <header style={{marginBottom: '1.5rem'}}>
        <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none'}}>
          <h3 style={{display: 'inline'}}>ZachThomas.me</h3>
        </Link>
        <ul style={{listStyle: 'none', float:'right'}}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/about">About</ListLink>
          <ListLink to="/contact/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}