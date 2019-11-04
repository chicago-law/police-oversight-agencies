import { roleColumns } from './roleColumns'
import { AgenciesState, Agencies } from '../store/agencies/types'
import { CitiesState, Cities } from '../store/cities/types'

export interface Combo {
  roles: [roleColumns, roleColumns];
  tally: number;
}

export function countRoleCombosInCities(
  roleA: roleColumns,
  roleB: roleColumns,
  agencies: AgenciesState,
  cities: CitiesState,
) {
  let cityTally = 0
  // If the roles are different, then look for cities that employ both.
  if (roleA !== roleB) {
    Object.values(cities).forEach(city => {
      const cityAgencies = Object.values(agencies)
        .filter(agency => agency.city_id === city.id)
      const hasA = cityAgencies.some(agency => agency[roleA])
      const hasB = cityAgencies.some(agency => agency[roleB])

      if (hasA && hasB) cityTally += 1
    })
  }
  // If the roles are the same, then look for cities that employ only that
  // one role.
  if (roleA === roleB) {
    Object.values(cities).forEach(city => {
      const cityAgencies = Object.values(agencies)
        .filter(agency => agency.city_id === city.id)
      const otherRoles = Object.values(roleColumns)
        .filter(role => role !== roleA)

      const hasA = cityAgencies
        .some(agency => agency[roleA])
      const hasOnlyA = cityAgencies
        .every(agency => otherRoles.every(role => !agency[role]))

      if (hasA && hasOnlyA) cityTally += 1
    })
  }

  return cityTally
}

// Returns true if two combinations are already in the combo library,
// as either [A, B] or [B, A].
export function comboLookup(roleA: roleColumns, roleB: roleColumns, comboLibrary: Combo[]) {
  return comboLibrary.find(combo => (combo.roles.length === 2
    && ((combo.roles[0] === roleA && combo.roles[1] === roleB)
    || (combo.roles[0] === roleB && combo.roles[1] === roleA))
  ))
}

// Get a tally for the passed in role combination.
export function getComboTally(roleA: roleColumns, roleB: roleColumns, comboLibrary: Combo[]) {
  const combo = comboLookup(roleA, roleB, comboLibrary)
  return combo ? combo.tally : 0
}

// Build a library of role combinations.
export function buildRoleComboLibrary(agencies: Agencies, cities: Cities) {
  const library: Combo[] = []
  Object.values(roleColumns).forEach(roleA => {
    Object.values(roleColumns).forEach((roleB) => {
      if (!comboLookup(roleA, roleB, library)) {
        library.push({
          roles: [roleA, roleB] as [roleColumns, roleColumns],
          tally: countRoleCombosInCities(roleA, roleB, agencies, cities),
        })
      }
    })
  })
  return library.sort((a, b) => (a.tally > b.tally ? -1 : 1))
}
