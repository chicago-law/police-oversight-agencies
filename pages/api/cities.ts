import { NextApiRequest, NextApiResponse } from 'next'
import queryDb from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)
  // const results = await queryDb('select * from cities')
  const results = null

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ results }))
}
