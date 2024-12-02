/**
 * Group an array of objects by a key
 * TODO: Use Object.groupBy() when Safari and Nodejs supports it
 */
export function group<S extends string | number, T>(
  list: T[],
  callback: (value: T, index: number, array: T[]) => S,
) {
  return list.reduce((obj, current, index, array) => {
    const key = callback(current, index, array)
    if (key in obj)
      obj[key].push(current)
    else
      obj[key] = [current]

    return obj
  }, {} as Record<S, T[]>)
}
