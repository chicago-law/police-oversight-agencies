const arrayToObject = <T>(array: T[], keyBy: keyof T): { [key: string]: T } => {
  return array.reduce((obj, item, i) => {
    if (keyBy in item) {
      const key = item[keyBy]
      if (typeof key === 'string' || typeof key === 'number') {
        const keyed = {
          ...obj,
          [key]: item,
        }
        return keyed
      }
    }
    return {
      ...obj,
      [i]: item,
    }
  }, {})
}

export default arrayToObject
