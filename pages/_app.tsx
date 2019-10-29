import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faAngleDown,
  faAngleUp,
} from '@fortawesome/pro-regular-svg-icons'
import {
  faArrowDown,
  faCaretUp,
  faCaretDown,
  faCheck,
  faCog,
  faEnvelope,
  faExternalLinkSquareAlt,
  faSearch,
} from '@fortawesome/pro-solid-svg-icons'
import Page from '../components/Page'
import '../normalize.css'
import GlobalStyles from '../lib/globalStyles'
import { initializeStore } from '../store'

library.add(
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faCaretUp,
  faCaretDown,
  faCheck,
  faCog,
  faEnvelope,
  faExternalLinkSquareAlt,
  faSearch,
  faGithub,
)

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <Page>
          <GlobalStyles />
          <Component {...pageProps} />
        </Page>
      </Provider>
    )
  }
}

export default withRedux(initializeStore, { debug: false })(MyApp)
