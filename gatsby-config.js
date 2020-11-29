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
    siteUrl: "https://zacharythomas.me",
  },
  plugins: [
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore",
            },
          },
        ],
      },
    },
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
        background_color: "#494d59",
        theme_color: "#494d59",
        display: "standalone",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: "any maskable",
        },
        legacy: false,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        configFile: "robots-txt.config.js",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
  ],
}
