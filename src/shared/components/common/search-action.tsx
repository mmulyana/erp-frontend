import { Search } from 'lucide-react'
import { Input } from '../ui/input'

export default function SearchAction() {
	return (
		<div className='relative'>
			<Search size={14} className='text-ink-light absolute top-1/2 -translate-y-1/2 left-2' strokeWidth={3} />
			<Input className='h-8 w-[192px] hidden md:block pl-6' placeholder='Cari' />
		</div>
	)
}
