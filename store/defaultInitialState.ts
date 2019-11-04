import { AgenciesState } from './agencies/types'
import { CitiesState } from './cities/types'
import { ScrolledFromTopState } from './scrolled-from-top/types'

const defaultInitialState: {
  agencies: AgenciesState;
  cities: CitiesState;
  scrolledFromTop: ScrolledFromTopState;
} = {
  agencies: {},
  cities: {},
  scrolledFromTop: typeof window !== 'undefined'
    ? window.pageYOffset
    : 0,
}

export default defaultInitialState
