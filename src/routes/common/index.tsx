import { PATH } from '@/utils/constant/_path.ts'
import { Route } from 'react-router-dom'
import { lazy } from 'react'

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
        (route, index) => route.show && <Route key={index} {...route} />
      )}
    </>
  )
}
