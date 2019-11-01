import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import RoleFrequency from '../components/RoleFrequency'
import RoleDefinitions from '../components/RoleDefinitions'
import { fetchCities } from '../store/cities/actions'
import { fetchAgencies } from '../store/agencies/actions'
import RoleCombinations from '../components/RoleCombinations'

const Container = styled('div')`
  position: relative;
  display: flex;
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

const Roles = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchAgencies())
  }, [])

  return (
    <Container>
      <div className="left">
        <RoleFrequency />
        <RoleCombinations />
      </div>
      <div className="right">
        <RoleDefinitions />
      </div>
    </Container>
  )
}

export default Roles
