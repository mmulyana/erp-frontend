import { atomProgress } from '@/shared/store/progress'
import { useAtom } from 'jotai'

export default function ProgressBar() {
	const [progress] = useAtom(atomProgress)

	return (
		<div className='w-full h-1 bg-gray-200 relative'>
			<div
				className='h-1 bg-brand transition-all duration-300'
				style={{ width: `${progress}%` }}
			/>
		</div>
	)
}
