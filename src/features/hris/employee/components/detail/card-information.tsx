import { differenceInYears } from 'date-fns'
import { useMemo } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { baseUrl } from '@/shared/constants/urls'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditInformation from './modal-edit-information'
import { Image } from 'lucide-react'

export default function CardInformation() {
	const { data, isPending } = useDetailEmployee()

	const age = useMemo(() => {
		if (!data) return new Date()
		return differenceInYears(new Date(), new Date(data?.birthDate))
	}, [data])

	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center'>
				<CardTitle className='text-ink-secondary text-base'>
					Informasi Pegawai
				</CardTitle>
				<ModalEditInformation />
			</div>
			<CardContent className='p-0 space-y-4 pt-4'>
				{data?.photoUrl && data.photoUrl !== '' ? (
					<img
						src={`${baseUrl}/${data.photoUrl}`}
						className='w-20 h-20 rounded-full'
					/>
				) : (
					<div className='w-20 h-20 rounded-full border border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative'>
						<Image className='text-ink-light' size={28} />
					</div>
				)}
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Nama lengkap</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary'>{data?.fullname}</p>
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Usia</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary'>{Number(age)}</p>
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Pendidikan terakhir</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary uppercase'>{data?.lastEducation}</p>
					</LoaderWrapper>
				</div>
			</CardContent>
		</Card>
	)
}
