import styled from 'styled-components'
import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AgencySortDimensions } from '../lib/compareAgencies'

interface StyleProps {
  active: boolean
  direction: 'asc' | 'desc'
  sortable: boolean
}

const HeaderCell = styled('div')<StyleProps>`
  button {
    display: flex;
    align-items: flex-start;
    text-align: left;
    color: ${props => props.theme.middleGray};
    font-family: ${props => props.theme.proximaNova};
    font-size: ${props => props.theme.ms(-2)};
    font-weight: bold;
    cursor: ${props => (props.sortable ? 'pointer' : 'default')};
    transition: color 100ms ease-out;
    ${props =>
      props.sortable &&
      `
      &:hover {
        color: ${props.theme.red};
      }
    `}
  }
  .sort-icon {
    flex: 0 0 auto;
    margin-left: 0.5em;
    opacity: ${props => (props.active ? 1 : 0)};
    transform-origin: center;
    transition: transform 100ms ease-out, opacity 100ms ease-out;
    ${props =>
      props.direction === 'desc' &&
      `
      transform: rotate(180deg);
    `}
  }
`

interface OwnProps {
  sort: [AgencySortDimensions, 'asc' | 'desc']
  setSort?: (sort: [AgencySortDimensions, 'asc' | 'desc']) => void
}

const AgencyHeaderRow = ({ sort, setSort }: OwnProps) => {
  const [activeDimension, direction] = sort

  function makeCell(label: string, dimension?: AgencySortDimensions) {
    return (
      <HeaderCell
        active={activeDimension === dimension}
        direction={direction}
        sortable={!!dimension}
      >
        <button
          type="button"
          onClick={() => {
            if (dimension && sort && setSort) {
              // If dimension is already active, flip the direction.
              if (dimension === activeDimension) {
                setSort([dimension, direction === 'asc' ? 'desc' : 'asc'])
              } else {
                setSort([dimension, 'asc'])
              }
            }
          }}
        >
          {label}
          {dimension && (
            <FontAwesomeIcon icon={['fas', 'caret-up']} className="sort-icon" />
          )}
        </button>
      </HeaderCell>
    )
  }

  return (
    <div className="columned-row header">
      {makeCell('Name', 'name')}
      {makeCell('City', 'city')}
      {makeCell('State', 'state')}
      {makeCell('Population', 'population')}
      {makeCell('Primary Role', 'primary_role')}
      {makeCell('Established Year', 'year_established')}
      {makeCell('Board or Agency', 'board_agency')}
      {makeCell('Subpoena Power', 'subpoena_power')}
    </div>
  )
}

export default memo(AgencyHeaderRow)
