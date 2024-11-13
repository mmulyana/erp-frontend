import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Login = lazy(() => import('./index.tsx'))

export const authRoutes = [
  {
    path: PATH.BASE,
    element: <Login />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
]
