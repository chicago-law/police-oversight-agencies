import { roleColumns } from './roleColumns'

// So this is a little hacky, but it helps keep us from needing to
// fully hard code everything out that uses all seven oversight
// attributes.
function formatRoleName(role: roleColumns) {
  // The first three characters are "is_".
  const name = role.substr(3)
  return name.charAt(0).toUpperCase() + name.substr(1)
}

export default formatRoleName
