import { createGlobalStyle } from 'styled-components'
import { config, dom } from '@fortawesome/fontawesome-svg-core'
import C from './constants'

config.autoAddCss = false

const GlobalStyles = createGlobalStyle`
  /* For accessibility, add visible focus if user starts tabbing */
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) option:focus,
  body:not(.user-is-tabbing) textarea:focus,
  body:not(.user-is-tabbing) [role="button"]:focus {
    outline: none;
  }

  /* Global */
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
    padding: 0;
    border: 0;
    margin: 0;
  }
  html, body {
    background: ${props => props.theme.black};
    color: white;
    font-family: ${props => props.theme.garamond};
    font-size: ${props => props.theme.ms(0)};
    line-height: 1.4;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  /* Include FontAwesome CSS here so they don't flash huge. */
  ${dom.css()}

  /* Typography */
  h1 {
    line-height: 1.2;
    font-size: ${props => props.theme.ms(4)};
  }
  h2 {
    font-size: ${props => props.theme.ms(2)};
  }
  h3 {
    font-family: ${props => props.theme.proximaNova};
    text-transform: uppercase;
    font-size: ${props => props.theme.ms(1)};
  }
  h4 {
    font-size: ${props => props.theme.ms(0)};
  }
  h5 {
    font-size: ${props => props.theme.ms(-1)};
    font-family: ${props => props.theme.proximaNova};
    opacity: 0.75;
    letter-spacing: 1.65px;
    text-transform: uppercase;
    font-weight: normal;
  }
  a {
    color: ${props => props.theme.red};
    text-decoration: none;
    font-weight: bold;
    transition: opacity 150ms ease-out;
  }
  a:hover {
    opacity: 0.75;
  }
  .capitalize {
    text-transform: capitalize;
  }

  /* Lists */
  li {
    list-style-type: none;
  }

  /* Forms */
  input {
    background: none;
    padding: 0 0 0.5em 0;
    border: 0;
    margin: 0;
    color: white;
    border-bottom: 3px solid transparent;
    transition: border-color 150ms ease-out;
    &::placeholder {
      color: ${props => props.theme.lightGray};
    }
    &:hover {
      border-color: ${props => props.theme.darkGray};
    }
    &:focus {
      border-color: white;
    }
  }
  button {
    cursor: pointer;
    border: 0;
    padding: 0;
    background: none;
  }

  /* Keyframes */
  @keyframes appear {
    to {
      opacity: 1;
      transform: none;
    }
  }

  /* Transitions */
  .${C.SMOOTH_SLIDE_DOWN}-enter {
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
  }
  .${C.SMOOTH_SLIDE_DOWN}-enter-active, .${C.SMOOTH_SLIDE_DOWN}-enter-done {
    max-height: 50em;
    opacity: 1;
    transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
  }
  .${C.SMOOTH_SLIDE_DOWN}-exit {
    max-height: 50em;
    opacity: 1;
    transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
  }
  .${C.SMOOTH_SLIDE_DOWN}-exit-active {
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
  }
`

export default GlobalStyles
