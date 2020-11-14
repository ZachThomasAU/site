import React from "react"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

export default function Articles(data) {
  console.log(data.data)
  return (
    <Layout>
      <SEO title="Quotes" />
      <div>
        <Header headerText="Quotes" />
        <p>This is a list of some quotes that I think are pretty neat</p>
        <p>
          <i>
            Avoiding danger is no safer in the long run than outright exposure.
            The fearful are caught as often as the bold.
          </i>{" "}
          ~ Helen Keller
          <br />
          <i>
            The best thing about a boolean is even if you are wrong, you are
            only off by a bit
          </i>{" "}
          {""}
          ~ Dunno
          <br />
          <i>
            The true hypocrite is the one who ceases to perceive his deception,
            the one who lies with sincerity
          </i>{" "}
          ~ Andre Gide
          <br />
          <i>Always learn from the misfortunes of others</i> ~ Aesop
          <br />
          <i>
            One of the secrets to staying young is to always do things you don’t
            know how to do, to keep learning.
          </i>{" "}
          ~ Ruth Reichl
          <br />
          <i>Great acts are made up of small deeds</i> ~ Laozi
          <br />
          <i>
            Whether you think you can or you think you can't, you're right
          </i>{" "}
          ~ Henry Ford
          <br />
          <i>
            Doing the best at this moment often puts you in the best place for
            the next moment
          </i>{" "}
          ~ Oprah
          <br />
          <i>
            Even if I knew that tomorrow the world would go to pieces, I would
            still plant my apple tree
          </i>{" "}
          ~ Martin Luther
          <br />
          <i>
            Learn from the mistakes of others. You can’t live long enough to
            make them all yourself.
          </i>{" "}
          ~ FDR's better half
        </p>
      </div>
    </Layout>
  )
}
