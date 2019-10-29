import { css } from 'styled-components'
import { theme } from './theme'

const animations = {
  fadeSlideUp: (duration = 300, delay = 0) => css`
    animation: appear ${duration}ms ${theme.easing.exponential} forwards;
    animation-delay: ${delay}ms;
    opacity: 0;
    transform: translateY(0.65em);
  `,
  fadeSlideDown: (duration = 300, delay = 0) => css`
    animation: appear ${duration}ms ${theme.easing.exponential} forwards;
    animation-delay: ${delay}ms;
    opacity: 0;
    transform: translateY(-0.65em);
  `,
}

export default animations
