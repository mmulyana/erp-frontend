export type loanForm = {
	requestDate: Date
	requestQuantity: number
	inventoryId: string
	projectId: string
	note?: string
	filephotoUrlIn: File[] | null
	filephotoUrlOut: File[] | null
}
