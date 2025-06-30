import { useState } from 'react'
import { useResetPassword } from '../api/use-reset-password'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Lock } from 'lucide-react'

export default function DialogResetPassword({ id }: { id: string }) {
	const [open, setOpen] = useState(false)
	const { mutate } = useResetPassword()

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Lock size={16} />
					<span className='px-0.5'>Reset Password</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Reset Password</DialogTitle>
				<p className='text-sm text-gray-600 mt-2'>
					Anda akan mereset kata sandi pengguna. pengguna akan menerima kata
					sandi sementara dan diminta untuk mengubahnya saat login berikutnya.
				</p>
				<div className='flex justify-end gap-4 mt-4'>
					<DialogClose>Batal</DialogClose>
					<Button
						variant='outline'
						onClick={() =>
							mutate(
								{ id },
								{
									onSuccess: () => {
										setOpen(false)
									},
								}
							)
						}
					>
						Reset
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
