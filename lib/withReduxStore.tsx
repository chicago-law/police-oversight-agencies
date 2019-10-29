import React from 'react'
import { NextPage, NextPageContext } from 'next'
import App, { AppContext } from 'next/app'
import { Store } from 'redux'
import { initializeStore } from '../store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

declare global {
  interface Window {
    __NEXT_REDUX_STORE__: any;
  }
}

function getOrCreateStore(): Store {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    console.log('is server! making new store..')
    return initializeStore()
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore()
  }
  return window[__NEXT_REDUX_STORE__]
}

type Props = { store: Store }

const withReduxStore = (Component: App<Props>) => class Redux extends React.Component<Props> {
  private store: Store

  static async getInitialProps(appContext: AppContext) {
    const store = getOrCreateStore()

    // Provide the store to getInitialProps of pages
    const newContext: any = { ...appContext }
    newContext.ctx.store = store

    let appProps = {}
    if ((Component as any).getInitialProps) {
      appProps = await (Component as any).getInitialProps(newContext)
    }

    return {
      initialReduxState: store.getState(),
      ...appProps,
    }
  }

  constructor(props: Props) {
    super(props)
    this.store = getOrCreateStore()
  }

  render() {
    return (
      <Redux {...this.props} store={this.store} />
    )
  }
}

export default withReduxStore

// export const mapDispatchToProps = dispatch => ({ dispatch })

// export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps>

// https://github.com/fsubal/next-js-with-typescript-redux/blob/master/lib/with-redux-store.tsx
