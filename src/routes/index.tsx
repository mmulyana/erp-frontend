import LoadingScreen from '@/components/common/loading-screen'
import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { authRoutes } from './auth/_routes'
import { commonRoutes } from './common/_routes'
import { dashboardRoutes } from './dashboard/_routes'
import ProtectedRoute from '@/utils/protected-route'

export const routes = [
  { path: '/', children: authRoutes, auth: false },
  { path: '/', children: commonRoutes, auth: false },
  { path: '/dashboard/*', children: dashboardRoutes, auth: false },
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
