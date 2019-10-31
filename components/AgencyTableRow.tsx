import { useState, useMemo, KeyboardEvent } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { AppState } from '../store'
import stateAbbr from '../lib/stateAbbr'
import getAgencyRoles from '../lib/getAgencyRoles'
import formatRoleName from '../lib/formatRoleName'

const Container = styled('div')`
  position: relative;
  margin-bottom: 0.25em;
  padding-right: 2.5em;
  cursor: pointer;
  .roles {
    text-transform: capitalize;
  }
  .description {
    /* Should match the padding given to cells in the rows. */
    padding: 0.5em;
  }
  .row-arrow {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0.5em;
    right: 0.5em;
    height: 1.5em;
    width: 1.5em;
    border-radius: 100%;
    color: ${props => props.theme.red};
    opacity: 0;
    transform: rotate(0);
    transition: opacity 100ms ease-out, transform 400ms ease-out, background 100ms ease-out;
    .fa-angle-down {
      position: relative;
      left: 1px;
    }
    &:hover, &:focus {
      background: ${props => props.theme.middleGray};
      opacity: 1;
    }
  }
  &:hover, &:focus {
    background: ${props => props.theme.darkGray};
    .row-arrow {
      opacity: 1;
    }
  }
  &.open {
    background: ${props => props.theme.darkGray};
    cursor: auto;
    .row-arrow {
      opacity: 1;
      transform: rotate(180deg);
      .fa-angle-down {
        top: 0;
        left: 0;
      }
    }
  }
`

interface OwnProps {
  agencyId: number;
}

const AgencyTableRow = ({ agencyId }: OwnProps) => {
  const [open, setOpen] = useState(false)

  const agency = useSelector(({ agencies }: AppState) => Object.values(agencies).find(agency => agency.id === agencyId))
  const city = useSelector(({ cities }: AppState) => Object.values(cities).find(city => agency && agency.city_id === city.id))

  function handleRowKey(e: KeyboardEvent) {
    if (e.keyCode === 13) setOpen(true)
  }

  const agencyRoles = useMemo(() => {
    if (agency) return getAgencyRoles(agency)
    return []
  }, [agency, city])

  if (!agency || !city) return <div />

  return (
    <Container className={`${open ? 'open' : ''}`}>
      <div
        className="columned-row"
        onClick={() => setOpen(true)}
        onKeyDown={e => handleRowKey(e)}
        role="button"
        tabIndex={0}
      >
        <div><strong>{agency.name}</strong></div>
        <div>{city.name}</div>
        <div>{stateAbbr(city.state)}</div>
        <div>{city.population.toLocaleString()}</div>
        <div className="roles">{agency.primary_role}</div>
        <div>{agency.year_established}</div>
        <div>{agency.year_amended}</div>
        <div>{agencyRoles.length}</div>
        <div className="roles">{agencyRoles.map(role => formatRoleName(role)).join(', ')}</div>
      </div>

      <button
        type="button"
        className="row-arrow"
        onClick={() => setOpen(prev => !prev)}
        tabIndex={open ? 0 : -1}
      >
        <FontAwesomeIcon icon={['far', 'angle-down']} />
      </button>

      <CSSTransition
        mountOnEnter
        in={open}
        timeout={300}
        classNames="smooth-slide-down"
        unmountOnExit
      >
        <div className="description">
          <p>{agency.description}</p>
        </div>
      </CSSTransition>
    </Container>
  )
}

export default AgencyTableRow
