import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import fetch from 'isomorphic-unfetch'
import { Cities, CitiesActionTypes, RECEIVE_CITIES } from './types'
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
    const data = await fetch('/static/cities.json')
    const cities = await data.json()
    dispatch(receiveCities(cities))
    if (callback) callback()
  }
}
