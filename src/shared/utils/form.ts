export function handleFormSuccess(
	setOpen: (open: boolean) => void,
	...callbacks: (() => void)[]
) {
	return () => {
		setOpen(false)
		callbacks.forEach((cb) => cb())
	}
}

export function handleFormError<T extends Record<string, any>>(form: {
	setError: (field: keyof T, error: { message: string }) => void
}) {
	return (error: any) => {
		if (error?.response?.data?.errors) {
			error.response.data.errors.forEach((err: any) => {
				const field = err.path?.[0]
				const message = err.message
				if (field) {
					form.setError(field, { message })
				}
			})
		}
	}
}
