export type Response = {
	data: {
		token: string
	}
}

export type Payload = {
	username?: string
	email?: string
	password: string
	phone?: string
}
