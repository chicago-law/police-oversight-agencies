import { roleColumns } from '../../lib/roleColumns'

export interface Agency {
  id: number;
  name: string;
  city_id: number;
  year_established: number | null;
  year_amended: number | null;
  primary_role: string | null;
  description: string | null;
  [roleColumns.investigative]: number | null;
  [roleColumns.review]: number | null;
  [roleColumns.audit]: number | null;
  [roleColumns.adjudicative]: number | null;
  [roleColumns.supervisory]: number | null;
  [roleColumns.advisory]: number | null;
  [roleColumns.appeals]: number | null;
}

export type Agencies = {
  [agencyId: string]: Agency;
}

export type AgenciesStates = Agencies

export const RECEIVE_AGENCIES = 'RECEIVE_AGENCIES'
export interface ReceiveAgencies {
  type: typeof RECEIVE_AGENCIES;
  agencies: Agencies;
}

export type AgenciesActionTypes =
  | ReceiveAgencies;
