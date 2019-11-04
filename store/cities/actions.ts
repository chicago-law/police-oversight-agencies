import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import fetch from 'isomorphic-unfetch'
import { Cities, CitiesActionTypes, RECEIVE_CITIES, City } from './types'
import arrayToObject from '../../lib/arrayToObject'
import getUrlHost from '../../lib/getUrlHost'
import { AppState } from '..'

export const receiveCities = (
  cities: Cities,
): CitiesActionTypes => ({
  type: RECEIVE_CITIES,
  cities,
})

export const fetchCities = (callback?: () => void) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => AppState,
) => {
  if (Object.keys(getState().cities).length === 0) {
    const res = await fetch(`${getUrlHost()}/api/cities`)
    const data: { cities: City[] } = await res.json()
    const cities = arrayToObject(data.cities, 'id')

    dispatch(receiveCities(cities))
    if (callback) callback()
  }
}
