import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { library } from '@fortawesome/fontawesome-svg-core'
import { DefaultSeo } from 'next-seo'
import { Store } from 'redux'
import Page from '../components/Page'
import '../normalize.css'
import GlobalStyles from '../lib/globalStyles'
import { initializeStore } from '../store'
import faIcons from '../lib/fontAwesome'
import { initGA, logPageView } from '../lib/analytics'
import seoConfig from '../lib/seoConfig'

library.add(...faIcons)

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  componentDidMount() {
    initGA()
    logPageView()
    if (Router && Router.router) {
      Router.router.events.on('routeChangeComplete', logPageView)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <Page>
          <DefaultSeo {...seoConfig} />
          <GlobalStyles />
          <Component {...pageProps} />
        </Page>
      </Provider>
    )
  }
}

export default withRedux(initializeStore, { debug: false })(MyApp)
