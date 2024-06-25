import { PATH } from '@/utils/constant/_paths.ts'
import { Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import LoadingScreen from '@/components/loading-screen/index.tsx'
import ProtectedRoute from '@/utils/protected-route.tsx'

const Main = lazy(() => import('./main/index.tsx'))
const Users = lazy(() => import('./users/index.tsx'))

const useRoutes = () => {
  return [
    {
      path: PATH.DASHBOARD,
      element: <Main />,
      show: true,
    },
    {
      path: PATH.USERS,
      element: <Users />,
      show: true,
    },
  ]
}

export default function DashboardRoutes() {
  const routes = useRoutes()
  return (
    <React.Fragment>
      {routes.map(
        (route, index) =>
          route.show && (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                </Suspense>
              }
            />
          )
      )}
    </React.Fragment>
  )
}
