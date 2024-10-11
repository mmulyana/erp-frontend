import { useState } from 'react'
import { generatePath } from 'react-router-dom'

type Link = {
  name?: string
  path?: string
}

export const useDetailName = (path: string, detail?: string) => {
  const [link] = useState<Link | undefined>(() => {
    if (!detail) return undefined

    const parts = detail.split('-')
    const id = parts.pop()
    const name = parts.join(' ')

    return {
      name,
      path: generatePath(path, { detail: id }),
    }
  })

  return { link }
}
