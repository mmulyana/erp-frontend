import { FileText, Plus } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import FileUpload from '@/shared/components/common/file-upload'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Card } from '@/shared/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'

import { useCreateAttachment } from '../api/attachment/use-create-attachment'
import { useAttachments } from '../api/attachment/use-attachments'
import { AttachmentForm } from '../types'

export default function ProjectAttachment({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)
	const { q } = usePagination()
	
	const { data } = useAttachments({ id, search: q })

	return (
		<>
			<Card className='p-0 overflow-hidden'>
				<div className='flex items-center justify-between px-6 pt-6'>
					<p className='text-ink-primary'>Dokumen</p>
					<Button
						variant='outline'
						className='gap-1'
						onClick={() => setOpen(true)}
					>
						<Plus strokeWidth={2} size={16} />
						<span className='px-0.5 flex gap-1'>Tambah</span>
					</Button>
				</div>
				<ScrollArea className='h-[280px] px-6 pt-2'>
					<div className='flex flex-col gap-4'>
						{data?.data?.map((i, index) => (
							<div key={index} className='flex justify-between items-center'>
								<div className='flex gap-2 items-center'>
									<FileText className='text-ink-light w-[32px]' />
									<div>
										<p className='text-ink-secondary w-[280px] truncate'>
											{i.name}
										</p>
										<div className='flex gap-2 items-center flex-wrap'>
											<p className='text-ink-light'>{i.type}</p>
											<div className='w-1.5 h-1.5 rounded-full bg-ink-light'></div>
											<p className='text-ink-light'>(12 mb)</p>
											<div className='w-1.5 h-1.5 rounded-full bg-ink-light'></div>
											<p className='text-ink-light'>
												{format(i.createdAt, 'ee/mm/yyyy')}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</Card>
			<ModalAttachment open={open} setOpen={setOpen} />
		</>
	)
}

function ModalAttachment({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (val: boolean) => void
}) {
	const { mutate, isPending } = useCreateAttachment()
	const { id } = useParams()

	const defaultValues = {
		file: null,
		name: '',
		projectId: id,
		secret: false,
		type: 'etc',
	}

	const form = useForm<AttachmentForm>({
		defaultValues,
	})

	const fileWatch = form.watch('file')

	useEffect(() => {
		if (fileWatch instanceof File) {
			form.setValue('name', fileWatch?.name)
		}
	}, [fileWatch])

	const submit = (payload: AttachmentForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset(defaultValues)
			}),
			onError: handleFormError<AttachmentForm>(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle className='text-center'>Sertifikat Baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						className='flex gap-4 flex-col pt-4'
						onSubmit={form.handleSubmit(submit)}
					>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FileUpload onChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipe</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<div className='flex justify-end gap-4 items-center pt-4'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<ButtonSubmit isPending={isPending} />
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
