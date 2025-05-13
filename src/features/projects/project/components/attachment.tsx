import CardV1 from '@/shared/components/common/card-v1'
import { FileText } from 'lucide-react'

export default function Attachment() {
	return (
		<CardV1
			title='Lampiran'
			icon={<FileText size={20} className='text-ink-primary' />}
		></CardV1>
	)
}
