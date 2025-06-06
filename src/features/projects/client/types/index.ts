export type ClientForm = {
	name: string
	email?: string
	phone?: string
	position?: string
	companyId?: string | null
}

export type Client = ClientForm & {
	id: string
	company: {
		id: string
		name: string
	}
}
