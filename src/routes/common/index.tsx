import { PATH } from '@/utils/constant/_paths.ts'
import { Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingScreen from '@/components/loading-screen/index.tsx'

const NotFound = lazy(() => import('./not-found/index.tsx'))

const useRoutes = () => {
  return [
    {
      path: PATH.NOT_FOUND,
      element: <NotFound />,
      show: true,
    },
  ]
}

export default function CommonRoutes() {
  const routes = useRoutes()
  return (
    <>
      {routes.map(
        (route, index) =>
          route.show && (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  {route.element}
                </Suspense>
              }
            />
          )
      )}
    </>
  )
}
