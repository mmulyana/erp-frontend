import { Routes } from 'react-router-dom'
import AuthRoutes from './auth'
import CommonRoutes from './common'
import DashboardRoutes from './dashboard'

export default function Routers() {
  return (
    <>
      <Routes>
        {AuthRoutes()}
        {CommonRoutes()}
        {DashboardRoutes()}
      </Routes>
    </>
  )
}
