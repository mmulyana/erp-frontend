import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Login = lazy(() => import('./index.tsx'))
const Forgot = lazy(() => import('./forgot-password.tsx'))

export const authRoutes = [
  {
    path: PATH.BASE,
    element: <Login />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.FORGOT,
    element: <Forgot />,
  },
]
