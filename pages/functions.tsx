import styled from 'styled-components'
import { NextPageContext } from 'next'
import { Store } from 'redux'
import FuncFrequency from '../components/FuncFrequency'
import FuncDefinitions from '../components/FuncDefinitions'
import { fetchCities } from '../store/cities/actions'
import { fetchAgencies } from '../store/agencies/actions'
import FuncCombinations from '../components/FuncCombinations'
import animations from '../lib/animations'

const Container = styled('div')`
  position: relative;
  display: flex;
  ${animations.fadeSlideUp(1200)};
  @media (max-width: ${props => props.theme.bP.dMd}) {
    flex-direction: column;
  }
  .left {
    flex: 1 1 auto;
  }
  .right {
    flex: 1 1 27em;
    padding-left: 4em;
    @media (max-width: ${props => props.theme.bP.dMd}) {
      flex: 1 1 auto;
      padding: 0;
      margin-top: 4em;
    }
  }
`

const Functions = () => (
  <Container>
    <div className="left">
      <FuncFrequency />
      <FuncCombinations />
    </div>
    <div className="right">
      <FuncDefinitions />
    </div>
  </Container>
)

Functions.getInitialProps = async ({ store }: NextPageContext & {store: Store }) => {
  await Promise.all([
    store.dispatch(fetchCities() as any),
    store.dispatch(fetchAgencies() as any),
  ])
  return store
}

export default Functions
