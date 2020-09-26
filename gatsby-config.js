/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "ZacharyThomas.me",
    description:
      "Zach Thomas's personal website, webapp and blog! Find all things Zach Thomas related here",
    author: "Zachary Thomas",
  },
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `src/`,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "ZacharyThomas.me",
        short_name: "ZacharyThomas.me",
        start_url: "/",
        background_colour: "#6b37bf",
        theme_colour: "#6b37bf",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
  ],
}
