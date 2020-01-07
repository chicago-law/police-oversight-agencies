import styled from 'styled-components'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NextPage, NextPageContext } from 'next'
import { Store } from 'redux'
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
import animations from '../lib/animations'

const Container = styled('div')`
  position: relative;
  ${animations.fadeSlideUp(1200)};
  .scrolling-container {
    overflow-x: auto;
  }
  .table {
    min-width: 60em;
    min-height: 15em;
    .columned-row {
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: 1fr 8em 4em 6em 8em 5em 3em 12em;
      grid-template-columns: 1fr 8em 4em 6em 8em 5em 3em 12em;
      >div {
        padding: 0.5em;
      }
      /* IE11, how I loathe thee */
      >div:nth-child(1) {
        -ms-grid-column: 1;
        grid-column: 1;
      }
      >div:nth-child(2) {
        -ms-grid-column: 2;
        grid-column: 2;
      }
      >div:nth-child(3) {
        -ms-grid-column: 3;
        grid-column: 3;
      }
      >div:nth-child(4) {
        -ms-grid-column: 4;
        grid-column: 4;
      }
      >div:nth-child(5) {
        -ms-grid-column: 5;
        grid-column: 5;
      }
      >div:nth-child(6) {
        -ms-grid-column: 6;
        grid-column: 6;
      }
      >div:nth-child(7) {
        -ms-grid-column: 7;
        grid-column: 7;
      }
      >div:nth-child(8) {
        -ms-grid-column: 8;
        grid-column: 8;
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

const Agencies: NextPage = () => {
  const [query, setQuery] = useState('')
  const [reqRoles, setReqRoles] = useState<roleColumns[]>([])
  const [sort, setSort] = useState<[AgencySortDimensions, 'asc' | 'desc']>(['name', 'asc'])

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

Agencies.getInitialProps = async ({ store }: NextPageContext & { store: Store }) => {
  await Promise.all([
    store.dispatch(fetchCities() as any),
    store.dispatch(fetchAgencies() as any),
  ])
  return store
}

export default Agencies
