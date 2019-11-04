const getUrlHost = () => {
  // If we're able to access the .env file, then that will contain the host
  // to use in our SSR API URLs. If not, then just return an empty string,
  // and in that case it doesn't need to be specified because we're not
  // server-side.
  const host = process.env.API_URL_HOST
  return host || ''
}

export default getUrlHost
