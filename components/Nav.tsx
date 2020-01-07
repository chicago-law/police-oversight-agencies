import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { IconPrefix, IconName } from '@fortawesome/pro-solid-svg-icons'
import { theme } from '../lib/theme'
import ActiveLink from './ActiveLink'

const Container = styled('nav')`
  margin: 0 0 7em 0;
  .explore {
    display: block;
    text-transform: uppercase;
    font-family: ${props => props.theme.proximaNova};
    margin-bottom: 1em;
    font-size: ${props => props.theme.ms(1)};
    text-align: center;
    opacity: 0.5;
    letter-spacing: 3px;
  }
  ul {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 33.3% 33.3% 33.3%;
    grid-template-columns: 33.3% 33.3% 33.3%;
    max-width: 62em;
    margin: auto;
    @media (max-width: ${props => props.theme.bP.dSm}) {
      display: block;
    }
    /* IE11, how I loathe thee */
    >li:nth-child(1) {
      -ms-grid-column: 1;
      grid-column: 1;
    }
    >li:nth-child(2) {
      -ms-grid-column: 2;
      grid-column: 2;
    }
    >li:nth-child(3) {
      -ms-grid-column: 3;
      grid-column: 3;
    }
  }
  li {
    position: relative;
    list-style-type: none;
    margin: 0 1em;
    @media (max-width: ${props => props.theme.bP.dSm}) {
      margin: 1em 0;
    }
    a {
      display: block;
      height: 100%;
      padding: 1em 1.5em 2em 1.5em;
      border: 3px solid transparent;
      color: white;
      background: rgba(255, 255, 255, 0.02);
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      @media (max-width: ${props => props.theme.bP.mR}) {
        padding: 0.5em 0.75em;
      }
    }
    a.active {
      background: ${props => props.theme.darkRed};
    }
    .page-name {
      display: flex;
      align-items: center;
      h2 {
        display: inline-block;
        font-size: ${props => props.theme.ms(3)};
        @media (max-width: ${props => props.theme.bP.mR}) {
          font-size: ${props => props.theme.ms(2)};
        }
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

const Nav = () => {
  const navRef = useRef<HTMLElement | null>(null)

  function scrollToNav() {
    const nav = navRef.current
    if (nav) {
      nav.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  function makeNavItem(
    title: string,
    href: string,
    icon: [IconPrefix, IconName],
    explanation: string,
  ) {
    return (
      <li>
        <ActiveLink href={`/${href}`} scroll={false}>
          <a onClick={scrollToNav} onKeyDown={scrollToNav} role="link" tabIndex={0}>
            <div className="page-name">
              <FontAwesomeIcon icon={icon} />
              <h2>{title}</h2>
            </div>
            <p className="explanation">{explanation}</p>
          </a>
        </ActiveLink>
      </li>
    )
  }

  return (
    <Container>
      <span className="explore" ref={navRef}>Explore: </span>
      <ul>
        {makeNavItem(
          'Cities',
          'cities',
          ['fad', 'map-marked-alt'],
          'Interactive map showing the civilian oversight agencies by city and state.',
        )}
        {makeNavItem(
          'Agencies',
          'agencies',
          ['fad', 'list-ol'],
          'Searchable and sortable list of all the oversight agencies with detailed information.',
        )}
        {makeNavItem(
          'Functions',
          'functions',
          ['fad', 'gavel'],
          'Information about the prevalence and classification of the various forms of oversight.',
        )}
      </ul>
    </Container>
  )
}

export default Nav
