import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { AppState } from '../store'
import { roles } from '../lib/roles'
import countRoleCombos from '../lib/countRoleCombos'

const Container = styled('div')`
  position: relative;
  table {
    width: 100%;
    border-collapse: collapse;
    font-weight: bold;
  }
  td {
    width: 12.5%;
    text-align: center;
    padding: 0.25em 1.5em;
    border: 1px solid ${props => props.theme.lightGray};
    &.label {
      background: ${props => props.theme.darkGray};
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-2)};
      color: ${props => props.theme.lightGray};
      text-transform: capitalize;
      &.top-row {
        padding: 0.75em 1.5em;
      }
    }
    &.tally:hover, &.highlight {
        background: ${props => props.theme.red};
        color: white;
      }
    &.single-function {
      background: ${props => props.theme.blue(1)};
      color: ${props => props.theme.black};
    }
    &.empty {
      border: none;
      background: none;
    }
  }
  .legend {
    margin-top: 2em;
    >div {
      display: flex;
      margin-bottom: 1em;
    }
    .swatch {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      height: 2em;
      width: 5em;
      margin-right: 1em;
      border: 1px solid ${props => props.theme.lightGray};
      font-weight: bold;
      &.single-function {
        background: ${props => props.theme.blue()};
        color: ${props => props.theme.black};
        border: 0;
      }
    }
    p {
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-1)};
    }
  }
  .top-combos {
    margin-top: 4em;
    p {
      text-transform: capitalize;
      margin-bottom: 0.75em;
    }
  }
`

interface Combo {
  roles: [roles, roles];
  tally: number;
}

const RoleCombinations = () => {
  const agencies = useSelector((state: AppState) => state.agencies)
  const cities = useSelector((state: AppState) => state.cities)
  const [highlightedRoles, setHighlightedRoles] = useState<[number | null, number | null]>([null, null])

  function comboLookup(roleA: roles, roleB: roles, comboLibrary: Combo[]) {
    return comboLibrary.find(combo => (combo.roles.length === 2
      && ((combo.roles[0] === roleA && combo.roles[1] === roleB)
      || (combo.roles[0] === roleB && combo.roles[1] === roleA))
    ))
  }

  const comboLibrary = useMemo(() => {
    const library: Combo[] = []
    Object.values(roles).forEach(roleA => {
      Object.values(roles).forEach((roleB) => {
        if (!comboLookup(roleA, roleB, library)) {
          library.push({
            roles: [roleA, roleB] as [roles, roles],
            tally: countRoleCombos(roleA, roleB, agencies, cities),
          })
        }
      })
    })
    return library.sort((a, b) => (a.tally > b.tally ? -1 : 1))
  }, [cities, agencies])

  function getComboTally(roleA: roles, roleB: roles, comboLibrary: Combo[]) {
    const combo = comboLookup(roleA, roleB, comboLibrary)
    return combo ? combo.tally : 0
  }

  const tableRows = useMemo(() => {
    const rows: React.ReactNode[] = []
    rows.push(
      <tr key="row-heading">
        <td className="label empty" />
        {Object.values(roles).map((role, i) => (
          <td
            key={`column-${role}`}
            className={`label top-row ${highlightedRoles[1] === i ? 'highlight' : ''}`}
          >
            {role}
          </td>
        ))}
      </tr>,
    )
    Object.values(roles).forEach((rRole, r) => {
      rows.push(
        <tr key={`row-${rRole}`}>
          <td className={`label ${highlightedRoles[0] === r ? 'highlight' : ''}`}>
            {rRole}
          </td>
          {Object.values(roles).map((cRole, c) => {
            if (c <= r) {
              return (
                <td
                  key={`${rRole}-${cRole}`}
                  className={`tally ${c === r ? 'single-function' : ''}`}
                  onMouseEnter={() => setHighlightedRoles([r, c])}
                  onMouseLeave={() => setHighlightedRoles([null, null])}
                >
                  {getComboTally(rRole, cRole, comboLibrary)}
                </td>
              )
            }
            return <td key={`${rRole}-${cRole}`} className="empty" />
          })}
        </tr>,
      )
    })
    return rows
  }, [agencies, cities, highlightedRoles])

  if (!Object.keys(agencies).length || !Object.keys(cities).length) {
    return (
      <Container>
        <SectionHeading heading="Role Combinations">
          Which combinations of oversight roles within a single city are most prevalent?
        </SectionHeading>
        Loading...
      </Container>
    )
  }

  return (
    <Container>
      <SectionHeading heading="Role Combinations">
        Which combinations of oversight roles within a single city are most prevalent?
      </SectionHeading>
      <div className="chart">
        <table>
          <tbody>
            {tableRows.map(row => row)}
          </tbody>
        </table>
        <div className="legend">
          <div>
            <div className="swatch"><span>#</span></div>
            <p>Indicates number of cities that employ the combinations of oversight functions as specified along the horizontal and vertical axes.</p>
          </div>
          <div>
            <div className="swatch single-function"><span>#</span></div>
            <p>Indicates number of cities that employ only this sole oversight function.</p>
          </div>
        </div>
      </div>
      <div className="top-combos">
        {comboLibrary.slice(0, 5).map(combo => (
          combo.roles.length === 2 && (
            combo.roles[0] !== combo.roles[1]
              ? (
                <p key={combo.roles.join('')}><strong>{combo.roles.join(' + ')}:</strong> {combo.tally}</p>
              ) : (
                <p key={combo.roles.join('')}><strong>{combo.roles[0]} (as Sole Oversight Function):</strong> {combo.tally}</p>
              )
          )
        ))}
      </div>
    </Container>
  )
}

export default RoleCombinations
