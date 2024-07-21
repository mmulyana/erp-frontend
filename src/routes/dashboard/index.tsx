import { PATH } from '@/utils/constant/_paths.ts'
import { Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import LoadingScreen from '@/components/loading-screen/index.tsx'
import ProtectedRoute from '@/utils/protected-route.tsx'

const Overview = lazy(() => import('./overview/index.tsx'))
const Account = lazy(() => import('./account-and-roles/account/index.tsx'))
const Roles = lazy(() => import('./account-and-roles/roles/index.tsx'))
const Permission = lazy(
  () => import('./account-and-roles/permission/index.tsx')
)
const Employee = lazy(() => import('./employee/index.tsx'))

const useRoutes = () => {
  return [
    {
      path: PATH.DASHBOARD,
      element: <Overview />,
      show: true,
    },
    {
      path: PATH.ACCOUNT,
      element: <Account />,
      show: true,
    },
    {
      path: PATH.ROLES,
      element: <Roles />,
      show: true,
    },
    {
      path: PATH.ROLES_PERMISSION,
      element: <Permission />,
      show: true,
    },
    {
      path: PATH.EMPLOYEE,
      element: <Employee />,
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
