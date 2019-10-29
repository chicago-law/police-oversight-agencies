import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { roles } from '../lib/roles'
import RoleFilterPopup from './RoleFilterPopup'

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
  .search {
    .fa-search {
      position: relative;
      top: 2px;
      margin-right: 0.5em;
      color: ${props => props.theme.blue()};
    }
    input.active {
      border-color: white;
    }
  }
  .roles {
    position: relative;
    >button {
      display: flex;
      align-items: center;
      padding: 0.5em;
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-1)};
      font-weight: bold;
      border-radius: 4px;
      text-transform: capitalize;
      color: ${props => props.theme.blue()};
      transition: color 100ms ease-out, background-color 100ms ease-out;
      svg {
        margin-left: 0.5em;
      }
      &:hover {
        color: ${props => props.theme.red};
        background: ${props => props.theme.darkGray};
      }
    }
  }
`

interface OwnProps {
  query: string;
  setQuery: (text: string) => void;
  reqRoles: roles[];
  setReqRoles: (reqs: roles[]) => void;
}

const AgencyFilters = ({
  query,
  setQuery,
  reqRoles,
  setReqRoles,
}: OwnProps) => {
  const [displayPopup, setDisplayPopup] = useState(false)

  function handleRoleFilterClick() {
    setDisplayPopup(prev => !prev)
  }

  return (
    <Container>
      <div className="search">
        <FontAwesomeIcon icon={['fas', 'search']} />
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          className={query.length ? 'active' : ''}
        />
      </div>
      <div className="roles">
        <button type="button" onClick={handleRoleFilterClick}>
          Roles: {reqRoles.length ? reqRoles.join(', ') : 'Any'}
          <FontAwesomeIcon icon={['fas', 'cog']} />
        </button>
        {displayPopup && (
          <RoleFilterPopup
            setDisplayPopup={setDisplayPopup}
            reqRoles={reqRoles}
            setReqRoles={setReqRoles}
          />
        )}
      </div>
    </Container>
  )
}

export default AgencyFilters
