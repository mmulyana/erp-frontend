import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import { convertUTCToWIB } from '@/shared/utils'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import { useUpdateCertificate } from '../../api/use-update-certificate'
import { useCertificate } from '../../api/use-certificate'
import FormCertificate from './form-certificate'
import { CertificateForm } from '../../types'

export default function ModalEditCertificate({ id }: { id?: string }) {
	const { id: employeeId } = useParams()

	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useUpdateCertificate()
	const { data } = useCertificate(id)

	const form = useForm<CertificateForm>({
		defaultValues: {
			expiryDate: undefined,
			issueDate: undefined,
			file: undefined,
			name: '',
			publisher: '',
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.name,
				publisher: data.publisher,
				expiryDate: convertUTCToWIB(new Date(data.expiryDate)),
				issueDate: convertUTCToWIB(new Date(data.issueDate)),
			})
		}
	}, [data])

	const onSubmit = async (payload: Partial<CertificateForm>) => {
		mutate(
			{ ...payload, id, employeeId },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Partial<CertificateForm>>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-1'>
					<Pencil size={18} className='text-ink-light' />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Edit</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormCertificate
					form={form}
					onSubmit={onSubmit}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	)
}
