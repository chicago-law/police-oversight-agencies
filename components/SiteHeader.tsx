import styled from 'styled-components'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import C from '../lib/constants'

const Container = styled('header')`
  margin: 4em auto 0 auto;
  padding: 0 1em;
  h1 {
    font-size: ${props => props.theme.ms(5)};
    text-align: center;
    margin: 0 auto 0.65em auto;
    max-width: 13em;
    color: white;
    @media (max-width: ${props => props.theme.bP.mR}) {
      font-size: ${props => props.theme.ms(4)};
    }
  }
  h5 {
    text-align: center;
    margin: 0 auto 3.5em auto;
    max-width: 35em;
  }
  .intro-container {
    margin: 0 auto 4em auto;
    padding: 0 2em 0 2em;
    max-width: 45em;
    p {
      margin-bottom: 1em;
      button {
        margin-left: 0.5em;
      }
    }
    button {
      color: ${props => props.theme.red};
      font-family: ${props => props.theme.proximaNova};
      font-weight: bold;
      font-size: ${props => props.theme.ms(-1)};
      svg {
        margin-left: 0.5em;
      }
    }
  }
  .article-link {
    margin-top: 1em;
    svg {
      margin-left: 0.5em;
    }
  }
`

const SiteHeader = () => {
  const [more, setMore] = useState(false)

  return (
    <Container>
      <Link href="/">
        <a>
          <h1>Police Oversight Agencies in 100 Largest U.S. Cities</h1>
        </a>
      </Link>
      <h5>By Sharon R. Fairley</h5>
      <div className="intro-container">
        <p>
          This site reports on an internet survey of the government bodies responsible for civilian oversight of municipal law enforcement entities in the top 100 U.S. jurisdictions based on population. The survey is an attempt to identify the entities and document the forms of civilian oversight in each city.
          {!more && (
            <button type="button" onClick={() => setMore(true)}>
              More
              <FontAwesomeIcon icon={['far', 'angle-down']} />
            </button>
          )}
        </p>
        <CSSTransition
          mountOnEnter
          in={more}
          classNames={C.SMOOTH_SLIDE_DOWN}
          timeout={300}
          unmountOnExit
        >
          <div>
            <p>
              In addition to documenting the existence and functions of the entities in each city, the survey, which is based on internet available information, was also conducted to assess the prevalence of the various forms of civilian oversight across the largest U.S. cities.  Data-gathering was conducted from January through August 2019. Based on online information, the survey identifies each civilian oversight agency as providing one or more of the following seven civilian oversight functions: <strong>Investigative, Audit, Review, Adjudicative, Advisory, Supervisory,</strong> and <strong>Appeals</strong>. The information on each agency has been compiled to shed light on the prevalence of the various forms of civilian oversight of policing that the largest U.S. cities employ.
            </p>
            <p>
              The results show that a majority of the top 100 U.S. jurisdictions employ at least one form of civilian oversight of police, and that many jurisdictions have developed more complex, multi-functional systems as dozens of municipalities either started up or enhanced the powers of existing civilian oversight systems in the preceding five years.
            </p>
            <div>
              <button type="button" onClick={() => setMore(false)}>
                Less
                <FontAwesomeIcon icon={['far', 'angle-up']} />
              </button>
            </div>
          </div>
        </CSSTransition>
        <div className="article-link">
          <a href="#">
            Read the full report here
            <FontAwesomeIcon icon={['fas', 'external-link-square-alt']} />
          </a>
        </div>
      </div>
    </Container>
  )
}

export default SiteHeader
