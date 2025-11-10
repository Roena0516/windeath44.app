export const colors = {
  primary: '#ff8ef6',
  lightprimary: '#ffd3fb',
  darkprimary: '#dcafdd',
  secondary: '#ffbbf5',
  stroke: '#e774dd',
  darkdark: '#d591d7',
  black: '#2e2e2e',
  white: '#ffffff',
  gray: '#cccccc',
} as const;

export const fonts = {
  primary: "'Galmuri11', sans-serif",
  title: "'DOSIyagiBoldface', sans-serif",
} as const;

export const shadows = {
  inset: 'inset -1px -1px 0px 0px #ffffff, inset 1px 1px 0px 0px #2e2e2e, inset -2px -2px 0px 0px #dcafdd, inset 2px 2px 0px 0px #dcafdd',
  button: 'inset -1px -1px 0px 0px #2e2e2e, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px #dcafdd, inset 2px 2px 0px 0px #ffbbf5',
} as const;

export const theme = {
  colors,
  fonts,
  shadows,
} as const;

export type Theme = typeof theme;
