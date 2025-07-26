import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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
import { useCreateClient } from '../api/use-create-client'
import { ClientForm } from '../types'

export default function ModalAddClient({ companyId }: { companyId?: string }) {
	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		email: '',
		phone: '',
		companyId: companyId || null,
		position: '',
	}

	const { mutate, isPending } = useCreateClient()
	const form = useForm<ClientForm>({
		defaultValues,
	})

	const submit = (payload: ClientForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset(defaultValues)
			}),
			onError: handleFormError<ClientForm>(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Klien</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Klien Baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
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
						<FormField
							control={form.control}
							name='companyId'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Perusahaan</FormLabel>
									<FormControl>
										<CompanyCombobox
											defaultValue={field.value || ''}
											onSelect={(e) => field.onChange(e)}
											style={{ value: 'bg-surface' }}
										/>
									</FormControl>
									<FormMessage />
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
