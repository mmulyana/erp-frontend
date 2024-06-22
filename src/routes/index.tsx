import { Routes } from 'react-router-dom'
import AuthRoutes from './auth'
import CommonRoutes from './common'

export default function Routers() {
  return (
    <>
      <Routes>
        {AuthRoutes()}
        {CommonRoutes()}
      </Routes>
    </>
  )
}
