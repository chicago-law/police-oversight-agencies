import { roles } from '../../lib/roles'

export interface Agency {
  id: string;
  name: string;
  city_id: string;
  dep_city: string;
  dep_state: string;
  established_year: number | null;
  amended_year: number | null;
  primary_role: string | null;
  description: string | null;
  [roles.investigative]: number;
  [roles.review]: number;
  [roles.audit]: number;
  [roles.adjudicative]: number;
  [roles.supervisory]: number;
  [roles.advisory]: number;
  [roles.appeals]: number;
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
