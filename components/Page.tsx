import styled, { ThemeProvider } from 'styled-components'
import Header from './SiteHeader'
import Nav from './Nav'
import Meta from './Meta'
import Footer from './SiteFooter'
import { theme } from '../lib/theme'
import useTabListener from '../hooks/useTabListener'

const Container = styled('div')`
  margin: 0 auto;
  max-width: 80em;
  padding: 0 3em;
  @media (max-width: ${props => props.theme.bP.dMd}) {
    padding: 0 2em;
  }
  @media (max-width: ${props => props.theme.bP.mR}) {
    padding: 0 1em;
  }
`

const Page: React.FC = ({ children }) => {
  useTabListener()

  return (
    <ThemeProvider theme={theme}>
      <>
        <Container>
          <Meta />
          <Header />
          <Nav />
          {children}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default Page
