import { Agency } from '../store/agencies/types'
import { roleColumns } from './roleColumns'

function getAgencyRoles(agency: Agency) {
  const results: roleColumns[] = []
  Object.values(roleColumns).forEach(role => {
    if (agency[role]) results.push(role)
  })
  return results
}

export default getAgencyRoles
