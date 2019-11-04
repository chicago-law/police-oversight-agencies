import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import agencies from './agencies/reducers'
import cities from './cities/reducers'
import scrolledFromTop from './scrolled-from-top/reducers'
import defaultInitialState from './defaultInitialState'

const rootReducer = combineReducers({
  agencies,
  cities,
  scrolledFromTop,
})

export type AppState = ReturnType<typeof rootReducer>;

export const initializeStore = (initialState = defaultInitialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
      ),
    ),
  )
}
