import React from 'react'

export type RoutesConfig = {
	path: string
	component: React.ReactNode
	permission?: string[]
	withoutAuth?: boolean
}

export type ErrorResponse<T> = {
	message: string
	errors: T
}

export type Title = {
	name: string
	path: string
	icon?: React.ReactNode | string
}