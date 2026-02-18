export const Colors = {
  primary:    "#00C2CB", 
  primaryDark:"#1DB1B7",  
  secondary:  "#44D7DD",  
  accent:     "#A6F3FF", 

  background: "#1E1E1E",
  card:       "#446266",

  white:      "#FFFFFF",
  gray:       "#8A9A9D",  

  whiteMuted: "rgba(255,255,255,0.87)",
  bgMuted:    "rgba(30,30,30,0.85)",
} as const;

export type ColorKey = keyof typeof Colors;