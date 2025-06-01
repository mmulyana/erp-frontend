import { useForm } from 'react-hook-form'
import { Lock } from 'lucide-react'

import InputPassword from '@/shared/components/fields/password-field'
import CardV1 from '@/shared/components/common/card-v1'
import { Button } from '@/shared/components/ui/button'
import { Form } from '@/shared/components/ui/form'
import { PasswordForm } from '../types'
import { useChangePassword } from '../api/use-change-password'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/shared/store/auth'
import { handleFormError } from '@/shared/utils/form'

export default function FormReset() {
	const user = useAtomValue(userAtom)
	const { mutate, isPending } = useChangePassword()

	const form = useForm<PasswordForm>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
	})

	const onSubmit = (values: PasswordForm) => {
		if (!user?.id) return
		mutate(
			{ id: user?.id, ...values },
			{
				onError: handleFormError(form),
			}
		)
	}

	return (
		<CardV1
			title='Password'
			icon={<Lock size={18} />}
			style={{ content: 'pt-2 grid grid-cols-1 md:grid-cols-2 gap-4' }}
		>
			<div className='max-w-[280px]'>
				<p className='text-lg font-medium text-ink-primary'>Reset Password</p>
				<p className='text-sm text-ink-primary/50'>
					Ubah kata sandi akun Anda secara berkala untuk menjaga keamanan.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<InputPassword label='Password lama' name='oldPassword' />
					<InputPassword label='Password baru' name='newPassword' />
					<div className='flex justify-end pt-2'>
						<Button type='submit'>Simpan</Button>
					</div>
				</form>
			</Form>
		</CardV1>
	)
}
