import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { library } from '@fortawesome/fontawesome-svg-core'
import Page from '../components/Page'
import '../normalize.css'
import GlobalStyles from '../lib/globalStyles'
import { initializeStore } from '../store'
import faIcons from '../lib/fontAwesome'

library.add(...faIcons)

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
