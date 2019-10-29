/**
 * Like a regular sort except we can use nulls. Keeps TypeScript from complaining
 * about using a regular sort with potential nulls.
 */
const compareWithNulls = (a: any, b: any, reverse = false): 1 | -1 | 0 => {
  if (a === b) return 0
  if (b === null) return -1
  if (a === null) return 1
  if (reverse) return a < b ? 1 : -1
  return a > b ? 1 : -1
}

export default compareWithNulls
