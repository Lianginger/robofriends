import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { searchRobots, requestRobots } from './reducers'
import thunkMiddleware from 'redux-thunk'

import 'tachyons'
import * as serviceWorker from './serviceWorker'

const rootReducer = combineReducers({ searchRobots, requestRobots })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const logger = createLogger()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
