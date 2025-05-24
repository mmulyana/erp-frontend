import { ExternalLink, List, Pencil } from 'lucide-react'
import { id as ind } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import StatusBadge from '@/shared/components/common/status-badge'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import FormCreateLoan from './form-create-loan'
import { useUpdateLoan } from '../api/use-update-loan'
import { useLoan } from '../api/use-loan'
import { statusLoan } from '../constant'
import { loanForm } from '../types'

export default function LoanInfo({ id }: { id?: string }) {
	const { data } = useLoan({ id })

	return (
		<CardV1
			title='Detail'
			icon={<List size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 space-y-6' }}
			action={<ModalEditLoan id={id} />}
		>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Status</p>
				<StatusBadge options={statusLoan} value={data?.data?.status} />
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Tanggal</p>
				{data?.data && data.data.requestDate && (
					<p className='text-ink-primary'>
						{format(new Date(data?.data?.requestDate), 'PPP', { locale: ind })}
					</p>
				)}
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Kuantitas</p>
				<p className='text-ink-primary'>{data?.data?.requestQuantity}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Dikembalikan</p>
				<p className='text-ink-primary'>{data?.data?.returnedQuantity}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Dipinjam oleh</p>
				{data?.data?.borrower && (
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							url={data.data.borrower.photoUrl || ''}
							style={{ img: 'h-10 w-10' }}
						/>
						<p className='text-ink-primary'>{data.data.borrower.username}</p>
					</div>
				)}
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Proyek</p>
				{data?.data && data.data.project && (
					<Link
						to={`${paths.projectMasterdataProjects}/${data.data.projectId}`}
						className='flex gap-2 items-center'
					>
						<p className='text-ink-primary font-medium mr-0.5'>
							{data.data.project.name}
						</p>
						<span className='px-0.5'>Lihat</span>
						<ExternalLink size={16} />
					</Link>
				)}
			</div>
			<div className=''>
				<p className='text-ink-primary/50'>Catatan</p>
				<p className='text-ink-primary'>{data?.data?.note}</p>
			</div>
		</CardV1>
	)
}

function ModalEditLoan({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const { data } = useLoan({ id })

	const { mutate, isPending } = useUpdateLoan()
	const form = useForm<loanForm>({
		defaultValues: {
			projectId: id,
		},
	})

	const submit = (payload: loanForm) => {
		if (!id) return
		mutate(
			{
				id,
				...payload,
			},
			{
				onSuccess: handleFormSuccess(setOpen, () => {
					form.reset()
					if (id) form.setValue('projectId', id)
				}),
				onError: handleFormError(form),
			}
		)
	}

	useEffect(() => {
		if (data?.data) {
			const res = data.data

			form.reset({
				note: res.note,
				requestDate: new Date(res.requestDate),
				photoUrlIn: res.photoUrlIn,
			})
		}
	}, [data])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Peminjaman</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<FormCreateLoan
					form={form}
					onSubmit={submit}
					variant='edit'
					projectId={id}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	)
}
