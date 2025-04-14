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

export interface IApi<T = void> {
	data?: T
	message: string
}

export interface IApiPagination<T = void> {
	data: {
		total: number
		page: number
		limit: number
		total_pages: number
		data: T
	}
	message: string
}

export interface ApiError {
	message: string
	status: number
	errors: any
}

export type Pagination = {
	page?: string
	limit?: string
}

export type StatusItem = {
	name: string
	value: string | number
}

export type StatusObject = {
	[key: string | number]: string
}
