import { Base } from '@/shared/types'

export type ProjectForm = {
	name: string
	leadId?: string
	clientId?: string
	description?: string
	progressPercentage?: number
	paymentPercentage?: number
	netValue?: number
	deadlineAt?: Date
	doneAt?: Date
	status?: string
	priority?: string
	employeeIds?: string[]
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
