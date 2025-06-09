import { UseFormReturn } from 'react-hook-form'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Role } from '@/shared/types/api'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'
import ModalDeleteRole from './modal-delete-role'

type props = {
	form: UseFormReturn<Partial<Role>>
	onSubmit: (values: Partial<Role>) => void
	isPending?: boolean
	id?: string
}

export function FormRole({ form, onSubmit, isPending, id }: props) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Masukkan username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<Textarea {...field}></Textarea>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<div className='flex justify-between gap-4 w-full'>
						<div>
							{id && (
								<ProtectedComponent required={[permissions.role_delete]}>
									<ModalDeleteRole id={id} />
								</ProtectedComponent>
							)}
						</div>
						<div className='flex gap-4'>
							<DialogClose asChild>
								<Button variant='outline'>Batal</Button>
							</DialogClose>
							<ButtonSubmit isPending={isPending || false} />
						</div>
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}
