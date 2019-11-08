import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { useEffect, useRef, useMemo } from 'react'
import { Feature } from 'geojson'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { theme } from '../lib/theme'
import { AppState } from '../store'
import getAgencyRoles from '../lib/getAgencyRoles'

const Container = styled('div')`
  margin: 2em 0;
  .state {
    stroke: white;
    stroke-width: 1px;
    fill: ${props => props.theme.black};
    &.has-city {
      cursor: pointer;
      opacity: 1;
      fill: #283046;
      &:hover {
        fill: white;
      }
    }
    &.selected {
      fill: ${props => props.theme.red} !important;
      stroke-width: 4px;
    }
  }
  .city {
    pointer-events: none;
  }
  .legend {
    margin-top: 2em;
    .legend-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.75em;
    }
    span {
      font-weight: bold;
      font-size: ${props => props.theme.ms(1)};
    }
    .size-ex, .color-ex {
      width: 4em;
      margin: 0 0.5em;
    }
    .size-ex {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      >div {
        display: inline-block;
        background: ${props => props.theme.darkBlue};
        border-radius: 100%;
        &.sm {
          height: 0.5em;
          width: 0.5em;
        }
        &.md {
          height: 0.85em;
          width: 0.85em;
        }
        &.lg {
          height: 1.25em;
          width: 1.25em;
        }
      }
    }
    .color-ex {
      height: 0.5em;
      border-radius: 2px;
      background: ${props => `linear-gradient(to right, ${props.theme.darkBlue}, ${props.theme.lightBlue})`}
    }
    p {
      font-family: ${props => props.theme.proximaNova};
      font-size: ${props => props.theme.ms(-1)};
      margin-left: 1em;
    }
  }
`

interface FeatureWithFeatures extends Feature {
  features?: Feature[];
}

interface OwnProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
  setQuery: (value: string) => void;
}

const CitiesMap = ({
  selectedState,
  setSelectedState,
  setQuery,
}: OwnProps) => {
  const cities = useSelector((state: AppState) => state.cities)
  const agencies = useSelector((state: AppState) => state.agencies)

  const svgRef = useRef<SVGSVGElement>(null)
  const width = 900
  const height = 500
  const projection = useMemo(() => d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]), [])
  const path = useMemo(() => d3.geoPath().projection(projection), [])
  const sizeScale = useMemo(() => d3.scaleSqrt()
    .domain([200000, 10000000])
    .range([3, 20]), [])
  const colorScale = useMemo(() => d3.scaleLinear<string>()
    .domain([0, 7])
    .range([theme.darkBlue, theme.lightBlue]), [])

  function handleStateClick(stateName: string) {
    // Did you click on a state that has a city in it?
    if (Object.values(cities).some(city => city.state.toUpperCase() === stateName.toUpperCase())) {
      setQuery('')
      // If the state is already selected, de-select it, otherwise select it.
      if (stateName === selectedState) {
        setSelectedState('')
      } else {
        setSelectedState(stateName)
      }
    } else {
      // If you clicked on a state with no cities, we'll de-select if something
      // is currently selected.
      setSelectedState('')
    }
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    d3.json('/static/us-states-albers.json').then((states) => {
      const ff: FeatureWithFeatures = topojson.feature(states, states.objects.states)
      const statesData = ff.features as Feature[]

      // Start by clearing out what was here before.
      svg.selectAll('g').remove()

      // Draw the states first so that they sit underneath the cities.
      svg
        .append('g')
        .selectAll('path')
        .data(statesData)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', (d) => {
          const classList = ['state']
          if (Object.values(cities).some(city => d.properties && d.properties.STATE.toUpperCase() === city.state.toUpperCase())) {
            classList.push('has-city')
          }
          if (d.properties && d.properties.STATE.toUpperCase() === selectedState.toUpperCase()) {
            classList.push('selected')
          }
          return classList.join(' ')
        })
        .on('click', (d) => handleStateClick(d.properties && d.properties.STATE))

      svg
        .append('g')
        .selectAll('circle')
        .data(Object.values(cities))
        .enter()
        .append('circle')
        .attr('class', 'city')
        .attr('r', (d) => sizeScale(d.population))
        .attr('cx', (d) => {
          const coords = projection([d.longitude, d.latitude])
          return coords ? coords[0] : 0
        })
        .attr('cy', (d) => {
          const coords = projection([d.longitude, d.latitude])
          return coords ? coords[1] : 0
        })
        .attr('fill', (d) => {
          const cityAgencies = Object.values(agencies).filter(agency => agency.city_id === d.id)
          let roleCount = 0
          cityAgencies.forEach(agency => {
            roleCount += getAgencyRoles(agency).length
          })
          return colorScale(roleCount)
        })
    })
  }, [agencies, cities, selectedState])

  return (
    <Container>
      <svg className="map" ref={svgRef} viewBox={`0 0 ${width} ${height}`} />
      <div className="legend">
        <div className="legend-row">
          <span>-</span>
          <div className="color-ex" />
          <span>+</span>
          <p>Color lightens with number of oversight functions city employs.</p>
        </div>
        <div className="legend-row">
          <span>-</span>
          <div className="size-ex">
            <div className="sm" />
            <div className="md" />
            <div className="lg" />
          </div>
          <span>+</span>
          <p>Size increases with city's population.</p>
        </div>
      </div>
    </Container>
  )
}

export default CitiesMap
