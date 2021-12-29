import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
/* eslint-disable no-unused-vars */
import {InlineMath, BlockMath} from "react-katex"
/* eslint-enable no-unused-vars */

import { rhythm } from "../utils/typography"
import "katex/dist/katex.min.css"

import '../styles/global.css'

export default function Header(props) {
  return <h1>{props.headerText}</h1>
}