import { Routes } from 'react-router-dom'
import AuthRoutes from './auth'
import CommonRoutes from './common'

const useRoutes = () => [
  {
    route: AuthRoutes,
  },
  {
    route: CommonRoutes,
  },
]

export default function Routers() {
  const routes = useRoutes()
  return (
    <>
      <Routes>{routes.map((route) => route.route())}</Routes>
    </>
  )
}
