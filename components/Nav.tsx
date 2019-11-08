import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { theme } from '../lib/theme'
import ActiveLink from './ActiveLink'

const Container = styled('nav')`
  margin: 0 0 7em 0;
  @media (max-width: ${props => props.theme.bP.mR}) {
    flex-direction: column;
    align-items: stretch;
    margin: 4em 0;
  }
  .explore {
    display: block;
    text-transform: uppercase;
    font-family: ${props => props.theme.proximaNova};
    margin-bottom: 2em;
    font-size: ${props => props.theme.ms(1)};
    text-align: center;
    opacity: 0.5;
    letter-spacing: 3px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    @media (max-width: ${props => props.theme.bP.mR}) {
      justify-content: space-around;
    }
    @media (max-width: ${props => props.theme.bP.mS}) {
      flex-direction: column;
    }
  }
  li {
    position: relative;
    list-style-type: none;
    margin: 0 1em;
    @media (max-width: ${props => props.theme.bP.mR}) {
      margin: 0;
    }
    @media (max-width: ${props => props.theme.bP.mS}) {
      margin: 0 0 1em 0;
    }
    a {
      display: block;
      height: 100%;
      padding: 1em 1.5em 2em 1.5em;
      background: rgba(255, 255, 255, 0.05);
      border: 3px solid transparent;
      color: white;
    }
    a.active {
      background: rgba(255, 255, 255, 0.1);
      border: 3px solid ${props => props.theme.blue()};
    }
    .page-name {
      display: flex;
      align-items: center;
      h2 {
        display: inline-block;
        font-size: ${props => props.theme.ms(3)};
      }
      svg {
        margin-right: 0.75em;
        font-size: ${theme.ms(2)};
        .fa-primary {
          fill: ${props => props.theme.red};
        }
        .fa-secondary {
          fill: ${props => props.theme.blue()};
          opacity: 1;
        }
      }
      span {
        font-size: ${theme.ms(2)};
      }
    }
    .explanation {
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-1)};
      font-weight: normal;
    }
  }
`

const CompactNav = () => {
  return (
    <Container>
      <span className="explore">Explore: </span>
      <ul>
        <li>
          <ActiveLink href="/cities" scroll={false}>
            <a>
              <div className="page-name">
                <FontAwesomeIcon icon={['fad', 'map-marked-alt']} />
                <h2>Cities</h2>
              </div>
              <p className="explanation">
                Interactive map showing the civilian oversight agencies by city and state.
              </p>
            </a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/agencies" scroll={false}>
            <a>
              <div className="page-name">
                <FontAwesomeIcon icon={['fad', 'list-ol']} />
                <h2>Agencies</h2>
              </div>
              <p className="explanation">
                Searchable and sortable list of all the oversight agencies with detailed information.
              </p>
            </a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/functions" scroll={false}>
            <a>
              <div className="page-name">
                <FontAwesomeIcon icon={['fad', 'gavel']} />
                <h2>Functions</h2>
              </div>
              <p className="explanation">
                Information about the prevalence and classification of the various forms of oversight.
              </p>
            </a>
          </ActiveLink>
        </li>
      </ul>
    </Container>
  )
}

export default CompactNav
