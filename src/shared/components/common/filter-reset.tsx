import { Button } from '@/shared/components/ui/button'
import { X } from 'lucide-react'

export default function FilterReset({
	className,
	onClick,
	show,
}: {
	className?: string
	show?: boolean
	onClick?: () => void
}) {
	if (!show) return null

	return (
		<Button variant='outline' className={className} onClick={onClick}>
			<span className='px-0.5'>Reset</span>
			<X size={15} />
		</Button>
	)
}
