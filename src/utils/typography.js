import Typography from "typography"
// import lincolnTheme from "typography-theme-lincoln"
import fairyGateTheme from "typography-theme-fairy-gates"
// import kirkhamTheme from "typography-theme-kirkham"

fairyGateTheme.headerColor = "hsla(0,0,80,0.9)"
fairyGateTheme.bodyColor = "hsla(0,0,80,0.73)"
fairyGateTheme.overrideThemeStyles = () => ({
  a: {
    textShadow: "none",
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #b9f 1px, #b9f 2px, rgba(0, 0, 0, 0) 2px);`,
    color: "#b9f",
  },
})

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
