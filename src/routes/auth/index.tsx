import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Login = lazy(() => import('./login/index.tsx'))
const Register = lazy(() => import('./register/index.tsx'))
const Forgot = lazy(() => import('./forgot/index.tsx'))

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
    path: PATH.REGISTER,
    element: <Register />,
  },
  {
    path: PATH.FORGOT,
    element: <Forgot />,
  },
]