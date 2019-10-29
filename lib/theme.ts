export const theme = {
  // Grayscale
  black: '#272727',
  darkGray: '#404040',
  middleGray: '#7D7D7D',
  lightGray: '#ACACAC',
  offWhite: '#F1F1F1',

  // Accent colors
  red: '#FF675F',
  lightBlue: '#DBE4FF',
  darkBlue: '#3A55A0',
  blue: (opacity = 1) => `rgba(95, 136, 254, ${opacity})`,

  // Fonts
  proximaNova: 'proxima-nova, sans-serif',
  garamond: 'adobe-garamond-pro, serif',

  // Font size - base font size of 19. Use by passing in whole numbers
  // to evenly scale up and down from there with a ratio of 1.25.
  // 0 = 18.
  ms: (modifier: number) => `${(19 * (1.25 ** modifier)).toFixed(2)}px`,

  // Easing
  easing: {
    exponential: 'cubic-bezier(.19,1,.22,1)',
  },
}
