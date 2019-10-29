import { AgenciesStates, AgenciesActionTypes, RECEIVE_AGENCIES } from './types'

export const initialState: AgenciesStates = {}

const cities = (
  state: AgenciesStates = initialState,
  action: AgenciesActionTypes,
): AgenciesStates => {
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
