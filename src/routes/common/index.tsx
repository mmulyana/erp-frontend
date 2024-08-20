import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const NotFound = lazy(() => import('./not-found/index.tsx'))

export const commonRoutes = [
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />,
  },
]
