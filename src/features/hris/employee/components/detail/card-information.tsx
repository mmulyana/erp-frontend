import { differenceInYears, format } from 'date-fns'
import { useMemo } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { baseUrl } from '@/shared/constants/urls'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditInformation from './modal-edit-information'
import { Image } from 'lucide-react'
import { id } from 'date-fns/locale'

export default function CardInformation() {
	const { data, isPending } = useDetailEmployee()

	const age = useMemo(() => {
		if (!data || !data.birthDate) return '-'
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
						className='w-20 h-20 rounded-full object-cover'
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
					<p className='text-ink-secondary'>Pendidikan terakhir</p>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary uppercase'>{data?.lastEducation}</p>
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Tggl lahir</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.birthDate && (
							<div className='flex gap-2 items-center'>
								<p className='text-ink-primary'>
									{format(data?.birthDate, 'PPP', { locale: id })}
								</p>
								<p className='text-ink-light'>({age} tahun)</p>
							</div>
						)}
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Tggl bergabung</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.joinedAt && (
							<p className='text-ink-primary'>
								{format(data?.joinedAt, 'PPP', { locale: id })}
							</p>
						)}
					</LoaderWrapper>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-ink-secondary'>Tggl safety induction</p>
					<LoaderWrapper isLoading={isPending}>
						{data?.safetyInductionDate && (
							<p className='text-ink-primary'>
								{format(data?.safetyInductionDate, 'PPP', { locale: id })}
							</p>
						)}
					</LoaderWrapper>
				</div>
			</CardContent>
		</Card>
	)
}
