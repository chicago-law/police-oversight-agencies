export interface City {
  id: string;
  name: string;
  growth: string;
  latitude: number;
  longitude: number;
  population: number;
  rank: number;
  state: string;
}

export type Cities = {
  [cityId: string]: City;
}

export type CitiesState = Cities

export const RECEIVE_CITIES = 'RECEIVE_CITIES'
export interface ReceiveCities {
  type: typeof RECEIVE_CITIES;
  cities: Cities;
}

export type CitiesActionTypes =
  | ReceiveCities;
