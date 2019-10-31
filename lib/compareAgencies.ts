import { Agency } from '../store/agencies/types'
import { Cities, City } from '../store/cities/types'
import { roleColumns } from './roleColumns'
import compareWithNulls from './compareWithNulls'

export type AgencySortDimensions =
  | 'name'
  | 'city'
  | 'population'
  | 'state'
  | 'primary_role'
  | 'established_year'
  | 'amended_year'
  | 'role_count'

export const compareAgencies = (
  a: Agency,
  b: Agency,
  dimension: AgencySortDimensions,
  direction: 'asc' | 'desc',
  cities: Cities,
) => {
  const reversed = direction === 'desc'

  // First try to sort by agency properties.
  if (dimension === 'name'
    || dimension === 'primary_role'
    || dimension === 'established_year'
    || dimension === 'amended_year'
  ) {
    const valueA = a[dimension as keyof Agency]
    const valueB = b[dimension as keyof Agency]

    return compareWithNulls(valueA, valueB, reversed)
  }

  // Next, try to sort by the agency's city properties.
  // Every agency has a city by definition, but we'll check just in case...
  const cityA = Object.values(cities).find(city => city.id === a.city_id)
  const cityB = Object.values(cities).find(city => city.id === b.city_id)
  if (cityA && cityB && (
    dimension === 'city'
    || dimension === 'state'
    || dimension === 'population'
  )) {
    // When looking up on the cities table, what we want is called "name".
    let d: typeof dimension | 'name' = dimension
    if (dimension === 'city') d = 'name'
    const valueA = cityA[d as keyof City]
    const valueB = cityB[d as keyof City]

    return compareWithNulls(valueA, valueB, reversed)
  }

  // Test any other dimensions that aren't simply properties of agencies or cities.
  if (dimension === 'role_count') {
    let valueA = 0
    let valueB = 0
    Object.keys(roleColumns).forEach(role => {
      if (role in a && a[role as keyof Agency]) valueA += 1
    })
    Object.keys(roleColumns).forEach(role => {
      if (role in b && b[role as keyof Agency]) valueB += 1
    })

    return compareWithNulls(valueA, valueB, reversed)
  }

  // All else fails, leave 'em be.
  return 0
}
