import { ExternalLink, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

import FormCreateLoan from '@/features/inventory/loan/components/form-create-loan'
import { useCreateLoan } from '@/features/inventory/loan/api/use-create-loan'
import { useLoans } from '@/features/inventory/loan/api/use-loans'
import { statusLoan } from '@/features/inventory/loan/constant'
import { loanForm } from '@/features/inventory/loan/types'

import StatusBadge from '@/shared/components/common/status-badge'
import PhotoUrl from '@/shared/components/common/photo-url'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { usePagination } from '@/shared/hooks/use-pagination'
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

type props = {
	id?: string
}
export default function ProjectLoan({ id }: props) {
	const { limit, page, q } = usePagination()
	const { data, refetch } = useLoans({
		projectId: id,
		limit,
		page,
		search: q,
	})

	return (
		<div className='pt-6'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary font-medium'>Peminjaman</p>
					<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
						<p className='text-xs text-ink-primary font-medium'>
							{data?.data.data.length}
						</p>
					</div>
				</div>
				<ModalAddStockOut id={id} callback={() => refetch()} />
			</div>
			<ScrollArea className='mb-4 h-[320px]'>
				<div className='mt-6 space-y-4'>
					{data?.data.data.map((i) => (
						<div
							className='bg-white rounded-xl border border-border p-4 relative'
							key={i.id}
						>
							<div className='flex justify-between'>
								<div className='space-y-4 w-[280px]'>
									<div className='space-y-1'>
										<p className='text-ink-primary/50'>Barang dipinjam</p>
										<div className='flex gap-2 items-center'>
											<PhotoUrl
												url={i.item.photoUrl || ''}
												style={{ img: 'h-10 w-10 rounded-md' }}
											/>
											<Link
												to={`${paths.inventoryMasterdataItem}/${i.item.id}?scroll=true`}
												className='text-ink-primary'
											>
												{i.item.name}
											</Link>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-2'>
										<div>
											<p className='text-ink-primary/50 text-sm'>
												Jml dipinjam
											</p>
											<p className='text-ink-primary'>{i.requestQuantity}</p>
										</div>
										<div>
											<p className='text-ink-primary/50 text-sm'>
												Jml dikembalikan
											</p>
											<p className='text-ink-primary'>{i.returnedQuantity}</p>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-2'>
										<div className='flex-1'>
											<p className='text-ink-primary/50 text-sm'>
												Tggl dipinjam
											</p>
											<p className='text-ink-primary'>
												{format(new Date(i.requestDate), 'dd/MM/yyyy')}
											</p>
										</div>
										<div className='flex-1'>
											<p className='text-ink-primary/50 text-sm'>
												Tggl dikembalikan
											</p>
											{i.returnDate && (
												<p className='text-ink-primary'>
													{format(new Date(i.returnDate), 'dd/MM/yyyy')}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className='flex flex-col justify-between items-end'>
									<Link
										to={`${paths.inventoryStockLoan}/${i.id}`}
										className='flex gap-2 items-center'
									>
										<span className='px-0.5'>Lihat</span>
										<ExternalLink size={16} />
									</Link>

									<div>
										<p className='text-ink-primary/50 text-right'>Status</p>
										<StatusBadge options={statusLoan} value={i.status} />
									</div>

									<div className='flex justify-end flex-col items-end'>
										<p className='text-ink-primary/50 leading-none text-right mb-0.5'>
											Dibuat oleh
										</p>
										<div className='flex gap-2 items-center'>
											<PhotoUrl
												url={i.borrower.photoUrl || ''}
												style={{ img: 'h-10 w-10' }}
											/>
											<div>
												<p className='text-ink-primary font-medium'>
													{i.borrower.username}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

function ModalAddStockOut({ id, callback }: props & { callback?: () => void }) {
	const [open, setOpen] = useState(false)
	const { mutate, isPending } = useCreateLoan()
	const form = useForm<loanForm>({
		defaultValues: {
			projectId: id,
		},
	})

	const submit = (payload: loanForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset()
				if (id) form.setValue('projectId', id)
				callback?.()
			}),
			onError: handleFormError(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus size={18} />
					<span className='px-0.5'>Tambah</span>
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
					variant='project'
					projectId={id}
					form={form}
					onSubmit={submit}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	)
}
