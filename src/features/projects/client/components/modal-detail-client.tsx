import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'
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
	FormMessage,
} from '@/shared/components/ui/form'

import CompanyCombobox from '../../company/components/company-combobox'
import ModalDeleteClient from './modal-delete-client'

import { useUpdateClient } from '../api/use-update-client'
import { useClient } from '../api/use-client'
import { ClientForm } from '../types'

type props = {
	variant: 'info' | 'company'
}
export default function ModalDetailClient({ variant }: props) {
	const { id } = useParams()

	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		email: '',
		phone: '',
		companyId: null,
		position: '',
	}

	const { data } = useClient({ id })
	const { mutate, isPending } = useUpdateClient()

	const form = useForm<ClientForm>({
		defaultValues,
	})

	const FormType = {
		info: (
			<div className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Nomor telepon</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='position'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Jabatan</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
		company: (
			<div className='space-y-4'>
				<FormField
					control={form.control}
					name='companyId'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Perusahaan</FormLabel>
							<FormControl>
								<CompanyCombobox
									onSelect={(e) => field.onChange(e)}
									style={{ value: 'bg-surface' }}
									defaultValue={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
	}

	const submit = (payload: ClientForm) => {
		if (!id) return

		mutate(
			{ ...payload, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<ClientForm>(form),
			}
		)
	}

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.data?.name,
				companyId: data.data?.companyId,
				email: data.data?.email,
				phone: data.data?.phone,
				position: data.data?.position,
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
			<DialogContent className='p-6'>
				<DialogTitle>Klien</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className='pt-4'>
						{FormType[variant]}
						<DialogFooter>
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteClient />
								<div className='flex justify-end gap-4 items-center'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<ButtonSubmit isPending={isPending} title='Perbarui' />
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
