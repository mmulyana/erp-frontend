import { CircleDashed, CircleDot, CircleDotDashed } from 'lucide-react'

type props = {
	value: string
}
export default function Priority({ value }: props) {
	const icons = {
		LOW: <CircleDashed size={18} className='text-ink-light' />,
		MEDIUM: <CircleDotDashed size={18} className='text-amber-500' />,
		HIGH: <CircleDot size={18} className='text-red-500' />,
	}
	const text = {
		LOW: 'Rendah',
		MEDIUM: 'Menengah',
		HIGH: 'Tinggi',
	}

	return (
		<div className='flex gap-2 items-center'>
			{icons[value as keyof typeof icons]}
			{text[value as keyof typeof text]}
		</div>
	)
}
