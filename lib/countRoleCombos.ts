import { roleColumns } from './roleColumns'
import { AgenciesStates } from '../store/agencies/types'
import { CitiesState } from '../store/cities/types'

function countRoleCombos(
  roleA: roleColumns,
  roleB: roleColumns,
  agencies: AgenciesStates,
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

export default countRoleCombos
