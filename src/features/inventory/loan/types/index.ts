export type loanForm = {
	requestDate: Date
	requestQuantity: number
	inventoryId: string
	projectId: string
	note?: string
	photoUrlIn?: string | File | null
	photoUrlOut?: string | File | null
}
