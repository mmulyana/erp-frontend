import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingScreen from '@/components/common/loading-screen'
import ProtectedRoute from '@/utils/protected-route'
import { RoutesConfig } from '@/shared/types'

const Login = lazy(() => import('./pages/login'))

const routes: RoutesConfig[] = [
	{
		path: '/',
		component: <Login />,
		withoutAuth: true,
	},
]

export default function MainRoutes() {
	return (
		<Routes>
			{routes.map((item, index) => (
				<Route
					key={index}
					path={item.path}
					element={
						<Suspense fallback={<LoadingScreen />}>
							{!item.withoutAuth ? (
								<ProtectedRoute requiredPermissions={item?.permission || []}>
									{item.component}
								</ProtectedRoute>
							) : (
								item.component
							)}
						</Suspense>
					}
				/>
			))}
		</Routes>
	)
}
