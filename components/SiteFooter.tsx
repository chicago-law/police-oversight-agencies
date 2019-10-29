import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LawSchoolLogo from '../public/static/uc_law.svg'

const StyledFooter = styled('footer')`
  margin: 10em 0 0 0;
  padding: 2em;
  background: ${props => props.theme.darkGray};
  font-family: ${props => props.theme.proximaNova};
  box-shadow: 0 5px 15px rgba(0,0,0,0.25) inset;
  ul {
    display: flex;
    align-items: flex-start;
    li {
      display: inline-flex;
      margin-right: 5em;
      font-size: ${props => props.theme.ms(-2)};
      p, a {
        color: ${props => props.theme.lightGray};
        font-weight: normal;
      }
      p {
        max-width: 20em;
      }
      .logo {
        position: relative;
        top: 6px;
        width: 300px;
        opacity: 0.8;
      }
      .link-with-icon {
        display: inline-flex;
        align-items: center;
        svg {
          margin: 0 0.5em;
        }
      }
    }
  }
`

const SiteFooter = () => (
  <StyledFooter>
    <ul>
      <li>
        <a href="https://www.law.uchicago.edu" target="_blank" rel="noopener noreferrer">
          <LawSchoolLogo className="logo" />
        </a>
      </li>
      <li>
        <p>Loren gypsum dolor sit meat, ecus linguists efficient ea, veil sale disciple at. Nahum slum vociferous e viz, ad discern inimical perambulator bis. Ea an definiteness dissents dissident, ileum labor ram it.</p>
      </li>
      <li>
        <a href="" className="link-with-icon"><FontAwesomeIcon icon={['fas', 'envelope']} /> Contact</a>
      </li>
      <li>
        <a href="" className="link-with-icon"><FontAwesomeIcon icon={['fab', 'github']} /> View source code on Github</a>
      </li>
    </ul>
  </StyledFooter>
)

export default SiteFooter
