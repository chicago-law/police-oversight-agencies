import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import { useRef, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import SectionHeading from './SectionHeading'
import { AppState } from '../store'
import { roleColumns } from '../lib/roleColumns'
import formatRoleName from '../lib/formatRoleName'
import Loading from './Loading'

interface StyleProps {
  leftAxisWidth: number;
}

const Container = styled('div')<StyleProps>`
  margin-bottom: 6em;
  .chart-container {
    margin-top: 2em;
    .heading {
      display: flex;
      margin-bottom: 1em;
      span {
        display: inline-block;
        font-family: ${props => props.theme.proximaNova};
        color: ${props => props.theme.lightGray};
        font-size: ${props => props.theme.ms(-2)};
        font-weight: bold;
        &:first-child {
          flex: 0 0 ${props => props.leftAxisWidth}px;
        }
      }
    }
    .row {
      display: flex;
      position: relative;
      align-items: center;
      margin-bottom: 1em;
    }
    .bar {
      position: relative;
      background: ${props => `linear-gradient(to right, ${props.theme.blue(1)}, ${props.theme.blue(0.5)})`};
      border-radius: 0 5px 5px 0;
      border-radius: 3px;
      transition: width 100ms ease-out;
      .value {
        position: absolute;
        top: 0;
        right: -0.5em;
        transform: translateX(100%);
      }
    }
    .label {
      flex: 0 0 ${props => props.leftAxisWidth}px;
      font-weight: bold;
    }
  }
`

const FuncFrequency = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const agencies = useSelector((state: AppState) => state.agencies)
  const cities = useSelector((state: AppState) => state.cities)
  const dataReady = useMemo(() => {
    return Object.keys(agencies).length !== 0 && Object.keys(cities).length !== 0
  }, [agencies, cities])

  const [chartWidth, setChartWidth] = useState(893)
  const chartHeight = 200
  const leftAxisWidth = 110

  function measureChartWidth() {
    if (chartRef.current) {
      const measurements = chartRef.current.getBoundingClientRect()
      setChartWidth(measurements.width)
    }
  }

  useEffect(() => {
    measureChartWidth()
    window.addEventListener('resize', measureChartWidth)
    return () => {
      window.removeEventListener('resize', measureChartWidth)
    }
  }, [])

  const roleRates = useMemo(() => {
    const results = {
      [roleColumns.adjudicative]: 0,
      [roleColumns.advisory]: 0,
      [roleColumns.appeals]: 0,
      [roleColumns.audit]: 0,
      [roleColumns.investigative]: 0,
      [roleColumns.review]: 0,
      [roleColumns.supervisory]: 0,
    }
    Object.values(roleColumns).forEach(role => {
      let tally = 0
      Object.values(agencies).forEach(agency => {
        if (agency[role]) tally += 1
      })
      results[role] = parseInt(((tally / Object.keys(agencies).length) * 100).toFixed(1))
    })
    return results
  }, [agencies, cities])

  useEffect(() => {
    // In order to properly sort and use in D3, we'll split our object into two arrays.
    const frequencies = Object.values(roleRates).sort((a, b) => (a < b ? 1 : -1))
    const labels = Object.keys(roleRates)
      .sort((a, b) => (roleRates[a as roleColumns] < roleRates[b as roleColumns] ? 1 : -1))
      .map(key => formatRoleName(key as roleColumns))

    // Make the chart
    const chart = d3.select(chartRef.current)
    const barHeight = chartHeight / frequencies.length
    const scaleW = d3.scaleLinear()
      .domain([0, 75])
      .range([0, chartWidth - leftAxisWidth])


    if (chart && Object.keys(agencies).length && Object.keys(cities).length) {
      // Start by removing any old divs.
      chart.selectAll('div').remove()

      // Make rows.
      const barGroup = chart.selectAll('div')
        .data(frequencies)
        .enter()
        .append('div')
        .attr('class', 'row')

      // Make role labels.
      barGroup.append('span')
        .attr('class', 'label')
        .text((d, i) => labels[i])

      // Make bars.
      barGroup.append('div')
        .attr('class', 'bar')
        .style('width', d => `${scaleW(d)}px`)
        .style('height', `${barHeight}px`)
        .append('span')
        .attr('class', 'value')
        .text(d => `${d}%`)
    }
  }, [agencies, cities, chartWidth])

  return (
    <Container leftAxisWidth={leftAxisWidth}>
      <SectionHeading heading="Function Frequency">
        Which oversight functions occur most frequently?
      </SectionHeading>
      {!dataReady
        ? <Loading />
        : (
          <div className="chart-container">
            <div className="heading">
              <span className="role">Function</span>
              <span className="role">Percentage of Cities with Agency Fulfilling Function</span>
            </div>
            <div className="chart" ref={chartRef} />
          </div>
        )}
    </Container>
  )
}

export default FuncFrequency
