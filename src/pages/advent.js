import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

export default function Advent() {
  return (
    <Layout>
      <SEO title="Advent of Code" />
      <Header headerText="Advent of Code" />
      <p>
        I decided to add an extra layer of difficulty to the Advent of Code
        2020, by also challenging myself to display the results of the
        challenges on this site.
      </p>
      <p>
        It will likely start off as simply displaying the outputs with a little
        bit of text, maybe with some in-browser JS stuff if it's not too time
        consuming, so I can keep up with the challenges each day. Then, I hope
        to come back to the challenges whilst still on leave in January to
        pretty them up, and do some fancy React webapp magic. I think I'll get a
        clearer idea of what that might look like when I see the overarching
        story behind the challenges.
      </p>
      <p>
        I also have some 2019 Advent of Code challenges completed before the
        Advent of Code 2020 opened, so I could do some templating and some
        backend setup, to save myself a little time when actually completing the
        challenges. You can also find those on this page.
      </p>
      <h3>2020 Advent of Code</h3>
      <ol>
        <li>
          <Link to="/advent/2020/1">Day One</Link>
        </li>
        <li>
          <Link to="/advent/2020/2">Day Two</Link>
        </li>
        <li>
          <Link to="/advent/2020/3">Day Three</Link>
        </li>
        <li>
          <Link to="/advent/2020/4">Day Four</Link>
        </li>
        <li>
          <Link to="/advent/2020/5">Day Five</Link>
        </li>
        <li>
          <Link to="/advent/2020/6">Day Six</Link>
        </li>
        <li>
          <Link to="/advent/2020/7">Day Seven</Link>
        </li>
        <li>
          <Link to="/advent/2020/8">Day Eight</Link>
        </li>
        <li>
          <Link to="/advent/2020/9">Day Nine</Link>
        </li>
        <li>
          <Link to="/advent/2020/10">Day Ten</Link>
        </li>
        <li>
          <Link to="/advent/2020/11">Day Eleven</Link>
        </li>
        <li>
          <Link to="/advent/2020/12">Day Twelve</Link>
        </li>
        <li>
          <Link to="/advent/2020/13">Day Thirteen</Link>
        </li>
        <li>
          <Link to="/advent/2020/14">Day Fourteen</Link>
        </li>
        <li>
          <Link to="/advent/2020/15">Day Fifteen</Link>
        </li>
      </ol>
      <h3>2019 Advent of Code</h3>
      <ol>
        <li>
          <Link to="/advent/2019/1">Day One</Link>
        </li>
        <li>
          <Link to="/advent/2019/2">Day Two</Link>
        </li>
      </ol>
    </Layout>
  )
}
