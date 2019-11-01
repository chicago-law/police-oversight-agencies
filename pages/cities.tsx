import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import CitiesMap from '../components/CitiesMap'
import CityListItem from '../components/CityListItem'
import { fetchCities } from '../store/cities/actions'
import { AppState } from '../store'
import CitySearch from '../components/CitySearch'
import stateAbbr from '../lib/stateAbbr'
import TextButton from '../components/TextButton'
import { theme } from '../lib/theme'
import { fetchAgencies } from '../store/agencies/actions'
import Loading from '../components/Loading'

const Container = styled('div')`
  display: flex;
  @media (max-width: ${props => props.theme.bP.dSm}) {
    flex-direction: column;
  }
  .left {
    flex: 1 1 auto;
    @media (max-width: ${props => props.theme.bP.mR}) {
      margin-bottom: 2em;
    }
  }
  .right {
    flex: 0 0 30em;
    padding-left: 1em;
    @media (max-width: ${props => props.theme.bP.dMd}) {
      flex: 0 0 25em;
    }
    @media (max-width: ${props => props.theme.bP.dSm}) {
      flex: 1 1 auto;
    }
    @media (max-width: ${props => props.theme.bP.mR}) {
      padding: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
  }
  .no-results {
    margin-left: 4.7em;
    font-style: italic;
  }
`

const Cities = () => {
  const [selectedState, setSelectedState] = useState('')
  const [query, setQuery] = useState('')
  const [cityLimit, setCityLimit] = useState(5)

  const cities = useSelector((state: AppState) => state.cities)
  const agencies = useSelector((state: AppState) => state.agencies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAgencies())
    dispatch(fetchCities())
  }, [])

  // Reset the city list limit if the state or query changes.
  useEffect(() => {
    setCityLimit(5)
  }, [selectedState, query])

  const filteredCityList = Object.values(cities).filter(city => {
    if (selectedState) {
      return city.state.toUpperCase() === selectedState.toUpperCase()
    }
    if (query) {
      const searchable = `${city.name} ${city.state} ${city.name}, ${city.state} ${city.name}, ${stateAbbr(city.state)}`
      return searchable.toUpperCase().includes(query.toUpperCase())
    }
    return true
  })

  function handleMoreCities() {
    setCityLimit(prevState => prevState + 10)
  }

  return (
    <Container>
      <div className="left">
        <SectionHeading heading="Oversight Agencies in 100 Largest Cities">
            Population data sourced from 2017 United States Census.
        </SectionHeading>
        <CitiesMap
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          setQuery={setQuery}
        />
      </div>
      <div className="right">
        <CitySearch
          query={query}
          setQuery={setQuery}
          setSelectedState={setSelectedState}
        />
        {(Object.keys(agencies).length === 0 || Object.keys(cities).length === 0) && (
          <Loading />
        )}
        {filteredCityList.length > 0 && (
          <ul>
            {filteredCityList.slice(0, cityLimit).map(city => (
              <CityListItem key={city.longitude} cityId={city.id} />
            ))}
          </ul>
        )}
        {query.length > 0 && filteredCityList.length === 0 && (
          <p className="no-results">No cities or states in this study match "{query}".</p>
        )}
        {filteredCityList.length > cityLimit && (
          <div style={{ textAlign: 'center' }}>
            <TextButton
              text="Show More Cities..."
              iconBefore={['fas', 'arrow-down']}
              onClick={handleMoreCities}
              size={theme.ms(0)}
              color={theme.black}
              bgColor="white"
            />
          </div>
        )}
      </div>
    </Container>
  )
}

// Cities.getInitialProps = async ({ store }) => {
//   return new Promise((res) => {
//     store.dispatch(fetchCities(res))
//   })
// }

export default Cities
