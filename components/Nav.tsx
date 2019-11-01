import styled from 'styled-components'
import { theme } from '../lib/theme'
import ActiveLink from './ActiveLink'

const Container = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7em 0 8em 0;
  @media (max-width: ${props => props.theme.bP.mR}) {
    flex-direction: column;
    align-items: stretch;
    margin: 4em 0;
    h5 {
      margin-bottom: 2em;
      text-align: center;
    }
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${props => props.theme.bP.mR}) {
      justify-content: space-around;
    }
    @media (max-width: ${props => props.theme.bP.mS}) {
      flex-direction: column;
    }
  }
  li {
    list-style-type: none;
    margin: 0 1.5em;
    @media (max-width: ${props => props.theme.bP.mR}) {
      margin: 0;
    }
    @media (max-width: ${props => props.theme.bP.mS}) {
      margin: 0 0 1em 0;
    }
  }
  a {
    position: relative;
    font-size: ${theme.ms(2)};
    font-family: ${theme.proximaNova};
    text-transform: uppercase;
    font-weight: normal;
    color: white;
    opacity: 0.75;
    transition: opacity 200ms ease-out;
  }
  a:hover {
    opacity: 1;
  }
  a:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.5em;
    height: 6px;
    width: 100%;
    transform: scale(0);
    background: ${theme.blue()};
    transition: transform 200ms ease-out;
  }
  a.active {
    opacity: 1;
    font-weight: bold;
  }
  a.active:after {
    transform: scale(1);
  }
`

const Nav = () => (
  <Container>
    <h5>Explore: </h5>
    <ul>
      <li>
        <ActiveLink href="/cities" scroll={false}>
          <a>Cities</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink href="/agencies" scroll={false}>
          <a>Agencies</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink href="/roles" scroll={false}>
          <a>Roles</a>
        </ActiveLink>
      </li>
    </ul>
  </Container>
)

export default Nav
