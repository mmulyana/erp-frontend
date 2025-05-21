import { Download, FileText, FileTextIcon, Plus } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import FileUpload from '@/shared/components/common/file-upload'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
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
import EmptyState from '@/shared/components/common/empty-state'
import CardV1 from '@/shared/components/common/card-v1'
import SearchV3 from '@/shared/components/common/search-v3'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import ToggleSwitch from '@/shared/components/common/toggle-switch'
import { baseUrl } from '@/shared/constants/urls'
import { Badge } from '@/shared/components/ui/badge'
import { paths } from '@/shared/constants/paths'

export default function ProjectAttachment({
	id,
	showButton,
}: {
	id?: string
	showButton?: boolean
}) {
	const { q } = usePagination()

	const { data } = useAttachments({ projectId: id, search: q })

	const attachments = data?.data
	const anyAttachment = attachments && attachments.length > 0

	return (
		<>
			<CardV1
				title='Dokumen'
				icon={<FileTextIcon size={20} className='text-ink-primary' />}
				action={<SearchV3 className='max-w-[140px]' />}
			>
				<ScrollArea className='h-[280px] pt-2 flex flex-col gap-4'>
					{anyAttachment ? (
						attachments?.map((i, index) => (
							<div key={index} className='flex justify-between items-center'>
								<div className='flex gap-2 items-center'>
									<FileText className='text-[#565659]' size={28} />
									<div className='space-y-1'>
										<p className='text-ink-primary w-[240px] truncate font-medium'>
											{i.name}
										</p>
										<div className='flex gap-2.5 items-center flex-wrap'>
											{!id && (
												<Link
													to={`${paths.projectMasterdataProjects}/${i.project.id}`}
												>
													<Badge variant='outline'>{i.project.name}</Badge>
												</Link>
											)}
											{!id && (
												<div className='w-1.5 h-1.5 rounded-full bg-ink-primary/50' />
											)}
											<p className='text-ink-primary/50 text-sm'>{i.type}</p>
										</div>
									</div>
								</div>
								<Link
									to={`${baseUrl}/${i.fileUrl}`}
									className={buttonVariants({ variant: 'ghost' })}
								>
									<Download size={20} />
								</Link>
							</div>
						))
					) : (
						<EmptyState className='h-full w-full' />
					)}
				</ScrollArea>
				{showButton && <ModalAttachment />}
			</CardV1>
		</>
	)
}

const typesOptions = [
	'Berita acara',
	'Kalkulasi',
	'Penawaran',
	'JSA',
	'Purchase Order',
	'Lain-lain',
]
function ModalAttachment() {
	const [open, setOpen] = useState(false)

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
			<DialogTrigger asChild>
				<Button variant='outline' className='w-full'>
					Tambah
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle className='text-center'>Lampiran Baru</DialogTitle>
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
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Tipe lampiran' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Tipe lampiran</SelectLabel>
													{typesOptions.map((i) => (
														<SelectItem key={i} value={i}>
															{i}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='secret'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ToggleSwitch
											value={field.value}
											label={{
												true: 'Berkas rahasia',
												false: 'Berkas rahasia',
											}}
											onCheck={(val) => {
												field.onChange(val)
											}}
										/>
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
