export const convertToWIB = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}
