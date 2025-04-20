import { useParams } from 'react-router-dom'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'

import { useEmployee } from '../api/use-employee'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { formatPhone } from '@/shared/utils/format-phone'

export default function CardAddress() {
	const { id } = useParams()
	const { data, isPending } = useEmployee(id)

	return (
		<Card className='p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Alamat dan kontak
			</CardTitle>
			<CardContent className='p-0 space-y-4 pt-4'>
				<div>
					<p className='text-ink-light'>Alamat</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary'>{data?.address}</p>
					</LoaderWrapper>
				</div>
				<div>
					<p className='text-ink-light'>Kontak</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.phone && data.phone !== '' && (
							<p className='text-ink-primary'>{formatPhone(data?.phone)}</p>
						)}
					</LoaderWrapper>
				</div>
			</CardContent>
		</Card>
	)
}
