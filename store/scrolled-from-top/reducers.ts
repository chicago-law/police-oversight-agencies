import { ScrolledFromTopState, ScrolledFromTopActionTypes, REPORT_SCROLL_POS } from './types'
import defaultInitialState from '../defaultInitialState'

export const initialState = defaultInitialState.scrolledFromTop

const session = (
  state: ScrolledFromTopState = initialState,
  action: ScrolledFromTopActionTypes,
): ScrolledFromTopState => {
  switch (action.type) {
    case REPORT_SCROLL_POS:
      return action.pos
    default:
      return state
  }
}

export default session
