import { CitiesState, CitiesActionTypes, RECEIVE_CITIES } from './types'
import defaultInitialState from '../defaultInitialState'

export const initialState = defaultInitialState.cities

const cities = (
  state: CitiesState = initialState,
  action: CitiesActionTypes,
): CitiesState => {
  switch (action.type) {
    case RECEIVE_CITIES:
      return {
        ...state,
        ...action.cities,
      }
    default:
      return state
  }
}

export default cities
