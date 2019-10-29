import { Agency } from '../store/agencies/types'
import { roles } from './roles'

function getAgencyRoles(agency: Agency) {
  const results: roles[] = []
  Object.values(roles).forEach(role => {
    if (agency[roles[role]]) results.push(roles[role])
  })
  return results
}

export default getAgencyRoles
