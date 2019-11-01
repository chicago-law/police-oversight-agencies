import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const Container = styled('header')`
  margin: 5em auto 0 auto;
  padding: 0 1em;
  h1 {
    font-size: ${props => props.theme.ms(5)};
    text-align: center;
    margin: 0 auto 1.5em auto;
    max-width: 15em;
    @media (max-width: ${props => props.theme.bP.mR}) {
      font-size: ${props => props.theme.ms(4)};
    }
  }
  h5 {
    text-align: center;
    margin: 0 auto 3em auto;
    max-width: 35em;
  }
  p {
    margin: 0 auto;
    max-width: 50em;
  }
`

const SiteHeader = () => (
  <Container>
    <h1>Police Oversight Agencies in 100 Largest U.S. Cities</h1>
    <h5>By Sharon Fairley &amp; The University of Chicago Law School Police Accountability Clinic</h5>
    <p>
      <strong>Loren</strong> gypsum dolor sit meat, ecus linguists efficient ea, veil sale disciple at. Nahum slum vociferous e viz, ad discern inimical perambulator bis. Ea an definiteness dissents dissident, ileum labor ram it. Erudite commune consecrate re tied. Ad ram leis lucid lies, in quo dis risque civics cum, re consul sol eat usu. Per it pique time am. Ed ea clit a elect ram referent, at diode imper diet enc.
      <a href="#">
        &nbsp;Read the full article&nbsp;
        <span> <FontAwesomeIcon icon={['fas', 'external-link-square-alt']} /></span>
      </a>
    </p>
  </Container>
)

export default SiteHeader
