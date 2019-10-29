import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import stateAbbr from '../lib/stateAbbr'
import TextButton from './TextButton'
import { AppState } from '../store'
import { roles } from '../lib/roles'
import C from '../lib/constants'

const Container = styled('li')`
  display: flex;
  margin-bottom: 3em;
  .population {
    position: relative;
    top: 12px;
    flex: 0 0 5.9em; /* Fixed width so we can position the search icon in line with it */
    padding-right: 1.25em;
    text-align: right;
    font-size: ${props => props.theme.ms(-1)};
  }
  h2 {
    margin: 0 0 0.2em 0;
  }
  h4 {
    text-decoration: underline;
  }
  p {
    margin: 0;
    &.agency {
      strong {
        text-transform: capitalize;
      }
      &.none {
        opacity: 0.5;
      }
    }
  }
  .agency-detail {
    margin-top: 2em;
  }
  .text-button {
    margin-top: 0.5em;
    .fa-angle-down, .fa-angle-up {
      font-size: ${props => props.theme.ms(-1)};
    }
  }
`

interface OwnProps {
  cityId: string;
}

const CityListItem = ({ cityId }: OwnProps) => {
  const [expanded, setExpanded] = useState(false)

  const city = useSelector(({ cities }: AppState) => Object.values(cities)
    .find(city => city.id === cityId))
  const agencies = useSelector(({ agencies }: AppState) => Object.values(agencies)
    .filter(agency => city && city.id === agency.city_id))

  function getAgencies(role: roles) {
    return agencies
      .filter(agency => !!agency[role])
      .map(agency => agency.name)
      .join(', ')
  }

  // Put the agencies into an object with their roles computed so we don't
  // need to do the operation over and over again.
  const agenciesByRole: {
    [key in roles]: string;
  } = useMemo(() => ({
    [roles.investigative]: getAgencies(roles.investigative),
    [roles.review]: getAgencies(roles.review),
    [roles.audit]: getAgencies(roles.audit),
    [roles.adjudicative]: getAgencies(roles.adjudicative),
    [roles.appeals]: getAgencies(roles.appeals),
    [roles.supervisory]: getAgencies(roles.supervisory),
    [roles.advisory]: getAgencies(roles.advisory),
  }), [agencies])

  const noAgencies = useMemo(() => !Object.values(agenciesByRole).some(agencyNames => agencyNames), [agencies])

  if (!city) {
    return <div />
  }

  return (
    <Container>
      <span className="population">{city.population.toLocaleString()}</span>
      <div>
        <h2>{city.name}, {stateAbbr(city.state)}</h2>
        {noAgencies && (
          <p style={{ opacity: 0.5 }}>None</p>
        )}
        {!noAgencies && (
          <>
            {Object.keys(agenciesByRole).map((role) => (
              <p key={role} className={agenciesByRole[role as roles].length ? 'agency ' : 'agency none'}>
                <strong>{role.toLowerCase()}: </strong>
                {agenciesByRole[role as roles].length ? agenciesByRole[role as roles] : 'None'}
              </p>
            ))}
            <CSSTransition
              mountOnEnter
              in={expanded}
              timeout={350}
              classNames={C.SMOOTH_SLIDE_DOWN}
              unmountOnExit
            >
              <>
                {agencies.map(agency => (
                  <div className="agency-detail" key={agency.id}>
                    <h4>{agency.name}</h4>
                    <p><strong>Est: </strong>{agency.established_year}</p>
                    {agency.amended_year && (
                      <p><strong>Amended: </strong>{agency.amended_year}</p>
                    )}
                    <p><strong>Primary Role: </strong>{agency.primary_role}</p>
                    <p><strong>Description: </strong>{agency.description}</p>
                  </div>
                ))}
              </>
            </CSSTransition>
            {!expanded
              ? (
                <TextButton
                  text="Details"
                  onClick={() => setExpanded(true)}
                  iconAfter={['far', 'angle-down']}
                />
              ) : (
                <TextButton
                  text="Hide"
                  onClick={() => setExpanded(false)}
                  iconAfter={['far', 'angle-up']}
                />
              )}
          </>
        )}
      </div>
    </Container>
  )
}

export default CityListItem
