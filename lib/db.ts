import * as sql from 'mssql'

const queryDb = async <T>(query: string) => {
  const config = {
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || '',
    user: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
  }

  let results = null

  const pool = new sql.ConnectionPool(config)
  await pool.connect()
  try {
    results = await pool.query<T>(query)
  } catch (err) {
    console.error(err)
  }
  await pool.close()

  return results
}

export default queryDb
