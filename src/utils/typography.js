import Typography from "typography"
// import lincolnTheme from "typography-theme-lincoln"
import fairyGateTheme from "typography-theme-fairy-gates"
// import kirkhamTheme from "typography-theme-kirkham"

fairyGateTheme.headerColor = "hsla(0,0,80,0.9)"
fairyGateTheme.bodyColor = "hsla(0,0,80,0.73)"
fairyGateTheme.overrideThemeStyles = () => ({
  a: {
    textShadow:
      ".03em 0 #32353d,-.03em 0 #32353d,0 .03em #32353d,0 -.03em #32353d,.06em 0 #32353d,-.06em 0 #32353d,.09em 0 #32353d,-.09em 0 #32353d,.12em 0 #32353d,-.12em 0 #32353d,.15em 0 #32353d,-.15em 0 #32353d",
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, white 1px, white 2px, rgba(0, 0, 0, 0) 2px)`,
    color: "white",
  },
})

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
