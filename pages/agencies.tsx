import styled from 'styled-components'
import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AgencyFilters from '../components/AgencyFilters'
import { AppState } from '../store'
import { fetchCities } from '../store/cities/actions'
import { fetchAgencies } from '../store/agencies/actions'
import stateAbbr from '../lib/stateAbbr'
import { roleColumns } from '../lib/roleColumns'
import { compareAgencies, AgencySortDimensions } from '../lib/compareAgencies'
import AgencyHeaderRow from '../components/AgencyHeaderRow'
import AgencyTableRow from '../components/AgencyTableRow'
import Loading from '../components/Loading'

const Container = styled('div')`
  position: relative;
  .scrolling-container {
    width: 100%;
    overflow-x: auto;
  }
  .table {
    min-width: 62em;
    min-height: 15em;
    .columned-row {
      display: grid;
      grid-template-columns: 1fr 8em 4em 6em 8em 5em 5em 3em 12em;
      >div {
        padding: 0.5em;
      }
      &.header {
        border-bottom: 1px solid ${props => props.theme.darkGray};
        padding-right: 2.5em;
      }
    }
  }
  .no-results {
    margin-top: 1em;
    font-style: italic;
  }
`

const Agencies = () => {
  const [query, setQuery] = useState('')
  const [reqRoles, setReqRoles] = useState<roleColumns[]>([])
  const [sort, setSort] = useState<[AgencySortDimensions, 'asc' | 'desc']>(['name', 'asc'])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchAgencies())
  }, [])

  const agencies = useSelector(({ agencies }: AppState) => agencies)
  const cities = useSelector(({ cities }: AppState) => cities)
  const dataReady = useMemo(() => {
    return Object.keys(agencies).length !== 0 && Object.keys(cities).length !== 0
  }, [agencies, cities])

  const sortedAgencies = useMemo(() => {
    return Object.values(agencies).sort((a, b) => {
      const [dimension, direction] = sort
      return compareAgencies(a, b, dimension, direction, cities)
    })
  }, [agencies, sort])

  const filteredAgencies = sortedAgencies.filter(agency => {
    let satisfiesSearch = true
    let satisfiesRoles = true
    if (query) {
      const city = Object.values(cities).find(city => city.id === agency.city_id)
      const searchable = `
        ${agency.name}
        ${city && city.name} ${city && city.state}
        ${city && city.name} ${city && stateAbbr(city.state)}
        ${city && city.name}, ${city && city.state}
        ${city && city.name}, ${city && stateAbbr(city.state)}
      `
      satisfiesSearch = searchable.toUpperCase().includes(query.toUpperCase())
    }
    if (reqRoles.length) {
      satisfiesRoles = reqRoles.some(role => agency[role])
    }
    return satisfiesSearch && satisfiesRoles
  })

  return (
    <Container>
      <AgencyFilters
        query={query}
        setQuery={setQuery}
        reqRoles={reqRoles}
        setReqRoles={setReqRoles}
      />
      <div className="scrolling-container">
        <div className="table">
          <AgencyHeaderRow sort={sort} setSort={setSort} />
          {!dataReady && (
            <Loading />
          )}
          {filteredAgencies.map(agency => (
            <AgencyTableRow key={agency.id} agencyId={agency.id} />
          ))}
          {filteredAgencies.length === 0 && dataReady && (
            <p className="no-results">No agencies found with the current filter criteria.</p>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Agencies
