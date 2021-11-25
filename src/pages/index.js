import React from "react"

import Header from "../components/header"
import SEO from "../components/seo"

import Typewriter from 'typewriter-effect';
import "../styles/subtitle.css";
import css from "@emotion/css";

export default function Home() {
  return (
    <body>
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
            delay: 200,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('Hi, my name is Zach. <br/> Welcome to my site!')
            .start();
          }}
          />
        </h1>
        <p class='subtitle'>Continue</p>
      </div>
    </body>
  )
}
