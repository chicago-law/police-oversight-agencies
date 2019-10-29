export type ScrolledFromTopState = number;

export const REPORT_SCROLL_POS = 'REPORT_SCROLL_POS'
export interface ReportScrollPos {
  type: typeof REPORT_SCROLL_POS;
  pos: number;
}

export type ScrolledFromTopActionTypes = ReportScrollPos
