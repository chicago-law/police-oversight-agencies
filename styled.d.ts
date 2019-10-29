import 'styled-components'
import { theme } from './lib/theme'

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}

// https://github.com/styled-components/styled-components/issues/1589
