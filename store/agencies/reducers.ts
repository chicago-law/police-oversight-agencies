import { AgenciesState, AgenciesActionTypes, RECEIVE_AGENCIES } from './types'
import defaultInitialState from '../defaultInitialState'

export const initialState = defaultInitialState.agencies

const cities = (
  state: AgenciesState = initialState,
  action: AgenciesActionTypes,
): AgenciesState => {
  switch (action.type) {
    case RECEIVE_AGENCIES:
      return {
        ...state,
        ...action.agencies,
      }
    default:
      return state
  }
}

export default cities
