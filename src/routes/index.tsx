import LoadingScreen from '@/components/loading-screen'
import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { authRoutes } from './auth'
import { commonRoutes } from './common'
import { dashboardRoutes } from './dashboard'

export const routes = [
  { path: '/', children: authRoutes },
  { path: '/', children: commonRoutes },
  { path: '/dashboard/*', children: dashboardRoutes },
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
                {childRoute.element}
              </Suspense>
            }
          />
        ))
      )}
    </Routes>
  )
}
