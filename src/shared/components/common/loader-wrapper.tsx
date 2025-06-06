import { ReactNode } from 'react'
import { Skeleton } from '../ui/skeleton'

type LoaderWrapperProps = {
	isLoading: boolean
	children: ReactNode
	skeletonCount?: number
}

export function LoaderWrapper({
	isLoading,
	children,
	skeletonCount = 1,
}: LoaderWrapperProps) {
	if (isLoading) {
		return (
			<div className='space-y-4'>
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<Skeleton key={i} className='h-6 min-w-20 bg-gray-200' />
				))}
			</div>
		)
	}

	return <>{children}</>
}
