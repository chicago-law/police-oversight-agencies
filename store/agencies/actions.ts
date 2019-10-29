import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import fetch from 'isomorphic-unfetch'
import { AppState } from '..'
import { Agencies, AgenciesActionTypes, RECEIVE_AGENCIES } from './types'

export const receiveAgencies = (
  agencies: Agencies,
): AgenciesActionTypes => ({
  type: RECEIVE_AGENCIES,
  agencies,
})

export const fetchAgencies = (callback?: () => void) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => AppState,
) => {
  if (Object.keys(getState().agencies).length === 0) {
    const data = await fetch('/static/agencies.json')
    const agencies = await data.json()
    dispatch(receiveAgencies(agencies))
    if (callback) callback()
  }
}
