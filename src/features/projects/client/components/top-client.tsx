import CardV1 from '@/shared/components/common/card-v1'
import { User } from 'lucide-react'

export default function TopClient() {
	return (
		<CardV1
			title='Klien'
			icon={<User size={20} className='text-ink-primary' />}
		></CardV1>
	)
}
