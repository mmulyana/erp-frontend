import { UseFormReturn } from 'react-hook-form'

import { useRoles } from '@/features/role/api/use-roles'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { User } from '@/shared/types/api'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

type props = {
	form: UseFormReturn<Partial<User>>
	onSubmit: (values: Partial<User>) => void
	isPending?: boolean
}

export function FormUser({ form, onSubmit, isPending }: props) {
	const { data } = useRoles()

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='username'
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
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='Masukkan email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nomor Telepon</FormLabel>
							<FormControl>
								<Input type='tel' placeholder='08xxxxxxxxxx' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='roleId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className='w-full h-10'>
										<SelectValue placeholder='Pilih role' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Role</SelectLabel>
											{data?.data?.data?.map((i) => (
												<SelectItem value={i.id}>{i.name}</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<div className='flex justify-end gap-4'>
						<DialogClose asChild>
							<Button variant='outline'>Batal</Button>
						</DialogClose>
						<ButtonSubmit isPending={isPending || false} />
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}
