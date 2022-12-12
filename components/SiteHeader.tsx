import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styled from 'styled-components'


import {
  Card,
  CardBody, 
  CardImg,
  CardTitle,
  CardText, 
  CardSubtitle,
  Button,
  CardGroup,
} from 'reactstrap'






const Container = styled('header')`
  margin: 4em auto 0 auto;
  padding: 0 1em;
  @media (max-width: ${props => props.theme.bP.mR}) {
    margin-top: 2em;
  }
  @media (max-width: ${props => props.theme.bP.mS}) {
    margin-top: 1em;
    padding: 0;
  }
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
    padding: 0 2em;
    max-width: 45em;
    @media (max-width: ${props => props.theme.bP.mR}) {
      padding: 0 1em;
    }
    @media (max-width: ${props => props.theme.bP.mS}) {
      padding: 0;
    }
    p {
      margin-bottom: 1em;
      button {
        margin-left: 0.5em;
      }
    }
    button {
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-1)};
      svg {
        margin-left: 0.5em;
      }
    }
  }
  .more-description {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
    &.expanded {
      max-height: 100em;
      opacity: 1;
    }
  }
  .article-link {
    position: relative; /* makes it sit above the hidden desc text */
    margin-top: 1em;
    svg {
      margin-left: 0.5em;
    }
  }
`
const StaleDataNotice = styled('div')`
  margin: 4rem 2rem;
  background: white;
  color: black;
  padding: 1rem;
  border-radius: 15px;
`

const SiteHeader = () => {
  const [expanded, setExpanded] = useState(false)

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
          This site reports on an internet survey conducted January through
          August 2021 of the government bodies responsible for civilian
          oversight of municipal law enforcement entities in the top 100 U.S.
          jurisdictions based on population. The survey is an attempt to
          identify the entities and document the forms of civilian oversight in
          each city.
          {!expanded && (
            <button
              type="button"
              className="looks-like-link"
              onClick={() => setExpanded(true)}
            >
              More...
            </button>
          )}
        </p>

        <div className={`more-description ${expanded ? 'expanded' : ''}`}>
          <p>
            In addition to documenting the existence and functions of the
            entities in each city, the survey, which is based on information
            available on the internet at the time of data gathering, was also
            conducted to assess the prevalence of the various forms of civilian
            oversight across the largest U.S. cities. Based on online
            information, the survey identifies each civilian oversight agency as
            providing one of the following seven civilian oversight functions as
            its "Primary Function":{' '}
            <strong>
              Investigative, Audit, Review, Adjudicative, Advisory, Supervisory,
            </strong>{' '}
            and <strong>Appeals</strong>. However, it is important to note that
            many agencies provide more than one function. The information on
            each agency has been compiled to shed light on the prevalence of the
            various forms of civilian oversight of policing that the largest
            U.S. cities employ.
          </p>
          <p>
            The results show that a majority of the top 100 U.S. jurisdictions
            employ at least one form of civilian oversight of police, and that
            many jurisdictions have developed more complex, multi-functional
            systems as dozens of municipalities either started up or enhanced
            the powers of existing civilian oversight systems in the preceding
            five years.
          </p>
        </div>

        <div className="article-link">
          <a
            href="../static/Publication.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the full publication here
            <FontAwesomeIcon icon={['fas', 'external-link-square-alt']} />
          </a>
        </div>

        <StaleDataNotice>
          <p>
            <strong>Note: </strong> Thanks for checking out our website. This
            site is based on data collected in 2021 and only includes
            information on the 100 most populous U.S. cities. For information on
            civilian oversight in other cities, go to
            <a
              href="https://www.nacole.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {' '}
              NACOLE.org.
            </a>
          </p>
        </StaleDataNotice>
      </div>



      <CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This card has supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
</CardGroup>





    </Container>





















        )
}






        export default SiteHeader

