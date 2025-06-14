import React from 'react'
import { string } from 'zod'

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

export interface IApiInfinite<T = void> {
	data: {
		data: T
		nextPage?: number | null
	}
	message: string
}

export type InfiniteResult<T> = {
	pages: {
		data: T[]
		nextPage?: number | null
	}[]
	pageParams: number[]
}

export type NormalizedResponse<T> = {
	data: T[]
	nextPage?: number
}

export interface ApiError {
	message: string
	status: number
	errors: any
}

export type Pagination = {
	page?: string
	limit?: string
	search?: string

	sortOrder?: string
	sortBy?: string
}

export type StatusItem = {
	name: string
	value: string | number
}

export type StatusObject = {
	[key: string | number]: string
}

export type Employee = {
	id: string
	fullname: string
	active: boolean
	address: string
	phone: string
	photoUrl: string
	createdAt: string
	updatedAt: string
	joinedAt: string
	lastEducation: string
	position: string
	birthDate: string
	salary: number
	overtimeSalary: number
	status: boolean
	safetyInductionDate?: string
}

export type Base = {
	id: string
	createdAt: string
	deletedAt?: string | null
	updatedAt?: string
}

export type Link = {
	icon?: React.ReactNode
	name: string
	path: string
	hideName?: boolean
}

export type selectOption = {
	label: string
	value: string
}

export type BadgeOption = {
	value: string
	label: string
	color: string
}

export type DateRange = {
	startDate?: Date
	endDate?: Date
}