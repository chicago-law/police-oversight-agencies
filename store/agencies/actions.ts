import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import fetch from 'isomorphic-unfetch'
import { AppState } from '..'
import { Agencies, AgenciesActionTypes, RECEIVE_AGENCIES, Agency } from './types'
import arrayToObject from '../../lib/arrayToObject'
import getUrlHost from '../../lib/getUrlHost'

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
    const res = await fetch(`${getUrlHost()}/api/agencies`)
    const data: { agencies: Agency[] } = await res.json()
    const agencies = arrayToObject(data.agencies, 'id')

    dispatch(receiveAgencies(agencies))
    if (callback) callback()
  }
}
