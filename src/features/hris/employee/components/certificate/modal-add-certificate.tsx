import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
	DialogDescription,
} from '@/shared/components/ui/dialog'

import { useCreateCertificate } from '../../api/use-create-certificate'
import { CertificateForm } from '../../types'
import FormCertificate from './form-certificate'

export default function ModalAddCertificate() {
	const { mutate, isPending } = useCreateCertificate()
	const { id } = useParams()

	const [open, setOpen] = useState(false)

	const form = useForm<CertificateForm>({
		defaultValues: {
			file: undefined,
			name: '',
			employeeId: id,
			expiryDate: undefined,
			issueDate: undefined,
			publisher: '',
		},
	})

	const fileWatch = form.watch('file')

	useEffect(() => {
		if (fileWatch) {
			form.setValue('name', fileWatch.name)
		}
	}, [fileWatch])

	const onSubmit = (payload: CertificateForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset({
					name: '',
					employeeId: id,
					expiryDate: undefined,
					issueDate: undefined,
					publisher: '',
				})
			}),
			onError: handleFormError<CertificateForm>(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-1'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5 flex gap-1'>
						Tambah <span className='hidden md:block'>Sertifikasi</span>
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle className='text-center'>Sertifikat Baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormCertificate
					form={form}
					isPending={isPending}
					onSubmit={onSubmit}
				/>
			</DialogContent>
		</Dialog>
	)
}
