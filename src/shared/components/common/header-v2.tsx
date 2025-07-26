import { ArrowLeft } from 'lucide-react'
import { useIsMobile } from '../../hooks/use-mobile'
import { useNavigate } from 'react-router-dom'

type Props = {
	back?: string
	title?: string
}

export default function HeaderV2({ back, title }: Props) {
	const navigate = useNavigate()
	const isMobile = useIsMobile()

	const onBack = () => {
		if (back) {
			navigate(back)
		} else {
			navigate(-1)
		}
	}

	return (
		<div className='h-16 w-full bg-white fixed top-0 left-0 border-b border-border flex justify-center items-center z-10'>
			<div
				className='absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2'
				onClick={onBack}
				role='button'
			>
				<ArrowLeft className='text-ink-light' size={20} />
				{!isMobile && <span className='text-ink-secondary'>Kembali</span>}
			</div>
			<p className='text-ink-primary font-medium'>{title}</p>
		</div>
	)
}
