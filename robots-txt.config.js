module.exports = {
  host: "https://zacharythomas.me",
  sitemap: "https://zacharythomas.me/sitemap.xml",
  policy: [
    { userAgent: "*", disallow: "/404" },
    { userAgent: "*", disallow: "/leaguepedia-api/" },
  ],
}
