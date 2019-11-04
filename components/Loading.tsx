import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Container = styled('div')<{ height?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  padding-top: 1em;
  .bar {
    opacity: 0.5;
    height: 20px;
    width: 2px;
    background: ${props => props.theme.darkBlue};
    margin: 15px 3px;
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
    &.big {
      opacity: 1;
      transform: scale(2);
    }
  }
`

interface OwnProps {
  height?: number;
}

const Loading = ({ height }: OwnProps) => {
  const [big, setBig] = useState(1)

  useEffect(() => {
    const flashing = setInterval(() => {
      setBig((prev) => {
        if (prev === 5) return 1
        return prev + 1
      })
    }, 175)
    return () => {
      clearInterval(flashing)
    }
  }, [])

  return (
    <Container height={height}>
      <div className={`bar ${big === 1 ? 'big' : ''}`} />
      <div className={`bar ${big === 2 ? 'big' : ''}`} />
      <div className={`bar ${big === 3 ? 'big' : ''}`} />
      <div className={`bar ${big === 4 ? 'big' : ''}`} />
      <div className={`bar ${big === 5 ? 'big' : ''}`} />
    </Container>
  )
}

export default Loading
