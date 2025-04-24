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
