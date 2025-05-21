import { Base } from '@/shared/types'

export type Project = {
	id?: string
	name: string
	description?: string
	endedAt?: string
	startedAt?: string
	netValue?: number
	progressPercentage: number
	paymentPercentage: number

	client?: {
		id: string
		name: string
	}

	lead?: {
		id: string
		username: string
	}

	archivedAt?: string
	createdAt?: string
	updatedAt?: string
	deletedAt?: string
	deadlineAt?: string
}

export type ProjectForm = {
	name: string
	leadId?: string
	clientId?: string
	description?: string
	progressPercentage?: number
	paymentPercentage?: number
	netValue?: number

	startedAt?: string
	endedAt?: string
	archivedAt?: string
}

export type ProjectEmployee = {
	id: string
	employee: {
		id: string
		fullname: string
		photoUrl: string
		position: string
	}
	startDate: string
	endDate: string
}

export type AttachmentForm = {
	name: string
	file: File | string | null
	type: string
	secret: boolean
	projectId: string
}

export type ReportMutate = {
	message: string
	type: string
	projectId: string
	attachments?: (File | null)[]
}

export type Attachment = Base & AttachmentForm
