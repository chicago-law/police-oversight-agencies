import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LawSchoolLogo from '../public/static/UChicago_TheLawSchool_White RGB.svg'

const Container = styled('footer')`
  margin: 10em 0 0 0;
  padding: 2em;
  background: ${props => props.theme.darkGray};
  font-family: ${props => props.theme.proximaNova};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) inset;
  ul {
    display: flex;
    align-items: flex-start;
    @media (max-width: ${props => props.theme.bP.dMd}) {
      justify-content: space-between;
    }
    @media (max-width: ${props => props.theme.bP.mR}) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    li {
      display: inline-flex;
      margin-right: 5em;
      font-size: ${props => props.theme.ms(-2)};
      @media (max-width: ${props => props.theme.bP.dMd}) {
        margin-right: 0;
        padding: 0 1em;
      }
      @media (max-width: ${props => props.theme.bP.mR}) {
        margin-bottom: 2em;
      }
      &:last-child {
        margin-right: 0;
      }
      p,
      a {
        color: ${props => props.theme.lightGray};
        font-weight: normal;
      }
      p {
        max-width: 30em;
      }
      .logo {
        max-width: 300px;
        svg {
          position: relative;
          top: 1px;
          width: 100%;
          opacity: 0.8;
        }
      }
      .link-with-icon {
        display: inline-flex;
        align-items: baseline;
        .svg-inline--fa {
          position: relative;
          top: 2px;
          margin: 0 0.5em;
        }
      }
    }
  }
`

const SiteFooter = () => (
  <Container>
    <ul>
      <li>
        <a
          href="https://www.law.uchicago.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="logo"
        >
          <LawSchoolLogo />
        </a>
      </li>
      <li>
        <p>
          The author of the survey has attempted to validate the data provided
          on this site to the extent possible using online information
          resources, but makes no representations about the accuracy of the
          information provided herein. In particular, the author notes that the
          field of civilian oversight of police is changing rapidly and this
          survey is only a snapshot of the field taken at the time of
          data-gathering (January - August 2022). We hope to periodically
          provide updated information.
        </p>
      </li>
      <li>
        <a
          href="mailto:policeoversight@uchicago.edu"
          className="link-with-icon"
        >
          <FontAwesomeIcon icon={['fas', 'envelope']} />
          Contact
        </a>
      </li>
      <li>
        <a
          href="https://github.com/chicago-law/police-oversight-agencies"
          className="link-with-icon"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={['fab', 'github']} />
          View source code on Github
        </a>
      </li>
      <li>
        <p>&copy; {new Date().getFullYear()} Sharon R. Fairley</p>
      </li>
    </ul>
  </Container>
)

export default SiteFooter
