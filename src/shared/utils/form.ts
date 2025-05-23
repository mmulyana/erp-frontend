import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export function handleFormSuccess(
	setOpen: (open: boolean) => void,
	...callbacks: (() => void)[]
) {
	return () => {
		setOpen(false)
		callbacks.forEach((cb) => cb())
	}
}

export function handleFormError<T extends FieldValues>(
	form: Pick<UseFormReturn<T>, 'setError'>
) {
	return (error: any) => {
		if (error?.response?.data?.errors) {
			error.response.data.errors.forEach((err: any) => {
				const fieldPath = err.path?.join('.') as Path<T>
				if (fieldPath) {
					form.setError(fieldPath, { message: err.message })
				}
			})
		}
	}
}
