import { ScrolledFromTopActionTypes, REPORT_SCROLL_POS } from './types'

export const reportScrollPos = (pos: number): ScrolledFromTopActionTypes => ({
  type: REPORT_SCROLL_POS,
  pos,
})
