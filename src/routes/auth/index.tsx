import { PATH } from '@/utils/constant/_paths.ts'
import { Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingScreen from '@/components/loading-screen/index.tsx'

const Login = lazy(() => import('./login/index.tsx'))
const Register = lazy(() => import('./register/index.tsx'))
const Forgot = lazy(() => import('./forgot/index.tsx'))

const useRoutes = () => {
  return [
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
}

export default function AuthRoutes() {
  const routes = useRoutes()
  return (
    <Route>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<LoadingScreen />}>{route.element}</Suspense>
          }
        />
      ))}
    </Route>
  )
}
