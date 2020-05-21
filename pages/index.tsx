import { NextPageContext } from 'next'

const Index = () => {
  return (
    /* Just here to take up some space. */
    <div style={{ padding: '1em' }} />
  )
}

Index.getInitialProps = async ({ res }: NextPageContext) => {
  // Just redirect us to the "cities" page.
  if (res) {
    res.writeHead(301, { Location: '/cities' })
    res.end()
    return {}
  }

  return {}
}

export default Index
