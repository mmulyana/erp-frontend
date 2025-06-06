import { ExternalLink, Hammer, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

import FormCreateStockOut from '@/features/inventory/stock-out/components/form-create-stock-out'
import { useCreateStockOut } from '@/features/inventory/stock-out/api/use-create-stock-out'
import { useStockOuts } from '@/features/inventory/stock-out/api/use-stock-outs'
import { StockOutForm } from '@/features/inventory/stock-out/types'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import PhotoUrl from '@/shared/components/common/photo-url'
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
export default function ProjectStockOut({ id }: props) {
	const { data } = useStockOuts({
		projectId: id,
	})
	return (
		<div className='pt-6'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary font-medium'>Pemakaian</p>
					<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
						<p className='text-xs text-ink-primary font-medium'>
							{data?.data?.data?.length}
						</p>
					</div>
				</div>
				<ModalAddStockOut id={id} />
			</div>
			<ScrollArea className='mb-4 h-[320px]'>
				<div className='mt-6 space-y-4'>
					{data?.data.data.map((i) => (
						<div
							className='bg-white rounded-xl border border-border p-4 relative'
							key={i.id}
						>
							<div className='flex justify-between'>
								<div className='flex flex-col justify-between items-start'>
									<div className='space-y-2'>
										<p className='text-ink-primary'>
											{format(new Date(i.date), 'dd/MM/yyyy')}
										</p>
										<div className='flex gap-2 items-center'>
											<div className='flex gap-2 items-center'>
												<Hammer size={20} className='text-[#959597]' />
												<p className='text-ink-primary/50'>Jumlah barang</p>
											</div>
											<p className='text-ink-primary'>{i._count.items}</p>
										</div>
										<div>
											<p className='text-ink-primary/50'>Keterangan</p>
											<p className='text-ink-primary'>{i?.note || '-'}</p>
										</div>
									</div>
								</div>

								<div className='flex flex-col items-end gap-4 justify-between'>
									<Link
										to={`${paths.inventoryStockOut}/${i.id}`}
										className='flex gap-2 items-center'
									>
										<span className='px-0.5'>Lihat</span>
										<ExternalLink size={18} />
									</Link>
									<div className='flex justify-end'>
										<div>
											<p className='text-ink-primary/50 leading-none text-right mb-0.5'>
												Dibuat oleh
											</p>
											<div className='flex gap-2 items-center'>
												<PhotoUrl
													url={i.user.photoUrl || ''}
													style={{ img: 'h-10 w-10' }}
												/>
												<div>
													<p className='text-ink-primary font-medium'>
														{i.user.username}
													</p>
												</div>
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

function ModalAddStockOut({ id }: props & { callback?: () => void }) {
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useCreateStockOut()

	const form = useForm<StockOutForm>({
		defaultValues: {
			projectId: id,
			date: new Date(),
			items: [{ itemId: '', quantity: 0, price: 0 }],
		},
	})

	const handleSuccess = () => {
		form.reset()
		setOpen(false)
	}

	const submit = (payload: StockOutForm) => {
		mutate(
			{
				date: payload.date,
				items: payload.items.map((i) => ({
					itemId: i.itemId,
					quantity: i.quantity,
					unitPrice: i.price,
				})),
				photoUrl: payload.photoUrl,
				note: payload.note,
				projectId: payload.projectId,
			},
			{
				onSuccess: handleFormSuccess(handleSuccess),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus size={18} />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='md:max-w-[800px] min-w-full md:min-w-min'>
				<DialogHeader>
					<DialogTitle className='text-center'>Pemakaian</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<FormCreateStockOut
					projectId={id}
					form={form}
					onSubmit={submit}
					isPending={isPending}
					variant='project'
				/>
			</DialogContent>
		</Dialog>
	)
}
