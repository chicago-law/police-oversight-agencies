import { ScrolledFromTopState, ScrolledFromTopActionTypes, REPORT_SCROLL_POS } from './types'

export const initialState: ScrolledFromTopState = typeof window !== 'undefined'
  ? window.pageYOffset
  : 0

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
