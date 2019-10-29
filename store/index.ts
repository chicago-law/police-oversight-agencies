import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import agencies from './agencies/reducers'
import cities from './cities/reducers'
import scrolledFromTop from './scrolled-from-top/reducers'

const rootReducer = combineReducers({
  agencies,
  cities,
  scrolledFromTop,
})

export type AppState = ReturnType<typeof rootReducer>;

export function initializeStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
      ),
    ),
  )
}
