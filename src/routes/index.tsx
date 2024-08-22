import LoadingScreen from '@/components/loading-screen'
import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { authRoutes } from './auth'
import { commonRoutes } from './common'
import { dashboardRoutes } from './dashboard'
import ProtectedRoute from '@/utils/protected-route'

export const routes = [
  { path: '/', children: authRoutes, auth: false },
  { path: '/', children: commonRoutes, auth: false },
  { path: '/dashboard/*', children: dashboardRoutes, auth: true },
]

export default function Router() {
  return (
    <Routes>
      {routes.map((route, index) =>
        route.children.map((childRoute, childIndex) => (
          <Route
            key={`${index}-${childIndex}`}
            path={childRoute.path}
            element={
              <Suspense fallback={<LoadingScreen />}>
                {route.auth ? (
                  <ProtectedRoute>{childRoute.element}</ProtectedRoute>
                ) : (
                  childRoute.element
                )}
              </Suspense>
            }
          />
        ))
      )}
    </Routes>
  )
}
