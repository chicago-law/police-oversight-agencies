import { NextApiRequest, NextApiResponse } from 'next'
import queryDb from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const results = await queryDb('select * from agencies')
  const agencies = results && results.recordset

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ agencies }))
}
