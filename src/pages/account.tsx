import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'

import FormInformation from '@/features/account/components/form-information'
import FormReset from '@/features/account/components/form-reset'

export default function ProfileForm() {
	const navigate = useNavigate()

	const onBack = () => {
		if (window.history.length > 2) {
			navigate(-1)
		} else {
			navigate(paths.base)
		}
	}

	return (
		<>
			<div className='px-4 h-16 w-full bg-white flex justify-between items-center gap-4'>
				<div className='flex gap-4 items-center'>
					<Button
						variant='ghost'
						onClick={onBack}
						className='flex items-center pl-0.5'
					>
						<ChevronLeft size={20} strokeWidth={2.5} />
						<span className='px-0.5 text-sm'>Kembali</span>
					</Button>
					<p className='text-ink-primary font-medium'>Akun</p>
				</div>
			</div>
			<main className='pt-6 flex-1 min-h-screen bg-surface pb-10 gap-4 px-4'>
				<div className='max-w-3xl mx-auto space-y-8'>
					<FormInformation />
					<FormReset />
				</div>
			</main>
		</>
	)
}
