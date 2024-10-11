import { generatePath } from 'react-router-dom'

export const createLinkDetail = (
  path: string,
  name: string,
  id: string | number
): string => {
  return generatePath(path, {
    detail: `${name.split(' ').join('-')}-${id}`,
  })
}
