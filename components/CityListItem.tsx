import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import stateAbbr from '../lib/stateAbbr'
import TextButton from './TextButton'
import { AppState } from '../store'
import { roleColumns } from '../lib/roleColumns'
import C from '../lib/constants'
import formatRoleName from '../lib/formatRoleName'

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
  cityId: number;
}

const CityListItem = ({ cityId }: OwnProps) => {
  const [expanded, setExpanded] = useState(false)

  const city = useSelector(({ cities }: AppState) => Object.values(cities)
    .find(city => city.id === cityId))
  const agencies = useSelector(({ agencies }: AppState) => Object.values(agencies)
    .filter(agency => city && city.id === agency.city_id))

  function getAgencies(role: roleColumns) {
    return agencies
      .filter(agency => !!agency[role])
      .map(agency => agency.name)
      .join(', ')
  }

  // Put the agencies into an object with their roles computed so we don't
  // need to do the operation over and over again.
  const agenciesByRole: {
    [key in roleColumns]: string;
  } = useMemo(() => ({
    [roleColumns.investigative]: getAgencies(roleColumns.investigative),
    [roleColumns.review]: getAgencies(roleColumns.review),
    [roleColumns.audit]: getAgencies(roleColumns.audit),
    [roleColumns.adjudicative]: getAgencies(roleColumns.adjudicative),
    [roleColumns.appeals]: getAgencies(roleColumns.appeals),
    [roleColumns.supervisory]: getAgencies(roleColumns.supervisory),
    [roleColumns.advisory]: getAgencies(roleColumns.advisory),
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
            {Object.entries(agenciesByRole).map(([role, agencies]) => (
              <p key={role} className={agencies.length ? 'agency ' : 'agency none'}>
                <strong>{formatRoleName(role as roleColumns)}: </strong>
                {agencies.length ? agencies : 'None'}
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
                  <div key={agency.id} className="agency-detail">
                    <h4>{agency.name}</h4>
                    <p><strong>Est: </strong>{agency.year_established !== null ? agency.year_established : '(unknown)' }</p>
                    {agency.year_amended && (
                      <p><strong>Amended: </strong>{agency.year_amended}</p>
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
