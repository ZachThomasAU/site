import React, { useState } from "react"
import {Link} from "gatsby"

import Typewriter from 'typewriter-effect';
import css from "@emotion/css";

import SEO from "../components/seo";
import "../styles/subtitle.scss";

export default function Home() {
  const [continueHolder, setContinueHolder] = useState('');

  function continueUpdate() {
    setContinueHolder("My site is currently being redeveloped. \n\n Thanks for visiting though!");
  }

  return (
    <body class='centre'>
      <SEO title="Welcome" />
      <div>
        <h1 css={css`
          font-size: clamp(1rem, 3vw + 1rem, 4rem);
          position: relative;
          font-family: courier-std, Courier, 'Courier New', monospace;
          position: relative;
          width: max-content;
        `}>
          <Typewriter 
          options={{
            delay: 160,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('Hi, my name is Zach.<br/> Welcome to my site!')
            .start();
          }}
          />
        </h1>
        <p class='subtitle'>
          {/*<Link to='/about/about' class='link'>Continue</Link>*/}
          <a class='link' onClick={continueUpdate}>Continue</a>
        </p>
        <p>{continueHolder}</p>
      </div>
    </body>
  )
}
